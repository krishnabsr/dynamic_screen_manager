const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to dynamic screen manager")
})

app.get('/get-meta-data/:module_name/:screen_name',async (req,res)=>{
    if(req.params){
        let response = dynamic_screen_manager(req.params);
        console.log(response)
        let file_location = path.resolve(response.module_name,response.screen_name);
        await fs.readFile(file_location,(err,data)=>{
            if(err) {
                console.error(err)
                return
            }
            res.send(data)
        })
    }
})

function dynamic_screen_manager(request){
    const module_name = request.module_name;
    const screen_name = request.screen_name;
    return {module_name,screen_name};
}

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`App is running on port ${port} `))
