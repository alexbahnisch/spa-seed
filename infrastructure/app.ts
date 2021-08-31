#!/usr/bin/env ts-node
import * as cdk from '@aws-cdk/core'
import { config } from 'dotenv'

import { SeedStack } from './seed-stack'

config()

function main(): cdk.App {
  const awsAccount = process.env.AWS_ACCOUNT
  const awsRegion = process.env.AWS_REGION
  const imageTag = process.env.IMAGE_TAG
  const seedOwner = process.env.SEED_OWNER
  const seedProject = process.env.SEED_PROJECT
  const seedVpcId = process.env.SEED_VPC_ID

  const app = new cdk.App()

  if (!awsAccount || !awsRegion || !seedOwner || !seedProject || !imageTag || !seedVpcId) {
    console.error('poo - f842050f-5ba1-4900-ae09-fdb653a52903')
    return app
  }

  new SeedStack(app, 'seed', {
    version: imageTag,
    vpcId: seedVpcId,
    env: { account: awsAccount, region: awsRegion },
    tags: { owner: seedOwner, project: seedProject },
  })

  return app
}

main().synth()
