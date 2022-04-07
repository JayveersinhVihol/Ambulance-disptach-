if (localStorage.getItem('contractorUser')) {
    window.location.href = 'contractorDashboard.html';
}

function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let type = 'Contractor';
    let data = {
        email,
        pass,
        type
    };

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/login');
    request.send(JSON.stringify(data));
    request.onload = () => {
        if (request.status === 200) {
            let response = JSON.parse(request.responseText);
            if (response.length > 0) {
                localStorage.setItem('contractorUser', JSON.stringify(response[0]));
                window.location.href = "contractorDashboard.html";
            } else {
                alert('Invalid email or password');
            }
            // window.location.href = "Home.html";
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
            window.location.href = "Home.html";
        }
    }
}