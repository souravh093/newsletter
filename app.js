const express = require("express");
const bodyParser = require("body-parser");
// const request =require("request");
const https = require("https");

const app = express();

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/singup.html");
});

app.post("/", function(req, res){

    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const emailAddress = req.body.email

    const data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jasonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/b38651b636"
    const options = {
        method: "POST",
        auth: "sourav1:0c8cd0eda5a2cb8d470611bf506c042f-us9"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

// api key
// 0c8cd0eda5a2cb8d470611bf506c042f-us9

// id
// b38651b636