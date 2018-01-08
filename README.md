# EthiCAL Member Website

# Installation

Download [Node.JS](https://nodejs.org/en/)

Installing client dependencies
```
cd client
npm install
```

Installing server dependencies
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

Go into the server folder and run launch command on port 5000
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

# Deployment
Pushing to the deploy branch would redeploy the application on heroku
