
// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});


const nedb = require('nedb');
const telegraf = require("telegraf")
const db = new nedb({
//  filename: '/dict.db',
  autoload: true
});

var fs = require('fs');
var arr = fs.readFileSync('dict.txt').toString().split("\n");

function chinese(t){
  //return /[\p{Lo}{Han}]+/.test(t)
  return t.replace(/[\u4e00-\u9fa5]/g,'').length == 0
}

arr.forEach((t, i) => {
//var s = t.split(" ")
var spaceindex = t.indexOf(" ")
var plain = t.substring(0, spaceindex)
var second = t.substring(spaceindex, )
second = second.trim()
//console.log(plain, second)

if (chinese(second)){
  var push = {
    zh: second
  }
}else{
  var push = {
    h: second
  }
}
db.update({
  p: plain,
}, {$push: push}, {
  upsert: true
}, (err, ret) => {
})
  
db.find({}, function (err, docs) {
  //console.log(docs.slice(0, 3))
})

})