require("dotenv").config()

let {MongoClient} = require('mongodb')

require('dotenv').config()

let connectDb = async (req,res)=>{

    let url =  process.env.url
    let  client = await MongoClient.connect(url)
    let db = client.db('Employees') 
    return db

    

} 
module.exports = {connectDb}