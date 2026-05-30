# Gera o arquivo estudos-biblicos.data.ts a partir do JSON estruturado completo
$ErrorActionPreference = 'Stop'

$in  = 'c:\Projetos\IgrejaBatistaLuz\IgrejaBatistaDaLuz\scripts\estudos-structured.json'
$out = 'c:\Projetos\IgrejaBatistaLuz\IgrejaBatistaDaLuz\src\app\components\estudos-biblicos\estudos-biblicos.data.ts'

# Caracteres acentuados via codepoint (evita problema de encoding do arquivo .ps1)
$aAcute = [char]0xE1; $aTilde = [char]0xE3; $aCircum = [char]0xE2
$eAcute = [char]0xE9; $eCircum = [char]0xEA
$iAcute = [char]0xED
$oAcute = [char]0xF3; $oTilde = [char]0xF5; $oCircum = [char]0xF4
$uAcute = [char]0xFA
$cCedil = [char]0xE7
$middot = [char]0xB7

# Labels (em pt-BR) usados nos titulos dos children
$LBL_TEXTO_BASE   = "Texto Base"
$LBL_EXPOSICAO    = "Exposi${cCedil}${aTilde}o do Texto"
$LBL_DISCUSSAO    = "Discuss${aTilde}o"
$LBL_DESENVOLV    = "Desenvolvimento"
$LBL_CONCLUSAO    = "Conclus${aTilde}o"
$LBL_APLICACAO    = "Aplica${cCedil}${aTilde}o"
$LBL_PERGUNTAS    = "Perguntas para a C${eAcute}lula"
$LBL_DESAFIO      = "Desafio da Semana"

$monthNamesPt = @{
    '01'='janeiro'; '02'='fevereiro'; '03'="mar${cCedil}o"; '04'='abril';
    '05'='maio'; '06'='junho'; '07'='julho'; '08'='agosto';
    '09'='setembro'; '10'='outubro'; '11'='novembro'; '12'='dezembro'
}

$monthsCatalog = @(
    @{ id='janeiro';      num=1;  nameKey='estudos.month.january' }
    @{ id='fevereiro';    num=2;  nameKey='estudos.month.february' }
    @{ id='marco';        num=3;  nameKey='estudos.month.march' }
    @{ id='abril';        num=4;  nameKey='estudos.month.april' }
    @{ id='maio';         num=5;  nameKey='estudos.month.may' }
    @{ id='junho';        num=6;  nameKey='estudos.month.june' }
    @{ id='julho';        num=7;  nameKey='estudos.month.july' }
    @{ id='agosto';       num=8;  nameKey='estudos.month.august' }
    @{ id='setembro';     num=9;  nameKey='estudos.month.september' }
    @{ id='outubro';      num=10; nameKey='estudos.month.october' }
    @{ id='novembro';     num=11; nameKey='estudos.month.november' }
    @{ id='dezembro';     num=12; nameKey='estudos.month.december' }
    @{ id='temas-livres'; num=0;  nameKey='estudos.month.bonus' }
)

$json = Get-Content $in -Raw -Encoding UTF8 | ConvertFrom-Json

function Escape-TsString {
    param([string]$s)
    if ($null -eq $s) { return '' }
    $s = $s -replace '\\', '\\\\'
    $s = $s -replace "'", "\'"
    # Preserva quebras de linha como \n literal
    $s = $s -replace "`r`n", "`n"
    $s = $s -replace "`n", '\n'
    return $s.Trim()
}

function Format-DateSubtitle {
    param([string]$date)
    if (-not $date) { return $null }
    if ($date -match '^(\d{2})-(\d{2})-(\d{2})$') {
        $dia = $matches[1]; $mes = $matches[2]
        return "$dia de $($monthNamesPt[$mes])"
    }
    return $date
}

