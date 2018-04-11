officialworkoutapp folder contains the front-end web application,
written in React, Apollo and Foundation.

workoutappserver folder contains the server-side application,
written in NodeJS, GraphQL and Sequelize (for a Postgres data store).

Note: Initially I had written the front-end application using React/Redux
with a REST API on the back-end, but I have now moved to React/Apollo
with a GraphQL API (Sequelize and Postgres are still there).

04/11/2018 -- Please note that the server is currently down; updates
are being applied to the application to then push to the server.
However, the code here is up to date - feel free to clone it and
run locally.

Instructions:

Run a postgres instance on your machine, create a database named "fitness".

Change the credentials to match your DB credentials in config.json (located
under the 'config' directory in workoutappserver.

Then simply run the command 'npm start' from your CLI within the 
workoutappserver directory as well as the officialworkoutapp directory.
(use two separate terminals for this, as both need to be running
simultaneously).

The application should then be up-and-running at localhost:8080, accessible
through your browser.
