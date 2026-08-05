# Generate static/og-image.png — 1200x630 branded OG card.
# One-shot script. Run again only if the design changes.

Add-Type -AssemblyName System.Drawing

$w = 1200
$h = 630

$bg     = [System.Drawing.Color]::FromArgb(255, 9, 13, 17)      # #090d11
$bg2    = [System.Drawing.Color]::FromArgb(255, 15, 22, 27)     # #0f161b
$accent = [System.Drawing.Color]::FromArgb(255, 103, 212, 255)  # #67d4ff
$text   = [System.Drawing.Color]::FromArgb(255, 240, 244, 242)  # #f0f4f2
$text2  = [System.Drawing.Color]::FromArgb(255, 169, 182, 177)  # #a9b6b1
$dim    = [System.Drawing.Color]::FromArgb(255, 116, 130, 125)  # #74827d
$line   = [System.Drawing.Color]::FromArgb(255, 43, 57, 52)     # #2b3934
$accSoft = [System.Drawing.Color]::FromArgb(38, 103, 212, 255)  # rgba(103,212,255,0.15)

$mid = [char]0x00B7  # middle-dot separator (avoid file-encoding pitfalls)

$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Background — subtle diagonal gradient bg2 -> bg
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $bg2, $bg, 135.0
$g.FillRectangle($gradBrush, $rect)
$gradBrush.Dispose()

# Subtle accent glow upper-right (radial via PathGradientBrush)
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(700, -200, 900, 600)
$glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush $glowPath
$glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(46, 103, 212, 255)
$glowBrush.SurroundColors = @($bg)
$g.FillPath($glowBrush, $glowPath)
$glowBrush.Dispose()
$glowPath.Dispose()

# Brand mark "B" (upper-left, 64x64)
$pad = 80
$markX = $pad
$markY = $pad
$markSize = 64
$markRect = New-Object System.Drawing.Rectangle $markX, $markY, $markSize, $markSize
$markRectF = New-Object System.Drawing.RectangleF $markX, $markY, $markSize, $markSize
$markBg = New-Object System.Drawing.SolidBrush $accSoft
$g.FillRectangle($markBg, $markRect)
$markBg.Dispose()
$markPen = New-Object System.Drawing.Pen $accent, 2
$g.DrawRectangle($markPen, $markRect)
$markPen.Dispose()

$markFont = New-Object System.Drawing.Font "Segoe UI", 32, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$markFmt = New-Object System.Drawing.StringFormat
$markFmt.Alignment = [System.Drawing.StringAlignment]::Center
$markFmt.LineAlignment = [System.Drawing.StringAlignment]::Center
$markBrush = New-Object System.Drawing.SolidBrush $accent
$g.DrawString("B", $markFont, $markBrush, $markRectF, $markFmt)
$markBrush.Dispose()
$markFont.Dispose()

# Eyebrow line
$eyebrowFont = New-Object System.Drawing.Font "Consolas", 18, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$eyebrowBrush = New-Object System.Drawing.SolidBrush $accent
$g.DrawString("PRODUCT DEVELOPER  $mid  CUSTOM PROJECTS", $eyebrowFont, $eyebrowBrush, ($pad + $markSize + 24), ($markY + 22))
$eyebrowFont.Dispose()
$eyebrowBrush.Dispose()

# Big title — "Braison Swilling"
$titleFont = New-Object System.Drawing.Font "Segoe UI Semibold", 110, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$titleBrush = New-Object System.Drawing.SolidBrush $text
$g.DrawString("Braison Swilling", $titleFont, $titleBrush, ($pad - 6), 220)
$titleFont.Dispose()
$titleBrush.Dispose()

# Tagline — multi-line
$taglineFont = New-Object System.Drawing.Font "Segoe UI", 28, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$taglineBrush = New-Object System.Drawing.SolidBrush $text2
$g.DrawString("Websites, software tools, desktop applications, and", $taglineFont, $taglineBrush, $pad, 370)
$g.DrawString("AI-powered products - planned through deployment.", $taglineFont, $taglineBrush, $pad, 410)
$taglineFont.Dispose()
$taglineBrush.Dispose()

# Bottom strip — divider line + stack
$linePen = New-Object System.Drawing.Pen $line, 1
$g.DrawLine($linePen, $pad, 510, ($w - $pad), 510)
$linePen.Dispose()

$stackFont = New-Object System.Drawing.Font "Consolas", 19, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$stackBrush = New-Object System.Drawing.SolidBrush $text2
$g.DrawString("WEBSITES  $mid  CUSTOM SOFTWARE  $mid  DESKTOP APPS  $mid  AI INTEGRATIONS", $stackFont, $stackBrush, $pad, 540)
$stackFont.Dispose()
$stackBrush.Dispose()

# URL on the right of bottom strip
$urlFont = New-Object System.Drawing.Font "Consolas", 17, ([System.Drawing.FontStyle]::Regular), ([System.Drawing.GraphicsUnit]::Pixel)
$urlBrush = New-Object System.Drawing.SolidBrush $accent
$urlText = "blazzer10200.github.io"
$urlSize = $g.MeasureString($urlText, $urlFont)
$g.DrawString($urlText, $urlFont, $urlBrush, ($w - $pad - $urlSize.Width), 543)
$urlFont.Dispose()
$urlBrush.Dispose()

# Save
$outPath = Join-Path $PSScriptRoot "..\static\og-image.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()

Write-Host "OG image written: $outPath ($w x $h)"
