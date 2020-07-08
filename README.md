
# Capstone Group404 / Backend
[https://heroku-backend-wallup.herokuapp.com/](https://heroku-backend-wallup.herokuapp.com/)
  

This repository holds the backend of our capstone.

In order to run the application, clone the project, open the terminal on the root folder and run the following:
> npm install
> npx nodemon

# Deploying the app
Install heroku CLI on you pc then run the following command on your terminal:

> heroku git:remote -a heroku-backend-wallup

Once you have something that needs to be pushed to the production, run:
> git push heroku master

You can also check the server logs in real-time:
> heroku logs --tail