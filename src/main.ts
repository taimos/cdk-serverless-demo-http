import { App, Stack, StackProps } from 'aws-cdk-lib';
import { HttpApi } from 'cdk-serverless/lib/constructs';
import { Construct } from 'constructs';
import { paths, operations } from './lambda/types.generated';

export class MyHttpStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const api = new HttpApi<paths, operations>(this, 'Api', {
      apiName: 'testapi',
      domainName: 'customer.taimos.de',
      apiHostname: 'http-demo',
      stageName: 'dev',
      singleTableDatastore: {
        design: {
          reverseGSI: true,
        },
      },
      autoGenerateRoutes: true,
      monitoring: true,
      authentication: {
        groups: {
          admin: 'Admins',
          moderators: 'Mods',
        },
        triggers: {
          customMessages: true,
        },
      },
    });

    api.getFunctionForOperation('addTodo').grantSendEmails();
  }
}

const devEnv = {
  account: '538118019757',
  region: 'eu-central-1',
};

const app = new App();

new MyHttpStack(app, 'my-http-stack-dev', { env: devEnv });

app.synth();