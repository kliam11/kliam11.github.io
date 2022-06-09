var xhttp; 

window.onload = function(){
    getGitHub(); 
}; 

function getGitHub() {
    xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://api.github.com/users/kliam11', true);
    xhttp.setRequestHeader('Accept', 'application/json'); 
    xhttp.send();
    xhttp.onreadystatechange = processData; 
}

function processData(){ 
    if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        let userInfo = JSON.parse(xhttp.responseText); 
        createUserCard(userInfo).addEventListener("click", gotoGitHubUser); 
	} else { 
        console.log(xhttp.status, 'GitHub user load error'); 
    }
} 

function createUserCard(user){ 
    let card = '<div class="github-card">'
    card += '<div><img src='+user.avatar_url+'></div>'; 
    card += '<div id="github-card-info"><h4>GitHub</h4>'; 
    card += '<h5>'+user.login+' ('+user.name+')</h5>'; 
    card += '<h6>'+user.bio+'</h6>'; 
    card += '<ul><li>Last updated: '+ new Date(user.updated_at).toString().slice(4,15)+'</li><li>Repositories: '+user.public_repos+'</li></ul></div>'; 
    card += '</div>'; 
    document.getElementsByClassName("bio")[0].innerHTML += card; 
    return document.getElementsByClassName("github-card")[0]; 
}

function gotoGitHubUser(e){ 
    window.location.href = 'https://github.com/kliam11'; 
}