function Emit-Child {
    param(
        [System.Text.StringBuilder]$sb,
        [string]$indent,
        [string]$id,
        [string]$title,
        [string]$description = $null,
        [string]$subtitle = $null,
        [bool]$isLast = $false,
        [scriptblock]$childrenWriter = $null
    )
    [void]$sb.AppendLine("$indent{")
    [void]$sb.AppendLine("$indent  id: '$id',")
    $hasMore = $description -or $subtitle -or $childrenWriter
    [void]$sb.AppendLine("$indent  title: '$title'$( if($hasMore) {','} )")
    if ($subtitle) {
        $needsComma = $description -or $childrenWriter
        [void]$sb.AppendLine("$indent  subtitle: '$subtitle'$( if($needsComma) {','} )")
    }
    if ($description) {
        $needsComma = [bool]$childrenWriter
        [void]$sb.AppendLine("$indent  description: '$description'$( if($needsComma) {','} )")
    }
    if ($childrenWriter) {
        [void]$sb.AppendLine("$indent  children: [")
        & $childrenWriter
        [void]$sb.AppendLine("$indent  ]")
    }
    [void]$sb.AppendLine("$indent}$( if(-not $isLast) {','} )")
}

$header_l1 = "Plano de Estudos B${iAcute}blicos 2026."
$header_l2 = "Conte${uAcute}do extra${iAcute}do das li${cCedil}${oTilde}es de c${eAcute}lula (.docx) com todas as se${cCedil}${oTilde}es:"
$header_l3 = "Tema, Texto B${aAcute}se, Exposi${cCedil}${aTilde}o, Discuss${aTilde}o, Desenvolvimento, Conclus${aTilde}o, Aplica${cCedil}${aTilde}o, Perguntas e Desafio."
$header_l4 = "Para atualizar: re-execute scripts/extract-estudos.ps1, structure-estudos.ps1, copy-estudos-assets.ps1 e generate-data-ts.ps1."

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("import { StudyPlan } from './estudos-biblicos.types';")
[void]$sb.AppendLine('')
[void]$sb.AppendLine('/**')
[void]$sb.AppendLine(" * $header_l1")
[void]$sb.AppendLine(' *')
[void]$sb.AppendLine(" * $header_l2")
[void]$sb.AppendLine(" * $header_l3")
[void]$sb.AppendLine(' *')
[void]$sb.AppendLine(" * $header_l4")
[void]$sb.AppendLine(' */')
[void]$sb.AppendLine('export const STUDY_PLAN_2026: StudyPlan = {')
[void]$sb.AppendLine('  year: 2026,')
[void]$sb.AppendLine("  titleKey: 'estudos.plan.title',")
[void]$sb.AppendLine('  months: [')

