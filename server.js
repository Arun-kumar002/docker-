const express=require('express')
const app=express()
const redis=require('redis')
const {connect,Schema,model}=require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
connect('mongodb://localhost:27017')
let redisSchema=new Schema({
    username:{
        type:String
    },
    email:{
        type:String
    }
})
let sd=model('redis',redisSchema)
const redis_port=6379

const client=redis.createClient(redis_port)
client.connect()
client.on('error', (err) => console.log('Redis Client Error', err));
let middleredis=async(req,res,next)=>{
    let {name}=req.params
    let user=await client.get(name)
    if(user==null){
        next()
    }
    else{
        res.status(200).json({message:'ok from redis',user:JSON.parse(user)})
    }
}
app.post('/username/:name',middleredis,async(req,res)=>{
    let {name}=req.params
    console.log(name);
    let user=await sd.find({username:name})
    let email=JSON.stringify(user)
    await client.set(name,email)
    res.status(200).json({message:'ok   from db',user})
})
app.post('/register',async(req,res)=>{
   let user=await sd.create(req.body)
   res.status(200).json({message:'ok ',user})
})




app.listen(5000,_=>{
    console.log('server running port 5000');
})