var express = require('express');
var router =express.Router();
var fs = require('fs');
var PasswordMaker = require('../public/utilities/passwordMaker')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var pm = new PasswordMaker();
var path = "./public/database/rooms.json"

var id = 0;


//Create

router.post('/api/createRoom',urlencodedParser,function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        console.log(req.body)
        var rooms = JSON.parse(data);
        while (rooms["room"+id]) {
            id++;
        }
        rooms["room" + id] = {
            "id":id,
            "name": req.body.name,
            "selectedQuiz":-1,
            "password": pm.generatePassword(),
            "questionNumber": 0
        };
        console.log(rooms["room"+id])
        fs.writeFile(path,JSON.stringify(rooms),'utf8',function (err) {
            if (err) {
                return console.log(err)
            }
        })
        res.end(JSON.stringify(rooms["room"+id]))
    })
})

//Read
router.get('/api/joinRoom/:password',function (req,res) {
    fs.readFile(path,'utf8',function (err,data) {
        var rooms = JSON.parse(data);
        var r = null;
        for (var room in rooms) {
            if (rooms[room].password === req.params.password) {
                r = rooms[room];
                break;
            }
        }
        res.end(JSON.stringify(r));
    })
})

router.get('/api/rooms',function (req,res) {
        fs.readFile(path, 'utf8',function (err,data){
            var rooms = JSON.parse(data);
            res.end(JSON.stringify(rooms));
        })
})

router.get('/api/room/:id',function (req,res) {
    fs.readFile(path, 'utf8',function (err,data){
        var rooms = JSON.parse(data);
        var room = rooms["room"+ req.params.id]
        res.end(JSON.stringify(room));
    })
})

//Update

router.patch('/api/selectQuiz/:id',urlencodedParser,function (req,res) {
    fs.readFile(path, 'utf8',function (err,data){
        var rooms = JSON.parse(data);
        rooms["room" + req.params.id].selectedQuiz = parseInt(req.body.selectedQuiz)
        fs.writeFile(path,JSON.stringify(rooms),'utf8',function (err) {
            if (err) {
                return console.log(err)
            }
        })
        res.end(JSON.stringify(rooms["room"+req.params.id]));
    })
})

router.patch('/api/setQuestionNumber/:id',urlencodedParser,function (req,res) {
  fs.readFile(path, 'utf8',function (err,data){
    var rooms = JSON.parse(data);
    rooms["room" + req.params.id].questionNumber = parseInt(req.body.questionNumber)
    fs.writeFile(path,JSON.stringify(rooms),'utf8',function (err) {
      if (err) {
        return console.log(err)
      }
    })
    res.end(JSON.stringify(rooms["room"+req.params.id]));
  })
})

//Delete

router.delete('/api/deleteRoom/:id',function (req,res){
    fs.readFile(path, 'utf8',function (err,data){
        var rooms = JSON.parse(data);
        delete rooms["room" + req.params.id]
        fs.writeFile(path,JSON.stringify(rooms),'utf8',function (err) {
            if (err) {
                return console.log(err)
            }
        })
        res.end(JSON.stringify(rooms));
    })
})

module.exports = router;
