# spa-seed

AWS, react and typescript SPA seed.

## Requirements
* docker >= 20.10.7 ([install](https://docs.docker.com/get-docker/))
* docker-compose >= 1.29.2 ([install](https://docs.docker.com/compose/install/))
* make >= 3.81 ([windows install](http://gnuwin32.sourceforge.net/packages/make.htm))
* aws-cli ([install](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html))
* node.js >= 14.18.1 and npm >= 8.0.0 ([install](https://nodejs.org/), update npm with `npm install -g npm@latest`)

## Environment variables
* `AWS_ACCESS_KEY_ID` is required to publish images to AWS ECR and deploy the application with AWS CDK.
* `AWS_SECRET_ACCESS_KEY` is required to publish images to AWS ECR and deploy the application with AWS CDK.
* `SEED_OWNER` is required to deploy the application with AWS CDK.
* `SEED_PROJECT` is required to deploy the application with AWS CDK.
* `SEED_VPC_ID` is required to deploy the application with AWS CDK.

## Project Structure
```
├── app               # Application and unit test code
│   ├── assets          # Static assets to be bundle with application
│   ├── common          # Code shared between ui and server
│   ├── server          # Server code
│   ├── test            # Unit test data, helpers and setup files
│   └── ui              # UI code
└── infastructure     # AWS CDK infastructure as code files
```

## Getting Started with Make
To initialise the project, run:
```shell
make init
```

To build and deploy the application, run:
```shell
make compose_dev
```
or
```shell
make compose_prod
```
for local development and local production builds, respectively.
The ui will then be available at [http://localhost:7000/]()

### Get Help

To list all targets and target descriptions, run:
```shell
make help
```

## TODOs

- [x] Auth0
- [x] React
- [x] React Router
- [x] MUI
- [x] MUI - Light/Dark Theme Modes
- [ ] MUI - Digi/Opengear Theme Types
- [ ] MUI - Digi/Opengear Custom Components and Storyboard
- [x] CSP
- [x] Webpack
- [ ] Webpack - Application Code Splitting and Lazy Loading
- [x] Webpack - Vendor Code Splitting
- [x] AWS CLI - Publish Images to ECR
- [x] AWS CDK - Deploy Using Api Gateway and Image Lambdas
- [ ] AWS CDK - Custom Domain
- [ ] AWS CDK - WAF (Web Application Firewall)

## References

* [Auth0][]
* [AWS CDK][]
* [Npm][]
* [Typescript][]
* [React][]
* [MUI][]
* [Webpack][]

[Auth0]: https://auth0.com/docs
[AWS CDK]: https://docs.aws.amazon.com/cdk/api/latest/
[NPM]: https://docs.npmjs.com/
[Typescript]: https://www.typescriptlang.org/docs/
[React]: https://reactjs.org/docs/getting-started.html/
[MUI]: https://mui.com/
[Webpack]: https://webpack.js.org/concepts/
