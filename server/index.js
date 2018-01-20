const express = require('express');
const firebase = require('firebase');
var config = {
  apiKey: "AIzaSyDc12i6Iee64PT9Jb-58DQ3Jq14vCIkWFE",
  authDomain: "zeva-sk.firebaseapp.com",
  databaseURL: "https://zeva-sk.firebaseio.com",
  projectId: "zeva-sk",
  storageBucket: "zeva-sk.appspot.com",
  messagingSenderId: "1074433625352"
};
firebase.initializeApp(config);
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
var i = 0;
app.post('/', function (req, res) {
  var post_body = req.body;
  const ref = firebase.database().ref('/' + post_body.user.accountId);
  ref.once("value")
    .then(function (snapshot) {
      var count = snapshot.child("count").val(); // {first:"Ada",last:"Lovelace"}
      if (!count) {
        count = 1;
      } else {
        count++;
      }
      ref.set({ count: count, email: post_body.user.emailAddress });
    });
  console.log(i, post_body.user.emailAddress, post_body.issue.fields.summary);
  i++;
  res.send('ok');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