foreach ($m in $monthsCatalog) {
    $studies = @($json | Where-Object { $_.monthKey -eq $m.id } | Sort-Object date)

    [void]$sb.AppendLine("    {")
    [void]$sb.AppendLine("      id: '$($m.id)',")
    [void]$sb.AppendLine("      monthNumber: $($m.num),")
    [void]$sb.AppendLine("      nameKey: '$($m.nameKey)',")

    if ($studies.Count -eq 0) {
        [void]$sb.AppendLine('      studies: []')
        [void]$sb.AppendLine('    },')
        continue
    }

    [void]$sb.AppendLine('      studies: [')

    for ($si = 0; $si -lt $studies.Count; $si++) {
        $s = $studies[$si]
        $isLastStudy = ($si -eq $studies.Count - 1)
        $id = if ($s.date) { $s.date } else {
            (($s.sourceFile -replace '[^a-zA-Z0-9]', '-').ToLowerInvariant()).Substring(0, [Math]::Min(40, ($s.sourceFile -replace '[^a-zA-Z0-9]', '-').Length))
        }
        $title = Escape-TsString $s.title
        $dateLabel = Format-DateSubtitle $s.date
        $subtitleParts = @()
        if ($dateLabel) { $subtitleParts += $dateLabel }
        if ($s.textoBaseRef) { $subtitleParts += $s.textoBaseRef }
        $subtitle = Escape-TsString ($subtitleParts -join " ${middot} ")
        $desc = Escape-TsString $s.themeDescription

        # Monta lista de children dinamica
        $children = New-Object System.Collections.Generic.List[object]
        if ($s.textoBase) {
            $children.Add([pscustomobject]@{
                id='texto-base'; title=$LBL_TEXTO_BASE; subtitle=(Escape-TsString $s.textoBaseRef); description=(Escape-TsString $s.textoBase); writer=$null
            })
        }
        if ($s.exposicao) {
            $children.Add([pscustomobject]@{
                id='exposicao'; title=$LBL_EXPOSICAO; subtitle=$null; description=(Escape-TsString $s.exposicao); writer=$null
            })
        }
        if ($s.discussao) {
            $children.Add([pscustomobject]@{
                id='discussao'; title=$LBL_DISCUSSAO; subtitle=$null; description=(Escape-TsString $s.discussao); writer=$null
            })
        }
        if ($s.topics -and $s.topics.Count -gt 0) {
            $children.Add([pscustomobject]@{
                id='desenvolvimento'; title=$LBL_DESENVOLV; subtitle=$null; description=$null
                writer={
                    param($localSb, $localIndent)
                    for ($ti = 0; $ti -lt $s.topics.Count; $ti++) {
                        $t = $s.topics[$ti]
                        $isLastT = ($ti -eq $s.topics.Count - 1)
                        $tTitle = Escape-TsString "$($t.num). $($t.title)"
                        $tBody  = Escape-TsString $t.body
                        Emit-Child -sb $localSb -indent $localIndent -id "topico-$($t.num)" -title $tTitle -description $tBody -isLast $isLastT
                    }
                }
            })
        }
        if ($s.conclusao) {
            $children.Add([pscustomobject]@{
                id='conclusao'; title=$LBL_CONCLUSAO; subtitle=$null; description=(Escape-TsString $s.conclusao); writer=$null
            })
        }
        if ($s.aplicacao) {
            $children.Add([pscustomobject]@{
                id='aplicacao'; title=$LBL_APLICACAO; subtitle=$null; description=(Escape-TsString $s.aplicacao); writer=$null
            })
        }
        if ($s.perguntas) {
            $children.Add([pscustomobject]@{
                id='perguntas'; title=$LBL_PERGUNTAS; subtitle=$null; description=(Escape-TsString $s.perguntas); writer=$null
            })
        }
        if ($s.desafio) {
            $children.Add([pscustomobject]@{
                id='desafio'; title=$LBL_DESAFIO; subtitle=$null; description=(Escape-TsString $s.desafio); writer=$null
            })
        }

        # Cabeçalho do estudo
        [void]$sb.AppendLine("        {")
        [void]$sb.AppendLine("          id: '$id',")
        [void]$sb.AppendLine("          title: '$title',")
        if ($subtitle) { [void]$sb.AppendLine("          subtitle: '$subtitle',") }
        if ($desc)     { [void]$sb.AppendLine("          description: '$desc',") }
        if ($s.downloadPath) {
            $dl = Escape-TsString $s.downloadPath
            $fn = Escape-TsString (Split-Path $s.downloadPath -Leaf)
            [void]$sb.AppendLine("          downloadUrl: '$dl',")
            [void]$sb.AppendLine("          downloadFilename: '$fn',")
        }

        if ($children.Count -gt 0) {
            [void]$sb.AppendLine("          children: [")
            for ($ci = 0; $ci -lt $children.Count; $ci++) {
                $c = $children[$ci]
                $isLastC = ($ci -eq $children.Count - 1)
                if ($c.writer) {
                    [void]$sb.AppendLine("            {")
                    [void]$sb.AppendLine("              id: '$($c.id)',")
                    [void]$sb.AppendLine("              title: '$($c.title)',")
                    [void]$sb.AppendLine("              children: [")
                    & $c.writer $sb '                '
                    [void]$sb.AppendLine("              ]")
                    [void]$sb.AppendLine("            }$( if(-not $isLastC) {','} )")
                } else {
                    Emit-Child -sb $sb -indent '            ' -id $c.id -title $c.title -subtitle $c.subtitle -description $c.description -isLast $isLastC
                }
            }
            [void]$sb.AppendLine("          ]")
        }
        [void]$sb.AppendLine("        }$( if(-not $isLastStudy) {','} )")
    }

    [void]$sb.AppendLine('      ]')
    [void]$sb.AppendLine('    },')
}

[void]$sb.AppendLine('  ]')
[void]$sb.AppendLine('};')

[System.IO.File]::WriteAllText($out, $sb.ToString(), [System.Text.UTF8Encoding]::new($false))
Write-Host "Gerado: $out"
