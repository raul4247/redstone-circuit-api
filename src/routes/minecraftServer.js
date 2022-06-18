const express = require('express')
const aws = require('aws-sdk')
const awsCredentials = require('../config/awsCredentials')
const router = express.Router()


function configEC2Access() {
    aws.config.update(awsCredentials)

    const EC2 = new aws.EC2({
        apiVersion: '2016-11-15',
        region: process.env.EC2_REGION
    })

    var params = {
        InstanceIds: [process.env.EC2_INSTANCE_ID]
    }

    return { EC2, params }
}

router.get('/info', async (req, res) => {
    try {
        const { EC2, params } = configEC2Access()

        EC2.describeInstances(params, (err, data) => {
            if (err) {
                console.log(err, err.stack)
                res.status(406).send(err)
            }
            else {
                const instance = data.Reservations[0].Instances[0]

                const instance_info = {
                    endpoint: instance.PublicDnsName,
                    ip: instance.PublicIpAddress,
                    status: instance.State.Name,
                    launch_time: instance.LaunchTime
                }

                // if (instance.State.Name === 'running') {
                //     minecraft.status(instance_info.ip, process.env.MINECRAFT_PORT,
                //         (minecraft_info) => {
                //             res.status(200).send({ instance_info, minecraft_info })
                //         }
                //     )
                // }

                res.status(200).send({ instance_info })
            }
        })
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to get server info' })
    }
})

router.get('/open', async (req, res) => {
    try {
        const { EC2, params } = configEC2Access()

        EC2.startInstances(params, async (err, data) => {
            if (err) {
                console.log(err, err.stack)
                res.status(406).send(err)
            }
            else {
                res.sendStatus(204)
            }
        })
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to open the server' })
    }
})

router.get('/close', async (req, res) => {
    try {
        const { EC2, params } = configEC2Access()

        EC2.stopInstances(params, async (err, data) => {
            if (err) {
                console.log(err, err.stack)
                res.status(406).send(err)
            }
            else {
                res.sendStatus(204)
            }
        })
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to close the server' })
    }
})

router.get('/reboot', async (req, res) => {
    try {
        const { EC2, params } = configEC2Access()

        EC2.rebootInstances(params, async (err, data) => {
            if (err) {
                console.log(err, err.stack)
                res.status(406).send(err)
            }
            else {
                res.sendStatus(204)
            }
        })
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to reboot the server' })
    }
})

module.exports = router