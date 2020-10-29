
let repoName = "";
let info;

const bodyParser = require('body-parser');
const express = require('express');
const request = require("request");

const app = express();
let ejs = require('ejs');
app.set('view engine', 'ejs');


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (req, res) {

  res.render("index");

});


app.post("/", function (req, res) {

  repoName = req.body.repoName;
  if (repoName=="") {
    res.redirect("/");

  }else{
    var options = {
      url: 'https://api.github.com/repos/' + repoName,
  
      headers: {
        'User-Agent': 'repo-eye'
      }
    };
  
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        info = JSON.parse(body);
        res.redirect("/info");
  
        //  console.log(info.forks_count + " Forks");
      }
      else{
        res.redirect("/");
      }
    };
  
    request(options, callback);
  }



});


app.get("/info", function (req, res) {
  let repoName = info.name;
  let repoBranch = info.default_branch;

  let repoDiscription = info.description;
  let repoLanguage = info.language;
  let repoSize = info.size;
  let repoForks = info.forks_count;
  let repoWatchers = info.subscribers_count;
  let repoOpenIssues = info.open_issues;
  let repoTotalStars = info.stargazers_count;
  let repoSizeOriginal;

  if (repoSize < 1024) {
    repoSizeOriginal = repoSize + " KB";

  } else {

    repoSizeOriginal = Math.round(repoSize / 1024).toFixed(1) + " MB";

  }

  let repoOwnerUserName = info.owner.login;
  let repoOwnerUserType = info.owner.type;
  let repoOwnerUserURLLink = info.owner.html_url;
  let repoGitURL = info.git_url;
  let repoSshURL = info.ssh_url;
  let repoCloneURL = info.clone_url;
  let repoSvnURL=info.svn_url;


  res.render("info", {
    repoName: repoName,
    repoBranch: repoBranch,
    repoDiscription: repoDiscription,
    repoLanguage: repoLanguage,
    repoSize: repoSizeOriginal,
    repoForks: repoForks,
    repoWatchers: repoWatchers,
    repoOpenIssues: repoOpenIssues,
    repoTotalStars: repoTotalStars,
    repoOwnerUserName: repoOwnerUserName,
    repoOwnerUserType: repoOwnerUserType,
    repoOwnerUserURLLink: repoOwnerUserURLLink,
    repoGitURL: repoGitURL,
    repoSshURL: repoSshURL,
    repoCloneURL: repoCloneURL,
    repoSvnURL:repoSvnURL

  });


});



//https://api.github.com/



app.listen(process.env.PORT || 3000, function () {
  console.log("app run on 3000");
});
