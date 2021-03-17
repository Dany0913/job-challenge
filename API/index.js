const express = require('express');
const cors = require('cors');
const app = express();
const PORT= 3001;
const jobs = require('./jobs.json');

app.use(cors());

app.get('/jobs',(req,res)=>{
    res.json(jobs);
})

app.get('/jobs/locations',(req,res)=>{
    let arrayLocation=[];
    let arrayLocationUnique=[];
    jobs.forEach(item => {
        arrayLocation.concat(item.location)
    });
})

app.get('/jobs/filter/:param',(req,res)=>{
    const param = req.params.param;
    let filterJob = jobs.filter((item) => {
        if (item.stack.includes(param)) {
            return item.stack.includes(param);
        } else if(item.description.toLowerCase().includes(param)){
            return item.description;
        }else {
            console.log("No match filter")
        }
        
    });  
    res.json(filterJob);
})

app.get('/jobs/type/:param',(req,res)=>{
    const param = req.params.param;
    console.log("Param ruta: "+param);
    let filterJob = jobs.filter((item) => {
        if(param.toUpperCase()===item.type.toUpperCase()){
            console.log(param);
            return param;
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