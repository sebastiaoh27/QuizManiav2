var express = require('express');
var router =express.Router();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = "./public/database/sessions.json"

var id = 0;

router.post('/api/createSession',urlencodedParser,function (req,res) {
  fs.readFile(path,'utf8',function (err,data) {
    var sessions = JSON.parse(data);
    while (sessions["session"+id]) {
      id++;
    }
    sessions["session" + id] = {
      "id":id,
      "user": null,
      "room":null
    };
    fs.writeFile(path,JSON.stringify(rooms),'utf8',function (err) {
      if (err) {
        return console.log(err)
      }
    })
    res.end(JSON.stringify(sessions["session"+id]))
  })
})

router.patch('/api/setUser/:id',urlencodedParser,function (req,res) {
  fs.readFile(path,'utf8',function (err,data) {
    var sessions = JSON.parse(data);
    sessions["session" + id].user = req.body.user
    fs.writeFile(path,JSON.stringify(rooms),'utf8',function (err) {
      if (err) {
        return console.log(err)
      }
    })
    res.end(JSON.stringify(sessions["session"+id]))
  })
})

router.patch('/api/setRoom/:id',urlencodedParser,function (req,res) {
  fs.readFile(path,'utf8',function (err,data) {
    var sessions = JSON.parse(data);
    sessions["session" + id].room = req.body.room
    fs.writeFile(path,JSON.stringify(rooms),'utf8',function (err) {
      if (err) {
        return console.log(err)
      }
    })
    res.end(JSON.stringify(sessions["session"+id]))
  })
})

router.get('/api/getRoom/:id',urlencodedParser,function (req,res) {
  fs.readFile(path,'utf8',function (err,data) {
    var sessions = JSON.parse(data);
    res.end(JSON.stringify(sessions["session"+req.params.id].room))
  })
})

router.get('/api/getUser/:id',urlencodedParser,function (req,res) {
  fs.readFile(path,'utf8',function (err,data) {
    var sessions = JSON.parse(data);
    res.end(JSON.stringify(sessions["session"+req.params.id].user))
  })
})

module.exports = router
