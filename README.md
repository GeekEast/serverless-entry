## Project 1
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
  > You could use `console.log()` to debug
```sh
sls invoke local -f hello -d '{"first": 1, "second":10}'
```

### Restful API
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
- You can use `locally` `invoke`
```
sls invoke local -f hello 
```
- `serveless offline` **doesn't** fit into this.
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



