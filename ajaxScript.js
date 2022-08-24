//Few initial setups
document.getElementById("btnadd").addEventListener("click", addFunc);
let uio = document.getElementById("rsum");
uio.style.display = "none";
let theTable = document.getElementById("tableid");
theTable.style.display = "none";
let theNext = document.getElementById("nextid");
theNext.style.display = "none";

//Ajax request for retrieving data
let tbody = document.getElementById("tablebody");
function getdata(){
    tbody.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "getData.php", true);
    xhr.responseType = "json";
    xhr.onload = () => {
        if(xhr.status === 200){
            console.log(xhr.response);
            if(xhr.response){
                x = xhr.response;
            } else {
                x = "";
            }
            for(let i=0;i<3;i++){
                tbody.innerHTML += "<tr><td>" + i + "</td>" + 
                "<td>" + x[i].name + "</td>" +
                "<td>" + x[i].phone + "</td>" +
                "<td>" + x[i].email + "</td>" +
                "<td>" + x[i].password + "</td>" +
                "<td> <button class='btn btn-danger btn-sm btn-del' onclick='HdelFunc(" + x[i].phone + ");' id=d" + x[i].phone + ">DELETE</button>" +
                "</td></tr>";
            }
            if(x.length > 3){
                theNext.style.display = "block";
            }
        } 
        else {
            console.log("Error");
        }
    };
    xhr.send();
}

//For Second Page
function forSecond(e){
    let tbody2 = document.getElementById("tablebody2");
    console.log(e);
    tbody2.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "getData.php", true);
    xhr.responseType = "json";
    xhr.onload = () => {
        if(xhr.status === 200){
            console.log(xhr.response);
            if(xhr.response){
                x = xhr.response;
            } else {
                x = "";
            }
            
            for(let i=3;i<x.length;i++){
                tbody2.innerHTML += "<tr><td>" + i + "</td>" + 
                "<td>" + x[i].name + "</td>" +
                "<td>" + x[i].phone + "</td>" +
                "<td>" + x[i].email + "</td>" +
                "<td>" + x[i].password + "</td>" +
                "<td> <button class='btn btn-danger btn-sm btn-del' onclick='HdelFunc2(" + x[i].phone + ");' id=d" + x[i].phone + ">DELETE</button>" +
                "</td></tr>";
            }
        } 
        else {
            console.log("Error");
        }
    };
    xhr.send();
}

function HdelFunc2(idbtn){
    help2(idbtn);
    window.location.href="index.html";
} 

function help2(idbtn){
    delFunc(idbtn);
    document.getElementById("msg2").style.display="block";
    document.getElementById("msg2").innerHTML = "<div class='text-center shadow alert alert-danger' role='alert'><strong>Deleted Successfully</strong></div>"; 
    window.scrollTo(0, 0);
    setTimeout(function(){
        document.getElementById("msg2").style.display="none";
    }, 2000);
}

//Ajax request for inserting data
function addFunc(e){
    e.preventDefault();
    console.log("hey there");
    let name = document.getElementById("nameid").value;
    let phone = document.getElementById("phoneid").value;
    let email = document.getElementById("emailid").value;
    let password = document.getElementById("pwdid").value;
    let confirmpassword = document.getElementById("cpwdid").value;
    
    if((!name) || (!phone) || (!email) || (!password)){
        document.getElementById("msg").innerHTML = "<div class='text-center shadow alert alert-danger' role='alert'><strong>Can not have Empty Fields</strong></div>";
        return;
    }
    if(isNaN(phone) || phone.length < 10){
        document.getElementById("msg").innerHTML = "<div class='text-center shadow alert alert-danger' role='alert'><strong>Enter Valid Phone No</strong></div>";
        return;
    }

    if(password.localeCompare(confirmpassword) != 0){
        document.getElementById("msg").innerHTML = "<div class='text-center shadow alert alert-danger' role='alert'><strong>Check Confirm Password</strong></div>";
        return;
    }
    

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        if(xhr.status === 200){
            console.log("down");
            console.log(xhr.responseText);
            document.getElementById("msg").style.display="block";
            document.getElementById("msg").innerHTML = "<div class='text-center shadow alert alert-success' role='alert'><strong>" + xhr.responseText + "</strong></div>"; 
            document.getElementById("myForm").reset();
            
            let alertmsg = "Can't have empty fields";
            if(alertmsg.localeCompare(xhr.responseText) != 0){
                uio.style.display = "block";
                theTable.style.display = "block";
                getdata();
            }
            window.scrollTo(0, 0);
            setTimeout(function(){
                document.getElementById("msg").style.display="none";
            }, 1000);
            
        } else {
            console.log("Error");
        }
    };

    const mydata = { name: name, phone: phone, email: email, password: password };
    console.log(mydata);
    const data = JSON.stringify(mydata);
    xhr.send(data);
}

//Helping delete function
function HdelFunc(idbtn){
    document.getElementById("msg").style.display="block";
    document.getElementById("msg").innerHTML = "<div class='text-center shadow alert alert-danger' role='alert'><strong>Deleted Successfully</strong></div>"; 
    window.scrollTo(0, 0);
    setTimeout(function(){
        document.getElementById("msg").style.display="none";
    }, 1000);
    delFunc(idbtn);
}


//Ajax request to delete data
function delFunc(idbtn){
    console.log(idbtn);
    btnid = parseInt(idbtn);
    console.log(btnid);
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "delData.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        if(xhr.status === 200){
            console.log(xhr.responseText);
            getdata();
            
            //theTable.style.display = "block";
        } else {
            console.log("Error");
        }
    }

    const mydata = { phone: btnid };
    const data = JSON.stringify(mydata);
    xhr.send(data);
    
}

