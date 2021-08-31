import * as apigateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as ecr from '@aws-cdk/aws-ecr'
import * as cdk from '@aws-cdk/core'

interface IProps extends cdk.StackProps {
  version: string
  vpcId: string
}

export class SeedStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, { version, vpcId, ...props }: IProps) {
    super(scope, id, props)

    const vpc = ec2.Vpc.fromLookup(this, 'vpc', {
      isDefault: false,
      vpcId,
    })

    const lambdaFunction = new lambda.DockerImageFunction(this, 'lambda', {
      code: lambda.DockerImageCode.fromEcr(ecr.Repository.fromRepositoryName(this, 'image', 'opengear/spa-seed'), {
        tag: version,
      }),
      memorySize: 256,
      vpc,
    })

    const gateway = new apigateway.LambdaRestApi(this, 'gateway', {
      binaryMediaTypes: ['image/x-icon'],
      handler: lambdaFunction,
      minimumCompressionSize: 10240,
      proxy: true,
    })

    new cdk.CfnOutput(this, 'url', {
      value: gateway.url,
    })
  }
}
