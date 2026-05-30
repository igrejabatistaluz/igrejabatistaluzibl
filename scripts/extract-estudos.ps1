# Extrai texto de todos os .docx em uma pasta e gera um JSON unico
# Uso: powershell -ExecutionPolicy Bypass -File extract-estudos.ps1
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$base = 'c:\Users\igrej\Downloads\Estudos 2026-20260530T001821Z-3-001\Estudos 2026'
$out  = 'c:\Projetos\IgrejaBatistaLuz\IgrejaBatistaDaLuz\scripts\estudos-extracted.json'

function Get-DocxText {
    param([string]$Path)
    $zip = [System.IO.Compression.ZipFile]::OpenRead($Path)
    try {
        $entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
        if (-not $entry) { return '' }
        $reader = New-Object System.IO.StreamReader($entry.Open())
        $xml = $reader.ReadToEnd()
        $reader.Close()
    } finally {
        $zip.Dispose()
    }
    [xml]$doc = $xml
    $ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
    $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
    $paragraphs = $doc.SelectNodes('//w:p', $ns)
    $lines = New-Object System.Collections.Generic.List[string]
    foreach ($p in $paragraphs) {
        $text = ''
        $runs = $p.SelectNodes('.//w:t', $ns)
        foreach ($r in $runs) { $text += $r.InnerText }
        if ($text.Trim().Length -gt 0) { $lines.Add($text) }
    }
    return ($lines -join "`n")
}

$files = Get-ChildItem -Path $base -Recurse -File -Filter *.docx
$result = @()
foreach ($f in $files) {
    Write-Host "Lendo: $($f.FullName)"
    try {
        $text = Get-DocxText -Path $f.FullName
    } catch {
        $text = "ERROR: $_"
    }
    $result += [pscustomobject]@{
        path    = $f.FullName
        relPath = $f.FullName.Substring($base.Length).TrimStart('\')
        name    = $f.BaseName
        text    = $text
    }
}

$json = $result | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($out, $json, [System.Text.UTF8Encoding]::new($false))
Write-Host "Salvo em: $out  (entries: $($result.Count))"
