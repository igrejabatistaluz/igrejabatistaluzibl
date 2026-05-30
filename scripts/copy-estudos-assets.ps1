# Copia os arquivos .docx originais para src/assets/estudos/<mes>/
# e atualiza o JSON estruturado com o campo downloadPath de cada estudo.
$ErrorActionPreference = 'Stop'

$base       = 'c:\Users\igrej\Downloads\Estudos 2026-20260530T001821Z-3-001\Estudos 2026'
$structIn   = 'c:\Projetos\IgrejaBatistaLuz\IgrejaBatistaDaLuz\scripts\estudos-structured.json'
$structOut  = $structIn  # sobrescreve com o caminho de download adicionado
$assetsRoot = 'c:\Projetos\IgrejaBatistaLuz\IgrejaBatistaDaLuz\src\assets\estudos'

# Slugify sem dependencias: remove acentos, troca nao-alfanumerico por '-' e baixa caixa.
function ConvertTo-Slug {
    param([string]$s)
    if (-not $s) { return '' }
    $n = $s.Normalize([System.Text.NormalizationForm]::FormD)
    $sb = New-Object System.Text.StringBuilder
    foreach ($c in $n.ToCharArray()) {
        $cat = [System.Globalization.CharUnicodeInfo]::GetUnicodeCategory($c)
        if ($cat -ne [System.Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$sb.Append($c)
        }
    }
    $clean = $sb.ToString().ToLowerInvariant()
    $clean = $clean -replace '[^a-z0-9]+', '-'
    $clean = $clean.Trim('-')
    return $clean
}

# Mapeia o nome da pasta original -> slug do mes usado no app
function Get-MonthKeyFromPath {
    param([string]$relPath)
    if     ($relPath -like '02 *')    { return 'fevereiro' }
    elseif ($relPath -like '03 *')    { return 'marco' }
    elseif ($relPath -like '04 *')    { return 'abril' }
    elseif ($relPath -like '05 *')    { return 'maio' }
    elseif ($relPath -like '06 *')    { return 'junho' }
    elseif ($relPath -like '07 *')    { return 'julho' }
    elseif ($relPath -like '08 *')    { return 'agosto' }
    elseif ($relPath -like '09 *')    { return 'setembro' }
    elseif ($relPath -like '10 *')    { return 'outubro' }
    elseif ($relPath -like '11 *')    { return 'novembro' }
    elseif ($relPath -like 'TEMAS*')  { return 'temas-livres' }
    return $null
}

# Carrega o JSON estruturado (gerado por structure-estudos.ps1)
$structured = Get-Content $structIn -Raw -Encoding UTF8 | ConvertFrom-Json

# Garante que cada item tem a propriedade downloadPath
foreach ($s in $structured) {
    if (-not ($s | Get-Member -Name downloadPath -ErrorAction SilentlyContinue)) {
        Add-Member -InputObject $s -MemberType NoteProperty -Name downloadPath -Value $null -Force
    } else {
        $s.downloadPath = $null
    }
}

# Cria pasta-raiz dos assets
if (-not (Test-Path $assetsRoot)) {
    New-Item -ItemType Directory -Path $assetsRoot -Force | Out-Null
}

$files = Get-ChildItem -Path $base -Recurse -File -Filter *.docx
$copied = 0

foreach ($f in $files) {
    $relPath  = $f.FullName.Substring($base.Length).TrimStart('\')
    $monthKey = Get-MonthKeyFromPath $relPath
    if (-not $monthKey) { continue }   # ignora docx fora dos meses (ex: raiz)

    # Tenta achar a data no path (formato dd-mm-aa, com possivel duplo traco)
    $datePart = $null
    if ($relPath -match '(\d{2})-(\d{2})-+(\d{2})') {
        $dia = $matches[1]; $mes = $matches[2]; $ano = $matches[3]
        if ($ano -eq '25') { $ano = '26' }
        $datePart = "$dia-$mes-$ano"
    }

    $monthDir = Join-Path $assetsRoot $monthKey
    if (-not (Test-Path $monthDir)) {
        New-Item -ItemType Directory -Path $monthDir -Force | Out-Null
    }

    $titleSlug = ConvertTo-Slug $f.BaseName
    if ($titleSlug.Length -gt 80) { $titleSlug = $titleSlug.Substring(0, 80).TrimEnd('-') }
    $finalName = if ($datePart) { "$datePart-$titleSlug.docx" } else { "$titleSlug.docx" }
    $destPath  = Join-Path $monthDir $finalName

    Copy-Item -LiteralPath $f.FullName -Destination $destPath -Force
    $copied++

    # Caminho publico servido pelo Angular (a pasta src/assets vira /assets em runtime).
    $publicPath = "assets/estudos/$monthKey/$finalName"

    # Localiza o estudo correspondente no JSON estruturado (mesmo mes + mesma data quando houver).
    $candidates = @($structured | Where-Object {
        $_.monthKey -eq $monthKey -and (
            ($datePart -and $_.date -eq $datePart) -or
            (-not $datePart -and $_.sourceFile -eq $f.BaseName)
        )
    })

    if ($candidates.Count -eq 0) {
        # fallback: match por sourceFile
        $candidates = @($structured | Where-Object { $_.monthKey -eq $monthKey -and $_.sourceFile -eq $f.BaseName })
    }

    foreach ($c in $candidates) {
        $c.downloadPath = $publicPath
    }
}

# Salva o JSON atualizado
$json2 = $structured | ConvertTo-Json -Depth 6
[System.IO.File]::WriteAllText($structOut, $json2, [System.Text.UTF8Encoding]::new($false))
Write-Host "Arquivos copiados: $copied"
$semDownload = ($structured | Where-Object { -not $_.downloadPath }).Count
Write-Host "Estudos sem downloadPath: $semDownload"
