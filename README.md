[![CircleCI](https://circleci.com/gh/chrisiregbu/cloud-devops-capstone/tree/master.svg?style=svg)](https://circleci.com/gh/chrisiregbu/cloud-devops-capstone/tree/master)

# Running Angular e2e Tests In Docker

Original version: https://medium.com/bb-tutorials-and-thoughts/how-to-run-angular-e2e-tests-in-docker-f021c23c78f

My line manager has encouraged me to pursue a career in Cloud DevOps particularly automating of development activities. My department is re-platforming a fronted ASP.NET application to an Angular Single Page Application (SPA) on the AWS platform. Creating this project will give me the hands-on experience I need to confidently talk about Cloud DevOps practices and be able to contribute to the re-platforming project. 

The idea for this application is to demonstrate how end-to-end testing of Angular application might be automated using Docker containers on the AWS platfoprm. I feel that understanding how to automate end-to-end testing of a Angular application would be very beneficial to my team which would enhance my career objectives as a Cloud DevOps Engineer. Currently, our Sprint tests are done manually.

This project demonstrated the end-to-end testing of Angular application. The application was then dockerized with Docker and Nginx and deployed to AWS involving the following steps:

1. Creation of an Application Load Balancer (in AWS) that would direct traffic from the internet into the container application. An Application Load Balancer was selected because communication is over HTTP.
2. Creation og a Security Group
3. Creation of a Target Group for the Application Load Balancer
4. Task Definition
5. Cluster creation
6. Service creation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
