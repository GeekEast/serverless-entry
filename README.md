### Prerequisite
- AWS Account - Set Credentials with `AccessKey` and `SecrectKey`
- AWS `Cli` & `Serverless`
```sh
npm install -g aws-cli serverless
```
- Serverless config credentials
```sh
sls config credentials --provider aws --key [AccessKey] --secrect [SecretKey] --profile [UserName]
```
### [Examples](https://github.com/serverless/examples)
### Hello World
- create a project with Serverless [Template](https://serverless.com/framework/docs/providers/aws/cli-reference/create#available-templates)
```sh
sls create -t aws-nodejs-typescript
yarn add aws-lambda
yarn add @types/aws-lambda
```
- config `serverless.yml` file
```yml
service:
  name: serverless-demo # one service could have many lambda functions

# Add the serverless-webpack plugin
plugins:
  - serverless-webpack

provider:
  name: aws
  versionFunctions: false
  runtime: nodejs10.x # use node version >= 10
  region: ap-southeast-2
  stage: dev

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          method: get
          path: hello
```

### Local Development
- run locally
```sh
sls invoke local -f hello
```
- Pass `string` data into lambda function
  > The `event` object is actually the `data` passed into the function
```sh
sls invoke local -f hello -d 'Hello World'
```
- Pass Json String into lambda function
```sh
sls invoke local -f hello -d '{"first": 1, "Second":10}'
```

