const express = require('express');
const firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCO_-l8Km0z6oBb5C6BYjOmKRfLmK669QI",
  authDomain: "gamification-20118.firebaseapp.com",
  databaseURL: "https://gamification-20118.firebaseio.com",
  projectId: "gamification-20118",
  storageBucket: "gamification-20118.appspot.com",
  messagingSenderId: "610811387999"
};
firebase.initializeApp(config);

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const transaction_table_name = 'jira_actions';
// const history_table_name = '';

var i = 0;
app.post('/', function (req, res) {
  var post_body = req.body;
  console.log(post_body);
  const ref = firebase.database().ref(transaction_table_name + '/' + post_body.user.accountId);
  ref.once("value")
    .then(function (snapshot) {
      var db_body = getDbBody(snapshot, post_body);
      ref.set(db_body);
    });
  i++;
  res.send('ok');
});

function getDbBody(snapshot, post_body) {
  var actions_count = snapshot.child("actions_count").val();
  if (!actions_count) {
    actions_count = {};
  }

  var event_name = post_body.issue_event_type_name;
  actions_count[event_name] = actions_count[event_name] ? actions_count[event_name] + 1 : 1;
  actions_count["total_count"] = actions_count["total_count"] ? actions_count["total_count"] + 1 : 1;

  return {
    email: post_body.user.emailAddress,
    actions_count: actions_count,
    name: post_body.user.displayName,
    source: 'jira'
  };
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));
