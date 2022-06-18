const aws = require('aws-sdk')

module.exports = {
    credentials: new aws.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }),
    region: process.env.EC2_REGION
}