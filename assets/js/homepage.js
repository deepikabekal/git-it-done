// var getUserRepos = function() {
//     console.log("function was called");
// };

// getUserRepos();
//console.log(2);
// var getUserRepos = function() {
//     var response = fetch("https://api.github.com/users/octocat/repos")
//     .then(function(response) {
//         console.log("inside",response);
//     });
//     console.log("outside");
//     //console.log(response);
//    // console.log(1);
//   };


// var getUserRepos = function(){
//     var response = fetch("https://api.github.com/users/octocat/repos")
//     .then(function(response){
//         response.json().then(function(data){
//             console.log(data);
//         });
        
//     });
// }

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repo-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var getUserRepos = function (user){
    // format the github api url

    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the URL

    fetch(apiUrl)
    .then(function(response){
        //handling 404 error
        if (response.ok){
            console.log(response.statusText);
            response.json().then(function(data){
                displayRepos(data,user);
                //console.log(data);
            });
        } else {
            console.log(response.statusText);
            alert("Error: " + response.statusText);
           
        }       
        
    }) 
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
      });

};
//getUserRepos("deepikabekal");

var formSubmitHandler = function(event){
    event.preventDefault();
    //console.log(event);
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value="";
    } else {
        alert("Please enter a GitHub username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler)

var displayRepos = function(repos, searchTerm){
    // console.log(repos);
    // console.log(searchTerm);

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for(var i=0;i<repos.length;i++){

        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if the current repo has issues or not
        if (repos[i].open_issues_count>0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)"
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to conatainer
        repoEl.appendChild(statusEl);
        //append container to DOM
        repoContainerEl.appendChild(repoEl);

    }


};
