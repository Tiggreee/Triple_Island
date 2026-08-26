param location string
param namePrefix string
param tags object
param identityId string
param identityPrincipalId string
param acrLoginServer string
param acrId string
param containerImage string
param logAnalyticsId string
param appInsightsConnectionString string
param keyVaultUri string
param mysqlFqdn string
param mysqlDbName string
param mysqlAdminLogin string
param storageAccountName string
param blobEndpoint string

resource acrRef 'Microsoft.ContainerRegistry/registries@2023-11-01-preview' existing = {
  name: split(acrId, '/')[8]
}

resource acrPullRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(acrId, identityId, 'AcrPull')
  scope: acrRef
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '7f951dda-4ed3-4680-a7ca-43fe172d538d' // AcrPull
    )
    principalId: identityPrincipalId
    principalType: 'ServicePrincipal'
  }
}

resource env 'Microsoft.App/managedEnvironments@2023-11-02-preview' = {
  name: '${namePrefix}-cae'
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: reference(logAnalyticsId, '2023-09-01').customerId
        sharedKey: listKeys(logAnalyticsId, '2023-09-01').primarySharedKey
      }
    }
  }
}

resource containerApp 'Microsoft.App/containerApps@2023-11-02-preview' = {
  name: '${namePrefix}-ca'
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${identityId}': {}
    }
  }
  properties: {
    managedEnvironmentId: env.id
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        external: true
        targetPort: 80
        transport: 'auto'
      }
      registries: [
        {
          server: acrLoginServer
          identity: identityId
        }
      ]
      secrets: [
        {
          name: 'mysql-admin-password'
          keyVaultUrl: '${keyVaultUri}secrets/mysql-admin-password'
          identity: identityId
        }
        {
          name: 'storage-connection-string'
          keyVaultUrl: '${keyVaultUri}secrets/storage-connection-string'
          identity: identityId
        }
        {
          name: 'ai-api-key'
          keyVaultUrl: '${keyVaultUri}secrets/ai-api-key'
          identity: identityId
        }
      ]
    }
    template: {
      scale: {
        minReplicas: 1
        maxReplicas: 2
      }
      containers: [
        {
          name: 'wordpress'
          image: containerImage
          resources: {
            cpu: json('0.5')
            memory: '1Gi'
          }
          env: [
            { name: 'WORDPRESS_DB_HOST', value: '${mysqlFqdn}:3306' }
            { name: 'WORDPRESS_DB_NAME', value: mysqlDbName }
            { name: 'WORDPRESS_DB_USER', value: mysqlAdminLogin }
            { name: 'WORDPRESS_DB_PASSWORD', secretRef: 'mysql-admin-password' }
            { name: 'AZURE_STORAGE_ACCOUNT', value: storageAccountName }
            { name: 'AZURE_STORAGE_CONNECTION_STRING', secretRef: 'storage-connection-string' }
            { name: 'AZURE_BLOB_ENDPOINT', value: blobEndpoint }
            { name: 'AI_API_KEY', secretRef: 'ai-api-key' }
            { name: 'APPLICATIONINSIGHTS_CONNECTION_STRING', value: appInsightsConnectionString }
          ]
        }
      ]
    }
  }
  dependsOn: [
    acrPullRole
  ]
}

output fqdn string = containerApp.properties.configuration.ingress.fqdn
