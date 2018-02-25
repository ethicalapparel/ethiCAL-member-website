var express = require('express');
var router = express.Router();

var asana = require('asana');
var axios = require('axios');
const passport = require('passport');
const ASANA_AUTH_HEADER = "Bearer " + process.env.ASANA_PAT;

var client = axios.create({
  baseURL: 'https://app.asana.com/api/1.0',
  headers: {'Authorization': ASANA_AUTH_HEADER, 'Content-Type': 'application/json'},
});

/* Gets list of events from club calendar*/
router.get('/calendar', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log("Asana authenticated!");
    client.get('/projects/509572030520060/tasks?opt_expand=due_on')
      .then(function(cliResponse) {
        res.json(cliResponse.data.data);
      });
  } else {
    res.status(500).send("500 Error: Not Authorized");
  }
});

/* Gets list of events from club calendar*/
router.get('/homeContent', function(req, res, next) {
  client.get('/projects/532153064264504/tasks?opt_expand=tags')
    .then(function(cliResponse) {
      res.json(
        cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
          .map(elem => {
            console.log(elem);
            return {
              reminder: elem.name
            };
          })
      );
    });
});


/* A list of ideas. */
/* /projects/432354090717462 */
router.get('/ideas', function(req, res, next) {

  client.get('/projects/432354090717462/tasks?opt_expand=notes,created_at,tags,custom_fields')
    .then(function(cliResponse) {
      console.log(cliResponse.data.data[0].custom_fields);
      res.json(
        cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
          .map(elem => {
            return {idea: elem.name,
              description: elem.notes,
              memberName: getCustomFieldEnum(elem.custom_fields, "Member"),
              loves: getCustomFieldNum(elem.custom_fields, "Loves"),
              created_at: elem.created_at,
              id: elem.id
              };
            }
          )
      );
    });
});

/* A list of ideas. */
/* /projects/432354090717462 */
router.get('/ideaComments', function(req, res, next) {
  console.log(req.query);
  var url = '/tasks/' + req.query.id + '/stories/'
  client.get(url)
    .then(function(cliResponse) {
      console.log(cliResponse);
      res.json(
        cliResponse.data.data
        .filter((elem) => elem.type == 'comment')
        .map((elem) => {
          return {
            "created_at": elem.created_at,
            "text": elem.text
            };
          }
        )
      );
    });
});


/* Gets list of Team updates. */
router.get('/updates', function(req, res, next) {
  client.get('/projects/466398499960068/tasks?opt_expand=custom_fields,notes,tags')
    .then(function(cliResponse) {
      res.json(
        cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
          .map(elem => {
            //console.log(elem);
            return {name: elem.name,
              description: elem.notes,
              team: getCustomFieldEnum(elem.custom_fields, "Team")};
          })
      );
    });
});

/* Get general info about the club. */
router.get('/general', function(req, res, next) {
  client.get('/projects/345691809314815/tasks?opt_expand=notes,tags')
    .then((cliResponse) => {
      res.json(
        cliResponse.data.data.filter((elem) => {
          return hasTag(elem.tags, "member website");
          }
        ).map(elem => {return {name: elem.name, description: elem.notes};})
      );
    });
});


router.get('/sales', function(req, res, next) {
  client.get('/projects/431041956515517/tasks?opt_expand=notes,tags')
    .then(function(cliResponse) {
      res.json(
        cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
          .map(elem => {
            //console.log(elem);
            return {name: elem.name,
              description: elem.notes
            };
          })
      );
    });
});

router.get('/retreat', function(req, res, next) {
  client.get('/projects/499212214637534/tasks?opt_expand=notes,tags,custom_fields')
    .then(function(cliResponse) {
      res.json(
        cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
          .map(elem => {
            //console.log(elem);
            return {name: elem.name,
              description: elem.notes,
              section: getCustomFieldEnum(elem.custom_fields, "Section")
            };
          })
      );
    });
});


