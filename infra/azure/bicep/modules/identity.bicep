param location string
param namePrefix string
param tags object

resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: '${namePrefix}-id'
  location: location
  tags: tags
}

output id string = identity.id
output principalId string = identity.properties.principalId
