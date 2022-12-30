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
        document.getElementById('submit-btn').removeEventListener("click", sendMsg); 
        document.getElementById('msg-info').value = "Thanks so much!"; 
    }
    /* else if (xhttp.status === 500 || xhttp.status === 503) { 
        console.log("ERROR: could not send msg.")
        //alert(xhttp.status + ": An error occured, try again later.")
        document.getElementById('msg-info').value = xhttp.status+": an error occurred... try again later?"; 
    }
    else if (xhttp.status === 429) { 
        console.log("ERROR: too may reqs.")
        //alert(xhttp.status + ": An error occured, try again later.")
        document.getElementById('msg-info').value = xhttp.status+": stop hitting the button so much."; 
    }*/ 
    else { 
        console.log("ERROR: something else went wrong..."); 
        document.getElementById('submit-btn').removeEventListener("click", sendMsg); 
        document.getElementById('msg-info').value = "Thanks so much!"; 
    }
}
