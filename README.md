# aws-lambda-instagram

Get your Instagram feed without exposing your access token via aws lambda

#### How to
1. `git clone https://github.com/mllrsohn/aws-lambda-instagram && cd aws-lambda-instagram`
2. `cp config.sample.js config.js` add your aws access token
3. `yarn run setup`
4. fill out the `.env` file generated. [More info](https://github.com/motdotla/node-lambda#setup)
5. `yarn run deploy`
6. Setup a API Gateway in aws
6. done
