import { SelectProps } from "@cloudscape-design/components";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";


export interface AppConfig {
  Auth: {
    region: string,
    userPoolId: string,
    userPoolWebClientId: string,
    oauth: {
      domain: string,
      scope: string[],
      redirectSignIn: string,
      // redirectSignOut: "https://myapplications.microsoft.com/",
      responseType: string,
    }
  },
  httpEndpoint : string,
  wsEndpoint : string,
  federatedSignInProvider : string,
}

export interface NavigationPanelState {
  collapsed?: boolean;
  collapsedSections?: Record<number, boolean>;
}

export type LoadingStatus = "pending" | "loading" | "finished" | "error";
export type RagDocumentType =
  | "file"
  | "text"
  | "qna"
  | "website"
  | "rssfeed"
  | "rsspost";
export type AdminDataType =
  | "file"
  | "feedback"
  | "evaluationSummary"
  | "detailedEvaluation";
  


