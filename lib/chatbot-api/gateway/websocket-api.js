"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketBackendAPI = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class WebsocketBackendAPI extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // Create the main Message Topic acting as a message bus
        const webSocketApi = new aws_cdk_lib_1.aws_apigatewayv2.WebSocketApi(this, 'WS-API');
        const webSocketApiStage = new aws_cdk_lib_1.aws_apigatewayv2.WebSocketStage(this, 'WS-API-prod', {
            webSocketApi,
            stageName: 'prod',
            autoDeploy: true,
        });
        this.wsAPI = webSocketApi;
        this.wsAPIStage = webSocketApiStage;
    }
}
exports.WebsocketBackendAPI = WebsocketBackendAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnNvY2tldC1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQTBEO0FBQzFELDJDQUF1QztBQVN2QyxNQUFhLG1CQUFvQixTQUFRLHNCQUFTO0lBR2hELFlBQ0UsS0FBZ0IsRUFDaEIsRUFBVSxFQUNWLEtBQStCO1FBRS9CLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsd0RBQXdEO1FBQ3hELE1BQU0sWUFBWSxHQUFHLElBQUksOEJBQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlELE1BQU0saUJBQWlCLEdBQUksSUFBSSw4QkFBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3pFLFlBQVk7WUFDWixTQUFTLEVBQUUsTUFBTTtZQUNqQixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDO0lBRXRDLENBQUM7Q0FFRjtBQXRCRCxrREFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBhd3NfYXBpZ2F0ZXdheXYyIGFzIGFwaWd3djIgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbi8vIGltcG9ydCB7IE5hZ1N1cHByZXNzaW9ucyB9IGZyb20gXCJjZGstbmFnXCI7XG5cbmludGVyZmFjZSBXZWJzb2NrZXRCYWNrZW5kQVBJUHJvcHMgeyAgXG4gIC8vIHJlYWRvbmx5IHVzZXJQb29sOiBVc2VyUG9vbDtcbiAgLy8gcmVhZG9ubHkgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG59XG5cbmV4cG9ydCBjbGFzcyBXZWJzb2NrZXRCYWNrZW5kQVBJIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IHdzQVBJIDogYXBpZ3d2Mi5XZWJTb2NrZXRBcGk7XG4gIHB1YmxpYyByZWFkb25seSB3c0FQSVN0YWdlIDogYXBpZ3d2Mi5XZWJTb2NrZXRTdGFnZTtcbiAgY29uc3RydWN0b3IoXG4gICAgc2NvcGU6IENvbnN0cnVjdCxcbiAgICBpZDogc3RyaW5nLFxuICAgIHByb3BzOiBXZWJzb2NrZXRCYWNrZW5kQVBJUHJvcHNcbiAgKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICAvLyBDcmVhdGUgdGhlIG1haW4gTWVzc2FnZSBUb3BpYyBhY3RpbmcgYXMgYSBtZXNzYWdlIGJ1c1xuICAgIGNvbnN0IHdlYlNvY2tldEFwaSA9IG5ldyBhcGlnd3YyLldlYlNvY2tldEFwaSh0aGlzLCAnV1MtQVBJJyk7XG4gICAgY29uc3Qgd2ViU29ja2V0QXBpU3RhZ2UgPSAgbmV3IGFwaWd3djIuV2ViU29ja2V0U3RhZ2UodGhpcywgJ1dTLUFQSS1wcm9kJywge1xuICAgICAgd2ViU29ja2V0QXBpLFxuICAgICAgc3RhZ2VOYW1lOiAncHJvZCcsXG4gICAgICBhdXRvRGVwbG95OiB0cnVlLCAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMud3NBUEkgPSB3ZWJTb2NrZXRBcGk7XG4gICAgdGhpcy53c0FQSVN0YWdlID0gd2ViU29ja2V0QXBpU3RhZ2U7XG4gICAgXG4gIH1cblxufVxuIl19