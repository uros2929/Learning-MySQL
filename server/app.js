const express=require('express');
const PORT=3000;
const app=express();
const api=require('./routes/api');
const bodyParser=require('body-parser')
const cors=require('cors')

app.use(bodyParser.json());
app.use(cors());
app.use('/api',api)

app.get('',(req,res)=>{
    res.send('Hello from server')
})

app.listen(PORT,(err)=>{
    if (err) {
        throw err;
    }
    console.log('Server running on port:'+PORT);
})
