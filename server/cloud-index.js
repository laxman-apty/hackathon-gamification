
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var i = 0;

exports.postData = functions.https.onRequest((request, response) => {
  const transaction_table_path = 'jira_actions';
  var post_body = request.body;

  const ref = admin.database().ref(transaction_table_path + '/' + post_body.user.accountId);
  return ref.once("value")
    .then((snapshot) => {
      var db_body = getDbBody(snapshot, post_body);
      i++;
      ref.set(db_body);
      return response.send('ok');
    });
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