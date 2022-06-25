var xhttp; 

var curr = "main"; 

window.onload = function(){
    getGitHub(); 
    initElems(); 
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

function initElems(){ 
    document.getElementById("menu").addEventListener("click", showMenu); 
    document.getElementById("close").addEventListener("click", closeMenu); 
    for(menuItem of document.getElementsByTagName("li")){ 
        menuItem.addEventListener("click", goto); 
    }
}

function showMenu(e){ 
    if(document.getElementById("close").style.visibility == "hidden") document.getElementById("close").style.visibility = null; 
    if(document.getElementsByClassName("dropdown-menu")[0].style.visibility == "hidden") document.getElementsByClassName("dropdown-menu")[0].style.visibility = null;
    document.getElementById("menu").classList.add("spin-out");
    document.getElementById("menu").classList.remove("spin-in");  
    document.getElementById("close").classList.add("spin-in"); 
    document.getElementById("close").classList.remove("spin-out"); 

    document.getElementsByClassName("dropdown-menu")[0].classList.remove("fade-out-menu")
    document.getElementsByClassName("dropdown-menu")[0].classList.add("fade-in-menu")
}

function closeMenu(e){ 
    document.getElementById("menu").classList.add("spin-in");
    document.getElementById("menu").classList.remove("spin-out");  
    document.getElementById("close").classList.add("spin-out"); 
    document.getElementById("close").classList.remove("spin-in"); 

    document.getElementsByClassName("dropdown-menu")[0].classList.remove("fade-in-menu")
    document.getElementsByClassName("dropdown-menu")[0].classList.add("fade-out-menu")
}

function goto(e){ 
    if(curr===e.target.id) return; 
    
    // Fade in new page, fade out prev page 
    document.getElementsByClassName(curr)[0].classList.remove("fade-in-page"); 
    document.getElementsByClassName(e.target.id)[0].classList.remove("fade-out-page"); 
    document.getElementsByClassName(curr)[0].classList.add("fade-out-page"); 
    document.getElementsByClassName(e.target.id)[0].classList.add("fade-in-page"); 

    // Show current menu link chosen 
    document.getElementById(e.target.id).classList.add("current"); 
    document.getElementById(curr).classList.remove("current"); 
    
    curr=e.target.id;

    closeMenu(null); 
}

