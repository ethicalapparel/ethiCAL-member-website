var express = require('express');
var router = express.Router();

var asana = require('asana');
var axios = require('axios');
const ASANA_AUTH_HEADER = "Bearer " + process.env.ASANA_PAT;

var client = axios.create({
  baseURL: 'https://app.asana.com/api/1.0',
  headers: {'Authorization': ASANA_AUTH_HEADER, 'Content-Type': 'application/json'},
});

/* Gets list of events from club calendar*/
router.get('/calendar', function(req, res, next) {
  client.get('/projects/509572030520060/tasks?opt_expand=due_on')
    .then(function(cliResponse) {
      res.json(cliResponse.data.data);
    });
});

/* A list of ideas. */
/* /projects/432354090717462 */
router.get('/ideas', function(req, res, next) {
  client.get('/projects/432354090717462/tasks?opt_expand=notes,created_at,tags,custom_fields')
    .then(function(cliResponse) {
      res.json(
        cliResponse.data.data.filter(elem => hasTag(elem.tags, "member website"))
          .map(elem => {
            console.log(elem[0]);
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
              team: getCustomField(elem.custom_fields, "Team")};
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

hasTag = (tags, tagName) => {
  var tagNames = tags.map(tag => tag.name);
  return tagNames && tagNames.length ? tagNames.includes(tagName) : false;
};

getCustomFieldEnum = (customFields, fieldName) => {
  var cf = customFields.filter(field => field.name==fieldName)
  return cf && cf.length && cf[0].enum_value ? cf[0].enum_value.name : undefined;
};

getCustomFieldNum = (customFields, fieldName) => {
  var cf = customFields.filter(field => field.name==fieldName)
  return cf && cf.length && cf[0].number_value ? cf[0].number_value : undefined;
};



module.exports = router;
