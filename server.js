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


//var MultiHashMap = require('multi-hashmap').MultiHashMap;

//var dict = new MultiHashMap('p', 'h', 'zh');


const nedb = require("nedb");
const telegraf = require("telegraf");
const db = new nedb({
  //  filename: '/dict.db',
  autoload: true
});

var fs = require("fs");
var arr = fs
  .readFileSync("dict.txt")
  .toString()
  .split("\n");

function chinese(t) {
  //return /[\p{Lo}{Han}]+/.test(t)
  return t.replace(/[\u4e00-\u9fa5]/g, "").length == 0;
}
console.log(arr.length)
arr.forEach((t, i) => {
  //var s = t.split(" ")
  var spaceindex = t.indexOf(" ");
  var plain = t.substring(0, spaceindex);
  var second = t.substring(spaceindex);
  second = second.trim();

  if (chinese(second)) {
    var push = {
      zh: second
    };
  } else {
    var push = {
      h: second
    };
  }
  db.update(
    {
      p: plain
    },
    { $push: push },
    {
      upsert: true
    },
    //(err, ret,doc)
  );
});
db.find({}, (err, docs)=>{
  console.log(docs)
})

arr = undefined;
function lookup(w, callback) {
   //callback(dict.findAll("p", w))
}
console.log(arr)
console.time('test1')
console.time('test2')
db.find({}, async (err, docs) => {
    console.log(docs);
  docs.forEach((item) => {
  //dict.insert(item.p, item.h[0], item.zh[0])
})
  
  console.timeEnd('test1')
  lookup("e", results => {
  console.log("search" + "e" + results);
});
  });




const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.NANBOT);

bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log("%sms", ms, ctx.message.text);
  ctx.reply("f");
  var txt = ctx.message.text;
  var r = "";
  if (chinese(txt) || true) {
    var query = new RegExp("txt");
    db.find({ zh: query }, function(err, docs) {
      r += docs;
      console.log(docs);
      ctx.reply(r);
    });
  }
});

bot.launch();

