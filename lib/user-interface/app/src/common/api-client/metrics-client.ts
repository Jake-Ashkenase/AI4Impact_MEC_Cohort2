import {
  Utils
} from "../utils"
import { AppConfig } from "../types"; 

// This was made by cohort 1. I'm using it to add KPI data
export class MetricClient {
  private readonly API: string;
  constructor(protected _appConfig: AppConfig) {
    this.API = _appConfig.httpEndpoint.slice(0,-1);}

  async getInvocationCount() {
    try {
      const auth = await Utils.authenticate();      
      const response = await fetch(this.API + '/chat-invocations-count', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : auth,
          "Access-Control-Allow-Origin": "*",
        },        
      });
      //console.log(response);
      return await response.json()
    }
    catch (err) {
      console.log(err);
      return "unknown";
    }
  }

  async getResponseTime() {
    try {
      const auth = await Utils.authenticate();      
      const response = await fetch(this.API + '/response-time', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : auth
        },        
      });
      //console.log(response);
      return await response.json()
    }
    catch (err) {
      console.log(err);
      return "unknown";
    }
  }

  async saveChatInteraction(interactionData) {
    // timestamp generated in lambda function
    //console.log(interactionData["interaction_data"]);//.interaction_data);
    //console.log("hi hi")
    console.log(JSON.stringify({interaction_data: interactionData}));
    try {
      const auth = await Utils.authenticate();      
      const response = await fetch(this.API + '/chatbot-use', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : auth,
        },
        body: JSON.stringify({interaction_data: interactionData}),
      })
      //console.log(JSON.stringify({interaction_data: interactionData}));
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', response.status, errorText);
      } else {
        console.log('CHAT INTERACTION SAVED');
      }
    } catch (e) {
      console.log('Chat interaction not saved - ' + e);
    }
  }
      
  

  async getChatbotUse(startTime? : string, endTime? : string, nextPageToken? : string) {
    try {
      const auth = await Utils.authenticate();
      console.log(startTime + endTime + nextPageToken);
      let params = new URLSearchParams({startTime,endTime,nextPageToken});
      let keysForDel = [];
      params.forEach((value, key) => { // this'll delete the nextPageToken if it's null
        // console.log(value, key)
        if (value === undefined || value == "undefined") {
          keysForDel.push(key);
        }
      });
  
      keysForDel.forEach(key => {
        params.delete(key);
      });

      console.log(this.API + '/chatbot-use' + params.toString());
    
      const response = await fetch(this.API + '/chatbot-use?' + params.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : auth,
          //'Access-Control-Allow-Origin': '*',
        },        
      });
      console.log("Response: " + response);
      return await response.json()
    } catch (e) {
      console.log(e);
    }
}
}