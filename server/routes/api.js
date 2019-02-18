const express=require('express');
const router=express.Router();

const mySql=require('mysql');
const db=mySql.createConnection({
    host:'localhost',
    user:"root",
    password:"29.,MarinkO.,29",
    database:"users"
})

db.connect((err)=>{
    if (err) {
        throw err;
    }
    console.log('Connect to mySql')
})
router.get('/',(req,res)=>{
    res.send('Hello from API')
})

router.get('/main',(req,res)=>{
    let sql = 'SELECT * FROM new_user';
   db.query(sql,(err,results)=>{
         if (err) {
             throw err
         }
         res.send(results)
     })
})
 router.post('/addUser',(req,res)=>{ 
    // let newUser={firstName:'aaaa',lastName:'aaaa',userYear:'22'}
    let newUser=req.body; 
    let sql = 'INSERT INTO new_user SET ?';
    db.query(sql,newUser,(err,result)=>{
        if (err) {
            throw err
        }
        console.log(result)
        res.send(newUser)
    })
})



module.exports = router;