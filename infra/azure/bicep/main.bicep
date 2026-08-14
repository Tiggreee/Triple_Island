// Coco B Isla — WordPress headless backend on Azure.
// Deploy: az deployment group create -g <rg> -f main.bicep -p @main.parameters.json
targetScope = 'resourceGroup'

@description('Short name used to derive all resource names (lowercase, alnum, no spaces).')
param namePrefix string = 'cocobwp'

param location string = resourceGroup().location

@description('Region for MySQL Flexible Server. Some subscriptions (e.g. startup) lack MySQL capacity in the default region, so it is overridable independently.')
param mysqlLocation string = 'westus2'

@description('Full image ref, e.g. <acrLoginServer>/cocob-wordpress:latest. Left as the public image for the first apply; the pipeline updates it on every push.')
param containerImage string = 'wordpress:6.6-php8.3-apache'

param mysqlAdminLogin string = 'cocob_admin'

@secure()
param mysqlAdminPassword string

param mysqlDbName string = 'cocob_platform'

@secure()
@description('The AI provider key (Groq). Same variable name/value the Next.js side already uses.')
param aiApiKey string

var tags = {
  project: 'cocob-isla'
  managedBy: 'bicep'
}

module identity 'modules/identity.bicep' = {
  name: 'identity'
  params: {
    location: location
    namePrefix: namePrefix
    tags: tags
  }
}

module acr 'modules/acr.bicep' = {
  name: 'acr'
  params: {
    location: location
    namePrefix: namePrefix
    tags: tags
  }
}

module mysql 'modules/mysql.bicep' = {
  name: 'mysql'
  params: {
    location: mysqlLocation
    namePrefix: namePrefix
    tags: tags
    adminLogin: mysqlAdminLogin
    adminPassword: mysqlAdminPassword
    dbName: mysqlDbName
  }
}

module storage 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    location: location
    namePrefix: namePrefix
    tags: tags
  }
}

module insights 'modules/insights.bicep' = {
  name: 'insights'
  params: {
    location: location
    namePrefix: namePrefix
    tags: tags
  }
}

// Storage connection string is composed inside the keyvault module (from the
// storage account name) so listKeys() runs after the account exists and the
// secret never leaves a module boundary as a plain output.
module keyvault 'modules/keyvault.bicep' = {
  name: 'keyvault'
  params: {
    location: location
    namePrefix: namePrefix
    tags: tags
    tenantId: subscription().tenantId
    principalId: identity.outputs.principalId
    mysqlAdminPassword: mysqlAdminPassword
    storageAccountName: storage.outputs.storageAccountName
    aiApiKey: aiApiKey
  }
}

module containerapp 'modules/containerapp.bicep' = {
  name: 'containerapp'
  params: {
    location: location
    namePrefix: namePrefix
    tags: tags
    identityId: identity.outputs.id
    identityPrincipalId: identity.outputs.principalId
    acrLoginServer: acr.outputs.loginServer
    acrId: acr.outputs.acrId
    containerImage: containerImage
    logAnalyticsId: insights.outputs.logAnalyticsId
    appInsightsConnectionString: insights.outputs.connectionString
    keyVaultUri: keyvault.outputs.vaultUri
    mysqlFqdn: mysql.outputs.fqdn
    mysqlDbName: mysqlDbName
    mysqlAdminLogin: mysqlAdminLogin
    storageAccountName: storage.outputs.storageAccountName
    blobEndpoint: storage.outputs.blobEndpoint
  }
}

output containerAppFqdn string = containerapp.outputs.fqdn
output acrLoginServer string = acr.outputs.loginServer
output acrName string = acr.outputs.acrName
output mysqlFqdn string = mysql.outputs.fqdn
output keyVaultName string = keyvault.outputs.vaultName
