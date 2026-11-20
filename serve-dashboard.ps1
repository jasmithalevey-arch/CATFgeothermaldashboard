$ErrorActionPreference = "Stop"

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:8000/")

$root = (Resolve-Path $PSScriptRoot).Path
$mimeTypes = @{
    ".html" = "text/html"
    ".css" = "text/css"
    ".js" = "application/javascript"
    ".json" = "application/json"
    ".svg" = "image/svg+xml"
    ".png" = "image/png"
    ".jpg" = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif" = "image/gif"
    ".ico" = "image/x-icon"
}

try {
    $listener.Start()
    Write-Host "Dashboard available at http://localhost:8000/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $requestPath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath)
        if ($requestPath -eq "/") {
            $requestPath = "/index.html"
        }

        $relativePath = $requestPath.TrimStart("/").Replace("/", "\")
        $filePath = [System.IO.Path]::GetFullPath((Join-Path $root $relativePath))
        $rootPrefix = $root.TrimEnd("\") + "\"

        if (-not $filePath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase) -or
            -not [System.IO.File]::Exists($filePath)) {
            $context.Response.StatusCode = 404
            $context.Response.Close()
            continue
        }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
        $context.Response.StatusCode = 200
        $context.Response.ContentType = if ($mimeTypes.ContainsKey($extension)) {
            $mimeTypes[$extension]
        } else {
            "application/octet-stream"
        }
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $context.Response.Close()
    }
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
