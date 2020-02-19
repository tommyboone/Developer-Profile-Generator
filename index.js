const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const htmlPdf = require('html-pdf');
// const jquery = require("jquery");

// const util = require("util");

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
    let containerClass = 'content-container';
    let infoContainer = 'info-container'
    let picContainer = 'profilepic'
    
    switch(answers.favColor){
        case 'blue':
            containerClass = 'content-container-blue'
            infoContainer = 'info-container-blue'
            picContainer = 'profilepic-blue'
            break;
        case 'red':
            containerClass= 'content-container-red'
            infoContainer= 'info-container-red'
            picContainer= 'profilepic-red'
            break;
        case 'yellow':
            containerClass = 'content-container-yellow'
            infoContainer= 'info-container-yellow'
            picContainer= 'profilepic-yellow'
            break;
        case 'green':
            containerClass= 'content-container-green'
            infoContainer= 'info-container-green'
            picContainer = 'profilepic-green'
            break;
        case 'pink':
            containerClass= 'content-container-pink'
            infoContainer= 'info-container-pink'
            picContainer= 'profilepic-pink'
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="style.css">

       
    </head>

    <body>
    <div class="jumbotron jumbotron-fluid">
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
        }
      });
    
    });
  });
}
{
}
// function makePDF(htmlPdf){
//     options =  {format: 'Letter'};
//     pdf.create(htmlPdf, options).toFile('./resume.pdf')  
// }
generate();
