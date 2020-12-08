# BestMate

Welcome to the BestMate WebApplication. Here the user can signup, login, fill personal details, fill family details and the notes associated with a certain family member.There is also speech interaction where the user can  ask some specific questions and get answers.
This application addresses two issues one is remembering or to say memories associated with the specific person by putting that in notes and also loneliness where people can talk to this application that would make them feel less lonely.In this application the user can decide the no of inputs and the inputs are dynamic.

## Ruby Version

`Ruby version 2.6.1` is used for this application.

##System Dependencies

* For the backend `gem'bcrypt'`, `gem'rack-cors'`, `gem'jwt'`,`gem'active-model-serializers'` are used.

* For frontend `redux`,`react-redux`, `react-router`, `react-router-dom`,`react-modal` , `react-speech-kit` (for voice interaction) and `react-semantic-ui` and `semantic-css`(for styling).

## SetUp

* Create a new repository in github by logging into the account and clicking the create repository button.Create two directories one for frontend and another for backend.then type git init, git remote add origin origin link and then git push -u origin master.

* In the backend set up the database as postgres and then setup rails as an API.Run bundle install to install rails and its dependencies.Then create models and migrations and the associations.

* The backend is created with ruby on rails and rails as an API.

* the frontend uses Redux, React, React-Router and a React-speech-kit API.

* For styling the app React-semantic-ui , semantic-css and CSS.

## Creating Database

Run rails db:create for the first time and then rails db:migrate and create some seeds with rails db:seeds and test the asssociations.Postgres database is used for this app.

## Validations

validations are created inside the user.rb file.

## Authentication

jwt authentication is created inside the the auth controller , user controller and the application controller.

## Running the Application

to run the application run rails s from backend and PORT=4000 npm start in the frontend.

Created By

Arpita Dutta





