var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");


//getting the repoName from the URL
var getRepoName = function(){
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    //check if reponame is available 
    //if yes then display the repoName and get the repo issues
    //else take the user back to index.html page
    if(repoName) {
        getRepoIssues(repoName);
        repoNameEl.textContent = repoName;
    } else {
        document.location.replace("./index.html");
    }

}

var getRepoIssues = function(repo){
    //console.log(repo);

    var apiUrl = "https://api.github.com/repos/"+repo+"/issues?direction=asc";

    fetch(apiUrl)
    .then(function(response){
        if (response.ok){
            response.json().then(function(data){
            console.log(data);
            // pass response data to dom function
            displayIssues(data);

            // check if api has paginated issues
            if (response.headers.get("Link")){
                displayWarning(repo);
                console.log("repo has more than 30 issues");
            }
        });
        } else {
            //alert("There was a problem with your request!");

            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    });
    

}
//hardcoded input
//getRepoIssues("facebook/react");

var displayIssues = function(issues){
     //check if there are issues in the repo
     if(issues.length===0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i=0;i<issues.length;i++){
       
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href",issues[i].html_url);
        issueEl.setAttribute("target","_blank");

        //create a span to hold the issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request){
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issues)";
        }

        //append issues to container

        issueEl.appendChild(typeEl);

        //append to the main container to sisplay on screen
        issueContainerEl.appendChild(issueEl);

    }

};

var displayWarning = function(repo){
    //add text to the warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href","https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();