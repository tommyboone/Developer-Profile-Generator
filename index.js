const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
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
    const queryURL = `https://api.github.com/users/${answers.username}`;
    axios.get(queryURL).then(function(response) {
    console.log(response.data)

    const newHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile Generator</title>
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="style.css">
       
    </head>
    <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container main-container"> 
    
     <a href="${response.data.blog}"><img id="profilepic" src = ${response.data.avatar_url}/></a>
     <br>
     <p class = "location"> ${response.data.location}</p>
       <h1 class="display-4">Hi! My name is ${response.data.name}</h1>
     <p class = "bio">${response.data.bio}</p>
     
  </div> 
 </div>
 
 <div class= "container">
 <div class = "row">
      <div class="repos-container">
      <p class="favColor">My favorite color is  ${answers.favColor}</p>
      <p class = "public-repos"> GitHub Repos: ${response.data.public_repos}</p>
      </div>
     <div class="followers-container">
      <p class= "followers"> Followers: ${response.data.followers}</p>
      </div>
      <div class="following-container">
      <p class= "following"> Following: ${response.data.following}</p>
      </div>
      <div class= "stars-container">
      <p class = "stars"> GitHub Stars: ${response.data.public_gists}</p>
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
    </html>`
    
         fs.writeFile('index.html',newHTML, function(err){
             if (err){
                 throw(err)
             }
             else{
                 console.log("sucess!")
                 console.log(response.data.blog)
             }
         } )
    });
 


  })
}

generate()
