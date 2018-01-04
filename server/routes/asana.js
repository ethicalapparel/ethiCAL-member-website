var express = require('express');
var router = express.Router();

var asana = require('asana');
var axios = require('axios');
const ASANA_AUTH_HEADER = "Bearer " + process.env.ASANA_PAT;

var scopes = [
  "https://www.googleapis.com/auth/admin.directory.group.readonly"
];

var client = axios.create({
  baseURL: 'https://app.asana.com/api/1.0',
  headers: {'Authorization': ASANA_AUTH_HEADER},
});

/* Gets list of events from club calendar*/
router.get('/calendar', function(req, res, next) {
  client.get('/projects/509572030520060/tasks?opt_expand=due_on')
    .then(function(cliResponse) {
      res.json(cliResponse.data.data);
    });
});

/* Gets list of Team updates. */
router.get('/updates', function(req, res, next) {
  client.get('/sections/509572030520047/tasks')
    .then(function(cliResponse) {
      res.jason(cliResponse.data.data);
    });
});


module.exports = router;
