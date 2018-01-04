# EthiCAL Member Website

# Installation

Download (Node.JS)[https://nodejs.org/en/]

Installing client dependencies
```
cd /path/to/client
npm install
```

Installing server dependencies
```
cd /path/to/server
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

Go into the server folder and run launch command on port 3001
```
cd /path/to/server
PORT=3001 node bin/www
```

**Open a new terminal window** and go into the client folder and run npm start
```
cd /path/to/server
npm start
```

Go to [http://localhost:3000]
