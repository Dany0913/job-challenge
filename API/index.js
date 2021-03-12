const express = require('express');
const cors = require('cors');
const app = express();
const PORT= 3001;
const jobs = require('./jobs.json');

app.use(cors());

app.get('/jobs',(req,res)=>{
    res.json(jobs);
})
app.get('/jobs/filter/:param',(req,res)=>{
    const param = req.params.param;
    console.log("Param ruta: "+param);
    let filterJob = jobs.filter((item) => {
        if (param===item.type){
            console.log(param)
            return param;
        }else{
            console.log("No match")
        }
    }); 
    console.log(filterJob);   
    res.json(filterJob);
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
});

const fnSearchFullTime = (param) => {
    console.log("Param fn: "+param);
    if (param.type===jobs.type) {
        return param;
    }
}