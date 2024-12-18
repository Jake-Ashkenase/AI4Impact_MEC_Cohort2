export const AUTHENTICATION = true;

// change these as needed
// kendraIndexName - must be unique to your account
export const kendraIndexName = 'prod-mec'
// must be unique globally or the deployment will fail
export const cognitoDomainName = "mec-chatbot-nonprod"
// this can be anything that would be understood easily, but you must use the same name
// when setting up a sign-in provider in Cognito
export const OIDCIntegrationName = "AzureAD-OIDC-MEC"
// this MUST be unique to your account
export const stackName = "MECKnowledgeStack"
