const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
// const pdf = require("html-pdf");
const options = { format: "Letter", charset: "utf-8" }; //, orientation:"Portrait"};
const htmlPdf = require("html-pdf-chrome");

const questions = [
  {
    type: "input",
    message: "Please enter your GitHub username",
    name: "username"
  },
  {
    type: "list",
    message: "What's your favorite color?",
    name: "favColor",
    choices: ["green", "blue", "red", "yellow", "pink"]
  }
];

function generate() {
  inquirer.prompt(questions).then(answers => {
    console.log(answers);
    let containerClass = "content-container";
    let infoContainer = "info-container";
    let picContainer = "profilepic";

    switch (answers.favColor) {
      case "blue":
        containerClass = "content-container-blue";
        infoContainer = "info-container-blue";
        picContainer = "profilepic-blue";
        break;
      case "red":
        containerClass = "content-container-red";
        infoContainer = "info-container-red";
        picContainer = "profilepic-red";
        break;
      case "yellow":
        containerClass = "content-container-yellow";
        infoContainer = "info-container-yellow";
        picContainer = "profilepic-yellow";
        break;
      case "green":
        containerClass = "content-container-green";
        infoContainer = "info-container-green";
        picContainer = "profilepic-green";
        break;
      case "pink":
        containerClass = "content-container-pink";
        infoContainer = "info-container-pink";
        picContainer = "profilepic-pink";
        break;
    }
    const queryURL = `https://api.github.com/users/${answers.username}`;
    axios.get(queryURL).then(function(response) {
      console.log(response.data);

      const newHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile Generator</title>

        <link href="https://fonts.googleapis.com/css?family=Rajdhani&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
         integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="style.css">

       <style>
     

       #profilepic{
        border-radius:100px;
        height:200px;
        width:200px;
        text-align:center;
        padding:3px;
        border: 4px solid greenyellow;
        margin:10px;
        
    }
   
    .display-4{
        font-size:42px;
    }
    .jumbotron{
        text-align:center;
        font-size:18px;
        border-bottom: 1px solid darkgray;
        position:relative;
    }
    .container{
        font-family: 'Rajdhani', sans-serif;
    }
    
    .main-container{
        position:relative;
        background-color:gray;
        color:#fff;
        box-shadow: 0 0 15px 10px darkgray;
        font-size:32px;
        width:50vw;
        text-align:center;
    }
    .repos-container{
        background-color:gray;
        color: #fff;
        height: 150px;
        width:300px;
        text-align:center;
        border-radius:20px;
        font-size: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        top:15%;
        margin-bottom:50px;
        border: 0.5px solid black;
        margin-top:60px;
        box-shadow: 0 0 10px 5px #fff; 
        
        
        
    }
    
    .followers-container{
        background-color:gray;
        color: #fff;
        height: 150px;
        width:300px;
        text-align:center;
        border-radius:20px;
        font-size: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.5px solid black;
        box-shadow: 0 0 10px 5px #fff; 
    }
    .following-container{
        background-color:gray;
        color: #fff;
        height: 150px;
        width:300px;
        text-align:center;
        border-radius:20px;
        font-size: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom:50px;
        border: 0.5px solid black;
        margin-top:60px;
        box-shadow: 0 0 10px 5px #fff; 
    }
    
    .stars-container{
        background-color:gray;
        color: #fff;
        height: 150px;
        width:300px;
        text-align:center;
        border-radius:20px;
        font-size: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.5px solid black; 
        box-shadow: 0 0 10px 5px #fff; 
    }
    
    .content-container{
        background-color: greenyellow;
        width:80%;
        height:500px;
        box-shadow: 0 0 10px 5px darkgray; 
    }
    
    .fab{
        color:#fff;
    }
    
    .fas{
        color:#fff;
    }
    
    a{
        color:#fff;
        text-emphasis: none;
    }
    
    a:hover{
        color:#fff;
        
    }
    
    .first-col{
        left:5%;
       
    }
    
    
    .content-container-blue{
        background-color: #4172FF;
        width:50%;
        height:600px;
        box-shadow: 0 0 10px 5px darkgray; 
    }
    
    .content-container-red{
        background-color: #DF360F;
        width:50%;
        height:600px;
        box-shadow: 0 0 10px 5px darkgray; 
    }
    .content-container-yellow{
        background-color: #FFDA1D;
        width:50%;
        height:600px;
        box-shadow: 0 0 10px 5px darkgray; 
    }
    .content-container-green{
        background-color: #13B300;
        width:50%;
        height:600px;
        box-shadow: 0 0 10px 5px darkgray; 
    }
    .content-container-pink{
        background-color: #FF87F6;
        width:50%;
        height:600px;
        box-shadow: 0 0 10px 5px darkgray; 
    }
    
    .info-container-blue{
        background-color: #FFCA40;
    
    }
    
    .info-container-red{
        background-color: #2BFFB3;
    
    }
    
    .info-container-yellow{
        background-color: #7130FF;
    
    }
    .info-container-green{
        background-color: #FF21DA;
    
    }
    .info-container-pink{
        background-color: #60FF1C;
    
    }
    
    #profilepic-red{
        border-radius:100px;
        height:200px;
        width:200px;
        text-align:center;
        padding:3px;
        border: 4px solid #2BFFB3;
        margin:10px;
        
    }
    
    #profilepic-blue{
        border-radius:100px;
        height:200px;
        width:200px;
        text-align:center;
        padding:3px;
        border: 4px solid #FFCA40;
        margin:10px;
        
    }
    
    #profilepic-green{
        border-radius:100px;
        height:200px;
        width:200px;
        text-align:center;
        padding:3px;
        border: 4px solid #FF21DA;
        margin:10px;
        
    }
    
    #profilepic-yellow{
        border-radius:100px;
        height:200px;
        width:200px;
        text-align:center;
        padding:3px;
        border: 4px solid #7130FF;
        margin:10px;
        
    }
    
    #profilepic-pink{
        border-radius:100px;
        height:200px;
        width:200px;
        text-align:center;
        padding:3px;
        border: 4px solid #60FF1C;
        margin:10px;
        
    }
    h1{
      font-size:32px;
    }
    </style>
    </head>

    <body>
    
    <div class="container main-container ${containerClass}"> 
    
     <a href="${response.data.blog}"><img id="${picContainer}" src = ${response.data.avatar_url}/></a>
     <h1>Hi!</h1>
       <h2 class="display-4">My name is ${response.data.name}</h2>
     <p class = "bio">${response.data.bio}</p>
      <p class = "info">
      <a href="http://maps.google.com/maps?q=${response.data.location}">
        <i class="fas fa-map-pin"></i> ${response.data.location}</a>   
      <a href ="${response.data.html_url}"><i class="fab fa-github"></i> GitHub    </a>        
      <a href ="${response.data.blog}"> <i class="fas fa-rss"></i> Portfolio </a>       
      
      </p>
      
  </div> 
  </div>  
 <br>
 <div class= "container ${containerClass}">
 <div class = "row">
 <div class ="col-md-6 first-col">
      <div class="repos-container ${infoContainer}">
      
      <p class = "public-repos"> GitHub Repos: ${response.data.public_repos}</p>
      </div>
      <br>
     <div class="followers-container ${infoContainer}">
      <p class= "followers"> Followers: ${response.data.followers}</p>
      </div>
      </div>
      <div class = "col-md-6 second-col ">
      <div class="following-container ${infoContainer}">
      <p class= "following"> Following: ${response.data.following}</p>
      </div>
      <br>
      <div class= "stars-container ${infoContainer}">
      <p class = "stars"> GitHub Stars: ${response.data.public_gists}</p>
      </div>
      </div>
 </div>     
</div>

   
    <ul class="list-group">
    
    </ul>
    
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <!--Local JS file-->
    <script type="text/JavaScript" src="index.js"></script>
    <!--Font Awesome-->
    <script src="https://kit.fontawesome.com/8cf68bdaad.js" crossorigin="anonymous"></script>
    
    </body>
    </html>`;

      fs.writeFile("index.html", newHTML, function(err) {
        if (err) {
          throw err;
        } else {
          console.log("success!");

          //   makePdf(newHTML);
          // }
          // function makePdf(htmlPdf) {
          // pdf
          //   .create(newHTML, options)
          //   .toFile("./resume.pdf", function(err, res) {
          //     if (err) return console.log(err);
          //     console.log("Pdf Successfully generated", res);
          //   });
          htmlPdf
            .create(newHTML, options)
            .then(pdf => pdf.toFile("resume.pdf"));
          htmlPdf.create(newHTML, options).then(pdf => pdf.toBase64());
          htmlPdf.create(newHTML, options).then(pdf => pdf.toBuffer());
          console.log("Successfully created PDF");
        }
      });
    });
  });
}

generate();
