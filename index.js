var xhttp = null; 
var data; 
var baseUrl = "https://bday-celebrate.herokuapp.com/msg"; 

window.onload = function() { 
    document.getElementById("submit-btn").addEventListener("click", sendMsg); 
}

function sendMsg() { 
    data = document.getElementById("msg-input").value; 
    let url = baseUrl+"?name="+data; 
    xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, true); 
    xhttp.onreadystatechange = processMsg;
	xhttp.send(); 
}

function processMsg() { 
    if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) { 
        console.log("SUCCESS: msg sent.")
        //alert("Thanks for wishing Shan a Happy Birthday!")
        document.getElementById('submit-btn').classList.add('btn-success'); 
        document.getElementById('submit-btn').classList.remove('btn-primary'); 
        document.getElementById('msg-info').innerHTML = "Thanks so much!"; 
    }
    else if (xhttp.status === 500 || xhttp.status === 503) { 
        console.log("ERROR: could not send msg.")
        //alert(xhttp.status + ": An error occured, try again later.")
        document.getElementById('submit-btn').classList.add('btn-danger'); 
        document.getElementById('submit-btn').classList.remove('btn-primary'); 
        document.getElementById('msg-info').innerHTML = "And error occurred... try again later?"; 
    }
    else { 
        console.log("ERROR: something else went wrong...")
    }
}
