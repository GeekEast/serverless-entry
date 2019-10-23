<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
&nbsp;

- [Prerequisite](#prerequisite)
- [Project 1](#project-1)
  - [Hello World](#hello-world)
  - [Local Development](#local-development)
  - [Restful API Local Server](#restful-api-local-server)
  - [Deployment](#deployment)
  - [Logging](#logging)
  - [Remove](#remove)
- [Project 2](#project-2)
  - [Scheduled Function](#scheduled-function)
  - [Local Development](#local-development-1)
  - [Deploy](#deploy)
  - [Logging in real-time](#logging-in-real-time)
  - [Remove](#remove-1)
- [AWS CLI Reference](#aws-cli-reference)
  - [Shorthand](#shorthand)
  - [Boilerplate](#boilerplate)
  - [Deployment and Removal](#deployment-and-removal)
  - [Information](#information)
  - [Logging](#logging-1)
  - [Invoke](#invoke)
  - [Plugins](#plugins)
  - [More](#more)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Prerequisite
- AWS Account - Set Credentials with `AccessKey` and `SecrectKey`
- AWS `Cli` & `Serverless`
```sh
npm install -g aws-cli serverless
```
- Serverless config credentials
```sh
sls config credentials --provider aws --key [AccessKey] --secrect [SecretKey] --profile [UserName]
```
- [Code Examples](https://github.com/serverless/examples)
- [Examples](https://serverless.com/examples/)

## Project 1

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
  > You could use `console.log()` to debug
```sh
sls invoke local -f hello -d '{"first": 1, "second":10}'
```

### Restful API Local Server
- `serverless-offline` **mimic** aws `lambda function` on `local` environemnt
```sh
npm init -y
yarn add --dev serverless-offline
```
- add to `serverless.yml`
```yml
plugins:
  - serverless-offline
```
- Add Routers (`Already` have)
```yml
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          method: get
          path: hello
```
- run serverless offline
```sh
# lancuh the lambda functiuon as a server
serverless offline
```

### Deployment
```sh
sls deploy # all functions will be deployed to dev stage
sls deploy -f hello # only deploy hello function to dev stage
```
- deploy to production stage
```sh
sls deploy -s production -f hello
```
- `AWS Lambda `> `Applications`

### Logging
- See the log of `last 15 minutes` of the `hello` function in `dev` stage
```sh
sls logs -f hello -s dev --startTime 15m
```

### Remove 
```sh
sls remove -s dev # remove all things in dev stage
```

## Project 2

### Scheduled Function
- [cron jobs](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html): `scheduled` jobs
```javascript
import 'source-map-support/register';
export const hello = async (event, _context) => {
  const time = new Date();
  console.log(`Your cron function "${_context.functionName}" ran at ${time}`);
}
```
- modify `serverless.yml` file to schedule function
```yml
functions:
  hello:
    handler: handler.hello
    events:
      - schedule: rate(1 minute) # or cron syntax
```

### Local Development
- Install
```sh
yarn add --dev serverless-offline-scheduler
```
- config `yml` file
```yml
plugins:
  - serverless-offline-scheduler
```
- run cron job
```sh
sls schedule
```

### Deploy
```sh
sls deploy -s dev -f hello
```

### Logging in real-time
```sh
sls logs -f hello -s dev -t
```

### Remove
```sh
sls remove
```

## [AWS CLI Reference](https://serverless.com/framework/docs/providers/aws/cli-reference/)

### Shorthand
```sh
serverless
sls
```
```sh
--template
-t
```
### [Boilerplate](https://serverless.com/framework/docs/providers/aws/cli-reference/create#available-templates)
- create from template inside current folder
```sh
sls create -t aws-nodejs-typescript
```

### Deployment and Removal
- deploy things in `default` stage which is set in `yml` file
```sh
sls deploy
```
- deploy things in the `dev` stage
```sh
sls deploy -s dev
```
- remove `current` project
```
sls remove
```
- remove things in the `dev` stage
```sh
sls remove -s dev
```
- remove function in a specified regin
```sh
sls remove -s dev -r us-east-1
```

### [Information](https://serverless.com/framework/docs/providers/aws/cli-reference/info/)
- get current project information
```sh
sls info
sks info -s dev
```

### [Logging](https://serverless.com/framework/docs/providers/aws/cli-reference/logs/)
```sh
sls logs -f my_function # by default in dev stage,
sls logs -f my_function -s production -r us-west-2 # as many logs as it can
sls logs -f my_function --startTime 5m # last 5 minutes logs
sls logs -f my)_function -t # logging in real time manner
```

### Invoke
- [Local](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/)
```sh
sls invoke local -f my_function # invoke without data
sls invoke local -f my_function -d "sth" # input string data
sls invoke local -f my_function -p data.json # input data from json
```
- [Cloud](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke/)
```sh
serverless invoke --function functionName --stage dev --region us-east-1

serverless invoke --function functionName --stage dev --region us-east-1 --data "hello world"

serverless invoke --function functionName --stage dev --region us-east-1 --path lib/data.json

serverless invoke --function functionName --stage dev --region us-east-1 --log
```

### [Plugins](https://github.com/serverless/plugins)
```sh
sls plugin list
```
- `serverless-offline`: local API server
- `serverless-offline-scheduler`: local cron server

### [More](https://serverless.com/framework/docs/)


