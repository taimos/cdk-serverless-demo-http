const { HttpApiAspect } = require('cdk-serverless/lib/projen');
const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.98.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkTypeScriptApp',
  name: 'cdk-serverless-demo-http',
  deps: [
    'cdk-serverless',
  ],
});

new HttpApiAspect(project, {
  cdkWatch: {
    dev: 'my-http-stack-dev/**',
  },
});

project.synth();
