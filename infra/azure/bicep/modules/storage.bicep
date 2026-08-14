param location string
param namePrefix string
param tags object

resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: '${namePrefix}${uniqueString(resourceGroup().id)}'
  location: location
  tags: tags
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    accessTier: 'Hot'
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storage
  name: 'default'
}

resource mediaContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: 'wp-media'
  properties: {
    publicAccess: 'Blob'
  }
}

output storageAccountName string = storage.name
output blobEndpoint string = storage.properties.primaryEndpoints.blob
