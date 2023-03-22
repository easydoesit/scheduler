# Interview Scheduler

Interview schedular allows a user to set up interviews with a predefined group of interviewers from Monday to Friday between 12pm -5pm.

Users can create, edit and delete appointments.

## Final Product

!["Screenshot Of Empty Appointment"](https://github.com/easydoesit/scheduler/blob/master/docs/Scheduler01.png)
!["Screenshot of Editing an Appointment"](https://github.com/easydoesit/scheduler/blob/master/docs/Scheduler02.png)
!["Screenshot of a Complete Appointment"](https://github.com/easydoesit/scheduler/blob/master/docs/Scheduler02.png)

## Dependencies

- Node.js
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Testbed

```sh
npm run cypress
```

## Server

You will need a server. You can find one that will work for this project here:

[Scheduler API](https://https://github.com/easydoesit/scheduler-api)

Depending on where your server is set up you will have to change the proxy in your package.json and your **env.development & env.test files**.