/* Creates a Task of Feedback */
router.post('/submitFeedback', function(req, res, next) {
  client.post('/tasks',
    {"data": {"projects": "515811081031389",
    "name": req.body.name,
    "notes": req.body.notes}})
    .then(() => {
      console.log("Success!");
      res.status(200);
    })
    .catch((err) => {
      console.log("Failed..");
      var err = new Error("Feedback post didnt work");
      err.status = 500;
      next(err);
    }
  );
});
// "tags":
//   [{"id": "515807936810709"}]
/* Submits an Idea.. Doesn't work yet :( */
router.post('/submitIdea', function(req, res, next) {
  // Received req.body that has the data that is posted
  client.post('/tasks',
    {"data":
      {"projects": "432354090717462",
        "name": req.body.name,
        "notes": req.body.notes,
        "tags": ["515807936810709"],
        "custom_fields": {"523249269220982": req.body.enum_id, "530140680369986": 1}
      }
    })
    .then(() => {
      console.log("Success!");
      res.status(200);
    })
    .catch((err) => {
      console.log("Failed..");
      console.log(err.Error);
      var err = new Error("Feedback post didnt work");
      err.status = 500;
      next(err);
      }
    );
});

router.post('/postComment', function(req, res, next) {
  console.log(req.query);
  var url = '/tasks/' + req.query.id + '/stories/'
  console.log(req.body);
  client.post(url, {"data": {"text": req.body.text}})
    .then(() => {
      console.log("Success!");
      res.status(200);
    })
    .catch((err) => {
      console.log("Failed..");
      console.log(err.Error);
      var err = new Error("Feedback post didnt work");
      err.status = 500;
      next(err);
      }
    );
});

const hasTag = (tags, tagName) => {
  var tagNames = tags.map(tag => tag.name);
  return tagNames && tagNames.length ? tagNames.includes(tagName) : false;
};


const getCustomFieldEnum = (customFields, fieldName) => {
  var cf = customFields.filter(field => field.name==fieldName)
  return cf && cf.length && cf[0].enum_value ? cf[0].enum_value.name : "";
};

const getCustomFieldEnumId = (customFields, fieldName) => {
  var cf = customFields.filter(field => field.name==fieldName)
  return cf && cf.length && cf[0].enum_value ? cf[0].enum_value.id : "";
};

const getCustomFieldText = (customFields, fieldName) => {
  var cf = customFields.filter(field => field.name==fieldName)
  return cf && cf.length && cf[0].text_value ? cf[0].text_value : "";
};


const getCustomFieldNum = (customFields, fieldName) => {
  var cf = customFields.filter(field => field.name==fieldName)
  return cf && cf.length && cf[0].number_value ? cf[0].number_value : undefined;
};

const authRoster = (cb) => {
  client.get('/projects/493613295744508/tasks?opt_expand=tags,custom_fields')
    .then(function(cliResponse) {
      var users = {};
      cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
        .map(elem => {
          //.console.log(elem.custom_fields);
          var id = getCustomFieldText(elem.custom_fields, "id");
          users[id] =  {
            name: getCustomFieldEnum(elem.custom_fields, "Member"),
            id: getCustomFieldText(elem.custom_fields, "id"),
            post_id: getCustomFieldEnumId(elem.custom_fields, "Member")
            };
        });
      cb(users);
    }
  );
}

const loginRoster = (cb) => {
  client.get('/projects/493613295744508/tasks?opt_expand=tags,custom_fields')
    .then(function(cliResponse) {
      var users = {};
      cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
        .map(elem => {
          //console.log(elem)
          console.log(elem.custom_fields);
          var username = getCustomFieldText(elem.custom_fields, "username");
          users[username] =  {name: getCustomFieldEnum(elem.custom_fields, "Member"),
              id: getCustomFieldText(elem.custom_fields, "id")
            };
        });
      cb(users);
    }
  );
}




module.exports = {asana: router, loginRoster: loginRoster, authRoster: authRoster};
