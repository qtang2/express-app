let express = require('express')
let bodyParser = require('body-parser')

require('dotenv').config()
console.log(process.env.VARIABLE_ONE)
let app = express() //create an express app


let person = {
    "name":"Bob",
    "age":20
}

let people = {
    'alice':{name:'Alice',age:20},
    'bob':{name:'Bob',age:25},
    'charlie':{name:'Charlie',age:35}
}

app.post('/search',bodyParser.urlencoded({extended:false}) , (req,res,next)=>{
    // console.log(req)
    let name = req.body.name
    if(people[name]) {
        res.json(people[name])
    }
    else{
        res.json('Not Found')
    }
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.get('/profile',(req,res)=>{
    // console.log(req.query)
    let name = req.query.name
    if(people[name]) {
        res.json(people[name])
    }
    else{
        res.json('Not Found')
    }
})

app.get('/profile/:name',(req,res)=>{
    // console.log(req.params)
    let name = req.params.name
    if(people[name]) {
        res.json(people[name])
    }
    else{
        res.json('Not Found')
    }
})

app.get('/person',(req,res) =>{
    res.json(person)
})

app.listen(3000)



console.log(__dirname)// __dirname will return the absolute path

app.use('/pics', express.static(__dirname+'/images'))


app.get('/hello',(req, res,next)=>{
    console.log(req.method)
    console.log(req.ip)
  
    next()//looks the next thing to intercept on this root
},(req, res)=>{
    res.sendFile(__dirname + '/index.html')
})
// app.get('/hello',(req, res)=>{
//     res.sendFile(__dirname + '/index.html')
// })
