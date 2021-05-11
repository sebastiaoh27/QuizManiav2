var express = require('express');
var router =express.Router();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var path = "./public/database/questions.json"

var id = 0;


//Create

router.post('/api/createQuestion',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var questions = JSON.parse(data)
        while (questions["question"+id]) {
            id++;
        }
        questions["question"+id] = {
            "id": id,
            "name": req.body.name,
            "quizId": parseInt(req.body.quizId),
            "a1": req.body.a1,
            "a2": req.body.a2,
            "a3": req.body.a3,
            "a4": req.body.a4,
            "correct": req.body.correct
        }
        fs.writeFile(path,JSON.stringify(questions),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(questions["question"+id]))
    })
})
//Read

router.get('/api/questions',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var questions = JSON.parse(data)
        res.end(JSON.stringify(questions))
    })
})

router.get('/api/question/:id',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var questions = JSON.parse(data)
        var question = questions["question"+req.params.id]
        res.end(JSON.stringify(question))
    })
})

router.get('/api/questions/:quizId',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var questions = JSON.parse(data)
        var inQuiz = {}
        for (var question in questions) {
            if (questions[question].quizId == req.params.quizId){
                inQuiz[question] = questions[question]
            }
        }
        console.log(inQuiz)
        res.end(JSON.stringify(inQuiz))
    })
})
//Update
router.patch('/api/editQuestion/:id',urlencodedParser,function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var questions = JSON.parse(data)
        questions["question"+req.params.id].name = req.body.name
        fs.writeFile(path,JSON.stringify(questions),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(questions["question"+req.params.id]))
    })
})
//Delete
router.delete('/api/deleteQuestion/:id',function (req,res){
    fs.readFile(path,'utf8',function (err,data){
        var questions = JSON.parse(data)
        delete questions["question"+req.params.id]
        fs.writeFile(path,JSON.stringify(questions),'utf8',function (err){
            if(err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(questions))
    })
})

module.exports = router
