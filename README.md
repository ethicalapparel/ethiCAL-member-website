# EthiCAL Member Website

# Installation

Download [Node.JS](https://nodejs.org/en/)

Installing client dependencies
```
cd client
npm install
```

Installing server dependencies in the base directory
```
cd ..
npm install
```

# Launching

**Get an Asana Personal Access Token (PAT)**
 * Go to [My Profile Settings](https://app.asana.com/-/user_settings)
 * Open the **Apps tab**
 * Click **Manage Developer Apps**
 * Click **+ Create New Personal Access Token**


Add Environment variables
```
export ASANA_PAT={Insert Asana Personal Access Token From Above Here}
```
**Note**: Do **not** include the brackets when inserting your asana Personal Access Token.

In the base directory (Current dir if you've been following along) and run launch command on port 5000
```
npm start
```

**Open a new terminal window** and go into the client folder and run npm start
```
cd client
npm start
```

Go to [localhost:3000](http://localhost:3000)

You can type in any password in the login screen

http://localhost:3000/home/calendar should look like this:
![pic](initial.png)

# Making Changes
Be sure to create a new branch with a (somewhat) descriptive name of what aspect of the website is being changed. After the changes are done, contact Andrew about merging the changes into the master branch. In the near future we'll probably make use of pull requests.

# Structure of Repository
The frontend part of the website is a React application that's stored in the folder `client`. The application uses an npm module called react-router to handle routes of the website.
* the login page and beginning routes of the React application is located in `client/src/App.js`.
* The home page is in `Dashboard`

The backend part of the website resides in the outermost directory of the repository and is an express application that communicates with Asana to fetch and post data and handle authentication of the website.
* The setup of the backend is in the file `app.js`
* The api endpoints are in the folder `api`


# A word on Style/CSS and Semantic Components
The website is a react application so it is all on one page. Therefore, when changing up certain HTML components, the changes will persist throughout the page. Use descriptive class names for elements that should only belong on certain pages of the website.

For tidy code, it is encouraged that for each of the pages (which are store)

We also want to try our best to use Semantic UI react components specified in https://react.semantic-ui.com . The

# Deployment
Pushing to the deploy branch would redeploy the application on heroku
