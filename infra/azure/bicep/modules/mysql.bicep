param location string
param namePrefix string
param tags object
param adminLogin string
@secure()
param adminPassword string
param dbName string

@description('Salt appended to the server name. MySQL Flexible Server reserves a deleted server name for a while, so a new salt yields a fresh name after a failed provision.')
param nameSalt string = 'a2'

resource mysql 'Microsoft.DBforMySQL/flexibleServers@2023-12-30' = {
  name: '${namePrefix}-mysql-${nameSalt}-${uniqueString(resourceGroup().id)}'
  location: location
  tags: tags
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    administratorLogin: adminLogin
    administratorLoginPassword: adminPassword
    version: '8.0.21'
    storage: {
      storageSizeGB: 20
      autoGrow: 'Enabled'
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    highAvailability: {
      mode: 'Disabled'
    }
  }
}

resource database 'Microsoft.DBforMySQL/flexibleServers/databases@2023-12-30' = {
  parent: mysql
  name: dbName
  properties: {
    charset: 'utf8mb4'
    collation: 'utf8mb4_unicode_ci'
  }
}

// MVP networking: allow Azure services only (Container Apps Consumption plan has
// no static outbound IP without a NAT gateway). Tighten to a VNET rule once the
// Container Apps environment has one — see arquitectura.md, "siguiente fase".
resource allowAzureServices 'Microsoft.DBforMySQL/flexibleServers/firewallRules@2023-12-30' = {
  parent: mysql
  name: 'AllowAzureServices'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

output serverName string = mysql.name
output fqdn string = mysql.properties.fullyQualifiedDomainName
