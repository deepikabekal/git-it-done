var issueContainerEl = document.querySelector("#issues-container");

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
        });
        } else {
            alert("There was a problem with your request!");
        }
    });
    

}

getRepoIssues("deepikabekal/run-buddy");

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

}