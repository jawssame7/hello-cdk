import * as cdk from "aws-cdk-lib";
import { Lambda } from "aws-cdk-lib/aws-ses-actions";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// Import the Lambda module
import * as lambda from "aws-cdk-lib/aws-lambda";

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'HelloCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // defien lambda function

    const myFunction = new lambda.Function(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = async (evnet) => {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello CDK!! from Lambda!'),
          };
        };
      `),
    });

    // define lambda function URL resource
    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // define a cloudformation output for url
    new cdk.CfnOutput(this, "myFunctionUrlOutput", {
      value: myFunctionUrl.url,
    });
  }
}
