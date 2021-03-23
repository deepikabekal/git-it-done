// var getUserRepos = function() {
//     console.log("function was called");
// };

// getUserRepos();
console.log(2);
var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos");
    console.log(1);
  };
getUserRepos();
