$ErrorActionPreference = 'Stop'

function Get-ProjectRoot {
    Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSCommandPath))
}

function Get-MavenVersion {
    $propertiesPath = Join-Path (Get-ProjectRoot) '.mvn\wrapper\maven-wrapper.properties'
    if (Test-Path $propertiesPath) {
        foreach ($line in Get-Content $propertiesPath) {
            if ($line -match '^distributionUrl=.*apache-maven-([0-9.]+)-bin\.zip$') {
                return $Matches[1]
            }
        }
    }

    return '3.9.11'
}

function Get-DistributionUrl([string]$version) {
    "https://repo1.maven.org/maven2/org/apache/maven/apache-maven/$version/apache-maven-$version-bin.zip"
}

function Assert-JavaAvailable {
    $javaExe = Get-JavaExecutable
    if (-not $javaExe) {
        throw 'Java não foi encontrado no PATH nem em JAVA_HOME. Instale um JDK 17+ para usar o Maven Wrapper.'
    }

    $env:JAVA_HOME = Split-Path -Parent (Split-Path -Parent $javaExe)
    $env:PATH = "$($env:JAVA_HOME)\bin;$env:PATH"
}

function Get-JavaExecutable {
    if ($env:JAVA_HOME) {
        $candidate = Join-Path $env:JAVA_HOME 'bin\java.exe'
        if (Test-Path $candidate) {
            return $candidate
        }
    }

    $command = Get-Command java -ErrorAction SilentlyContinue
    if ($command) {
        return $command.Source
    }

    $knownJdks = @(
        'C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot\bin\java.exe',
        'C:\Program Files\Microsoft\jdk-21.0.0.0-hotspot\bin\java.exe',
        'C:\Program Files\Eclipse Adoptium\jdk-17*\bin\java.exe',
        'C:\Program Files\Eclipse Adoptium\jdk-21*\bin\java.exe'
    )

    foreach ($pattern in $knownJdks) {
        $match = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($match) {
            return $match.FullName
        }
    }

    return $null
}

function Ensure-MavenDistribution([string]$version) {
    $projectRoot = Get-ProjectRoot
    $cacheRoot = Join-Path $env:USERPROFILE ".m2\wrapper\dists\apache-maven-$version-bin"
    $distributionRoot = Join-Path $cacheRoot "apache-maven-$version"
    $mvnCmd = Join-Path $distributionRoot 'bin\mvn.cmd'

    if (Test-Path $mvnCmd) {
        return $mvnCmd
    }

    New-Item -ItemType Directory -Force -Path $cacheRoot | Out-Null
    $tmpRoot = Join-Path $env:TEMP ("mvnw-" + [Guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Force -Path $tmpRoot | Out-Null

    $zipFile = Join-Path $tmpRoot "apache-maven-$version-bin.zip"
    $url = Get-DistributionUrl $version

    Write-Host "Baixando Maven $version..."
    Invoke-WebRequest -Uri $url -OutFile $zipFile

    Write-Host 'Extraindo Maven...'
    Expand-Archive -Path $zipFile -DestinationPath $cacheRoot -Force

    if (-not (Test-Path $mvnCmd)) {
        throw "Não foi possível localizar o executável do Maven em $mvnCmd"
    }

    return $mvnCmd
}

Assert-JavaAvailable
$version = Get-MavenVersion
$mvnCmd = Ensure-MavenDistribution $version

& $mvnCmd @args
exit $LASTEXITCODE

