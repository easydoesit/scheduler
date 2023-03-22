# Interview Scheduler

Interview schedular allows a user to set up interviews with a predefined group of interviewers from Monday to Friday between 12pm -5pm.

Users can create, edit and delete appointments.

## Final Product

### An Empty Appointment

!["Screenshot Of Empty Appointment"](https://github.com/easydoesit/scheduler/blob/master/docs/Scheduler01.png)

### Editing an Appointment

!["Screenshot of Editing an Appointment"](https://github.com/easydoesit/scheduler/blob/master/docs/Scheduler02.png)

### A Completed Appointment

!["Screenshot of a Complete Appointment"](https://github.com/easydoesit/scheduler/blob/master/docs/Scheduler03.png)

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

# Documentation

- changeSpots(state, appt, appointmentID) | takes in the current state, all the appointments and the id of the selected appointment.
- getAppointmentsForDay(state, day) | returns an array of appointments given a state object and a day "string"
- getInterviewersForDay(state, day) | returns the currently available slots
- getInterview(state, interview) | returns the interview object from the state if given an interview object.
- useApplicationData | controls your state as one object and makes Api requests
- useVisualMode | required for setting appointments, for transitioning through each step of making or editing an appointment. Knows the previous stated of the render
- reducers/application.js | Sets the state depending on the transition from useVisualmode.
