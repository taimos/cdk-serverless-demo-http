const { HttpApiAspect } = require('cdk-serverless/lib/projen');
const { awscdk } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.2.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-serverless-demo-http',
  deps: [
    'cdk-serverless',
  ],
  tsconfig: {
    compilerOptions: {
      allowSyntheticDefaultImports: true,
    },
  },
});

new HttpApiAspect(project, {
  cdkWatch: {
    dev: 'my-http-stack-dev/**',
  },
});

project.synth();
