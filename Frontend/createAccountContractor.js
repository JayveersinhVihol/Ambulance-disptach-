
function createAccount() {
    let fName = document.getElementById("Fname").value;
    let lName = document.getElementById("Lname").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("contact").value;
    let add = document.getElementById("add").value;
    let pass = document.getElementById("pass").value;
    let cPass = document.getElementById("cpass").value;
    let type = 'Contractor';

    if (!fName) {
        alert("First Name is required");
        return;
    }

    if (!lName) {
        alert("Last Name is required");
        return;
    }

    if (!email) {
        alert("Email is required");
        return;
    }

    if (!contact) {
        alert("Contact is required");
        return;
    }

    if (!add) {
        alert("Address is required");
        return;
    }
    
    if (pass !== cPass) {
        alert("Password does not match");
        return;
    }

    let register = { fName, lName, email, contact, add, pass, type };

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/register');
    request.send(JSON.stringify(register));
    request.onload = () => {
        if (request.status === 200) {
            alert("Account created successfully");
            window.location.href = "Home.html";
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
            window.location.href = "Home.html";
        }
    }
}