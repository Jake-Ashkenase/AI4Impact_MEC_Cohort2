import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from "constructs";

export class S3BucketStack extends cdk.Stack {
  public readonly kendraBucket: s3.Bucket;
  public readonly feedbackBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new S3 bucket
    this.kendraBucket = new s3.Bucket(scope, 'KendraSourceBucket', {
      // bucketName: 'kendra-s3-source',
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET,s3.HttpMethods.POST,s3.HttpMethods.PUT,s3.HttpMethods.DELETE],
        allowedOrigins: ['*'],      
        allowedHeaders: ["*"]
      }],
      publicReadAccess: true, // Enables public read access
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicPolicy: false,
        blockPublicAcls: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      accessControl: s3.BucketAccessControl.PUBLIC_READ, // Public read access
      objectOwnership: s3.ObjectOwnership.OBJECT_WRITER // Object writer ownership
    });

    this.feedbackBucket = new s3.Bucket(scope, 'FeedbackDownloadBucket', {
      // bucketName: 'feedback-download',
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET,s3.HttpMethods.POST,s3.HttpMethods.PUT,s3.HttpMethods.DELETE],
        allowedOrigins: ['*'], 
        allowedHeaders: ["*"]     
      }]
    });
  }
}
