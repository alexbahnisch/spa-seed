ifneq ("$(wildcard help.mk)","")
	include help.mk
endif

ifneq ("$(wildcard .env)","")
	include .env
	export AWS_ACCESS_KEY_ID:=${AWS_ACCESS_KEY_ID}
	export AWS_SECRET_ACCESS_KEY:=${AWS_SECRET_ACCESS_KEY}
endif

ifeq ($(shell uname),Linux)
	CDK = \time --format "Command '%C' ran for '%E' (%e seconds)" npx cdk
else
	CDK = npx cdk
endif

export DOCKER_BUILDKIT ?= 1

IMAGE_NAME = "opengear/spa-seed"
IMAGE_TAG ?= "latest"

AWS_ACCOUNT ?= 127282476268
AWS_REGION ?= ap-southeast-2


# Developer targets:

.PHONY: init
## initialise this project
init:
	@cp -n default.env .env
	@npm install

.PHONY: audit
## security audit dependencies
audit:
	@npm run audit

.PHONY: build
## production build application
build:
	@npm run build

.PHONY: clean
## delete cached files
clean:
	@rm -rf .build .coverage node_modules cdk.context.json cdk.out

.PHONY: fix
## automatically fix project files
fix:
	@-npm run audit:fix
	@-npm run lint:fix

.PHONY: lint
## lint and format project
lint:
	@npm run lint

.PHONY: server
## run local server (depends on either 'build' or 'watch')
server:
	@npm run server

.PHONY: test
## run unit tests
test:
	@npm run test

.PHONY: type
## run type checking
type:
	@npm run type

.PHONY: watch
## build & watch application
watch:
	@npm run watch


# Docker compose targets

.PHONY: compose_dev
## build & run all containers for a local developer build with docker-compose
compose_dev:
	@docker-compose up --build --detach
	@docker-compose logs --follow server

.PHONY: compose_lambda
## build & run lambda container with docker-compose
compose_lambda:
	@docker-compose --file docker-compose.lambda.yml up --build --detach
	@docker-compose --file docker-compose.lambda.yml logs --follow lambda

.PHONY: compose_prod
## build & run production like container with docker-compose
compose_prod:
	@docker-compose --file docker-compose.prod.yml up --build --detach
	@docker-compose --file docker-compose.prod.yml logs --follow server

.PHONY: compose_down
## down all docker containers and volumes
compose_down:
	@docker-compose --file docker-compose.yml down --volumes
	@docker-compose --file docker-compose.lambda.yml down --volumes
	@docker-compose --file docker-compose.prod.yml down --volumes


# Docker build and publish targets:

.PHONY: docker_build
## build frontend image
docker_build:
	@docker build . \
		--tag "${IMAGE_NAME}:${IMAGE_TAG}" \
		--target lambda

.PHONY: docker_login
## log docker into AWS ECR
docker_login:
	-@aws ecr get-login-password --region ${AWS_REGION} | \
		docker login --username AWS --password-stdin "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"

.PHONY: docker_publish
## build & publish frontend image to AWS ECR
docker_publish: docker_login docker_build
	-@aws ecr create-repository \
		--repository-name "${IMAGE_NAME}" \
		--image-scanning-configuration scanOnPush=true \
		--image-tag-mutability IMMUTABLE \
		--region "${AWS_REGION}" > /dev/null 2> /dev/null
	@docker tag \
		"${IMAGE_NAME}:${IMAGE_TAG}" \
		"${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME}:${IMAGE_TAG}"
	@docker push \
		"${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE_NAME}:${IMAGE_TAG}"
	-@docker logout


# CDK targets:

.PHONY: cdk_bootstrap
## bootstrap cdk infrastructure for account $ region
cdk_bootstrap:
	@${CDK} bootstrap "aws://${AWS_ACCOUNT}/${AWS_REGION}"

.PHONY: cdk_deploy
## deploy seed stack
cdk_deploy:
	@${CDK} deploy --require-approval never

.PHONY: cdk_destroy
## destroy seed stack
cdk_destroy:
	@${CDK} destroy --force
