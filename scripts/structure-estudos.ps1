# Le o JSON extraido e gera um JSON estruturado por mes com TODO o conteudo
# (texto base, exposicao, discussao, desenvolvimento com topicos completos,
# conclusao, aplicacao, perguntas, desafio).
$ErrorActionPreference = 'Stop'

$in  = 'c:\Projetos\IgrejaBatistaLuz\IgrejaBatistaDaLuz\scripts\estudos-extracted.json'
$out = 'c:\Projetos\IgrejaBatistaLuz\IgrejaBatistaDaLuz\scripts\estudos-structured.json'

$json = Get-Content $in -Raw -Encoding UTF8 | ConvertFrom-Json

function Parse-Estudo {
    param([string]$text, [string]$relPath, [string]$baseName)

    $text = $text -replace "`r", ''
    $rawLines = $text -split "`n"

    $title = $null
    $themeDescription = $null
    $textoBaseRef = $null

    # Buffers por secao
    $sections = @{
        textoBase     = New-Object System.Collections.Generic.List[string]
        exposicao     = New-Object System.Collections.Generic.List[string]
        discussao     = New-Object System.Collections.Generic.List[string]
        desenvolvimento = New-Object System.Collections.Generic.List[string]
        conclusao     = New-Object System.Collections.Generic.List[string]
        aplicacao     = New-Object System.Collections.Generic.List[string]
        perguntas     = New-Object System.Collections.Generic.List[string]
        desafio       = New-Object System.Collections.Generic.List[string]
    }

    $section = ''
    $temaLinesCollected = 0
    $afterTextoBaseHeader = $false

    foreach ($raw in $rawLines) {
        $line = $raw.Trim()
        if (-not $line) { continue }

        $upper = $line.ToUpperInvariant()

        # --- Headers de secao ---
        # TEMA inline ou em linha
        if ($upper -match '^TEMA\s*:?\s*(.*)$') {
            $section = 'tema'
            $temaLinesCollected = 0
            $inline = ($line -replace '^(?i)TEMA\s*:?\s*', '').Trim()
            if ($inline -and -not $title) { $title = $inline }
            continue
        }
        # TEXTO BASE inline ou em linha
        if ($upper -match '^TEXTO[-\s]BASE\s*:?\s*(.*)$') {
            $section = 'textoBase'
            $afterTextoBaseHeader = $true
            $inline = ($line -replace '^(?i)TEXTO[-\s]BASE\s*:?\s*', '').Trim()
            if ($inline) {
                if (-not $textoBaseRef) {
                    $textoBaseRef = ($inline -replace '\s*\(RA\)\s*', '' -replace '\s*\(NVI\)\s*', '' -replace '\s*\(ARA\)\s*', '' -replace '\s*\(ARC\)\s*', '').Trim()
                    $afterTextoBaseHeader = $false
                }
                $sections.textoBase.Add($inline)
            }
            continue
        }
        if ($upper -like 'EXPOSI*O DO TEXTO*' -or $upper -like 'EXPOSI*O*') {
            $section = 'exposicao'
            continue
        }
        if ($upper -eq 'DISCUSSAO' -or $upper -like 'DISCUSS*O*') {
            $section = 'discussao'
            continue
        }
        if ($upper -like 'DESENVOLVIMENT*' -or $upper -like 'INTRODU*O*' -or $upper -eq 'INTRODUCAO') {
            $section = 'desenvolvimento'
            continue
        }
        if ($upper -like 'CONCLUS*O*') {
            $section = 'conclusao'
            continue
        }
        if ($upper -like 'APLICA*O*') {
            $section = 'aplicacao'
            continue
        }
        if ($upper -like 'PERGUNTAS*') {
            $section = 'perguntas'
            continue
        }
        if ($upper -like 'DESAFIO*') {
            $section = 'desafio'
            continue
        }

        # --- Body de cada secao ---
        switch ($section) {
            'tema' {
                if (-not $title) { $title = $line }
                elseif (-not $themeDescription) { $themeDescription = $line }
                $temaLinesCollected++
            }
            'textoBase' {
                if ($afterTextoBaseHeader -and -not $textoBaseRef) {
                    $textoBaseRef = ($line -replace '\s*\(RA\)\s*', '' -replace '\s*\(NVI\)\s*', '' -replace '\s*\(ARA\)\s*', '' -replace '\s*\(ARC\)\s*', '').Trim()
                    $afterTextoBaseHeader = $false
                }
                $sections.textoBase.Add($line)
            }
            default {
                if ($section -and $sections.ContainsKey($section)) {
                    $sections[$section].Add($line)
                }
            }
        }
    }

    # --- Quebra do DESENVOLVIMENTO em topicos numerados ---
    $topics = New-Object System.Collections.Generic.List[object]
    $current = $null
    foreach ($l in $sections.desenvolvimento) {
        if ($l -match '^\s*(\d+)\.\s*(.+)$') {
            if ($current) { $topics.Add($current) }
            $current = [pscustomobject]@{
                num     = [int]$matches[1]
                title   = $matches[2].Trim()
                body    = New-Object System.Collections.Generic.List[string]
            }
        } elseif ($current) {
            $current.body.Add($l)
        }
    }
    if ($current) { $topics.Add($current) }

    # Texto consolidado por secao (parágrafos separados por \n)
    $exposicaoTxt  = ($sections.exposicao -join "`n").Trim()
    $discussaoTxt  = ($sections.discussao -join "`n").Trim()
    $conclusaoTxt  = ($sections.conclusao -join "`n").Trim()
    $aplicacaoTxt  = ($sections.aplicacao -join "`n").Trim()
    $perguntasTxt  = ($sections.perguntas -join "`n").Trim()
    $desafioTxt    = ($sections.desafio   -join "`n").Trim()

    # Texto base completo (sem a linha de referencia repetida)
    $textoBaseLines = $sections.textoBase | Where-Object { $_ -ne $textoBaseRef }
    $textoBaseTxt = ($textoBaseLines -join "`n").Trim()

    # Topicos: converte body em string final
    $topicsOut = @()
    foreach ($t in $topics) {
        $topicsOut += [pscustomobject]@{
            num   = $t.num
            title = $t.title
            body  = ($t.body -join "`n").Trim()
        }
    }

    # --- Extrai mes do path (prefixo numerico) ---
    $monthKey = $null
    if     ($relPath -like '02 *')   { $monthKey = 'fevereiro' }
    elseif ($relPath -like '03 *')   { $monthKey = 'marco' }
    elseif ($relPath -like '04 *')   { $monthKey = 'abril' }
    elseif ($relPath -like '05 *')   { $monthKey = 'maio' }
    elseif ($relPath -like '06 *')   { $monthKey = 'junho' }
    elseif ($relPath -like '07 *')   { $monthKey = 'julho' }
    elseif ($relPath -like '08 *')   { $monthKey = 'agosto' }
    elseif ($relPath -like '09 *')   { $monthKey = 'setembro' }
    elseif ($relPath -like '10 *')   { $monthKey = 'outubro' }
    elseif ($relPath -like '11 *')   { $monthKey = 'novembro' }
    elseif ($relPath -like 'TEMAS*') { $monthKey = 'temas-livres' }

    $dateMatch = $null
    if ($relPath -match '(\d{2})-(\d{2})-+(\d{2})') {
        $dia = $matches[1]; $mes = $matches[2]; $ano = $matches[3]
        if ($ano -eq '25') { $ano = '26' }
        $dateMatch = "$dia-$mes-$ano"
    }

    return [pscustomobject]@{
        monthKey         = $monthKey
        date             = $dateMatch
        title            = $title
        themeDescription = $themeDescription
        textoBaseRef     = $textoBaseRef
        textoBase        = $textoBaseTxt
        exposicao        = $exposicaoTxt
        discussao        = $discussaoTxt
        topics           = $topicsOut
        conclusao        = $conclusaoTxt
        aplicacao        = $aplicacaoTxt
        perguntas        = $perguntasTxt
        desafio          = $desafioTxt
        sourceFile       = $baseName
        downloadPath     = $null
    }
}

$result = @()
foreach ($item in $json) {
    if ($item.relPath -notmatch '\\') { continue }   # ignora .docx da raiz
    $parsed = Parse-Estudo -text $item.text -relPath $item.relPath -baseName $item.name
    $result += $parsed
}

# Ordena por mes e depois por data
$monthOrder = @('janeiro','fevereiro','marco','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro','temas-livres')
$result = $result | Sort-Object @{ Expression = { $monthOrder.IndexOf($_.monthKey) } }, date

$jsonOut = $result | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($out, $jsonOut, [System.Text.UTF8Encoding]::new($false))
Write-Host "Salvo: $out  (entries: $($result.Count))"
$result | Group-Object monthKey | Select-Object Name, Count | Format-Table
