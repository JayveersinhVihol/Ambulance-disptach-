if (localStorage.getItem('adminUser')) {
    window.location.href = "AdminDashboard.html";
}

function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let type = 'Admin';
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
            if (response.admin === 'Admin') {
                localStorage.setItem('adminUser', JSON.stringify({type: 'Admin'}));
                window.location.href = "AdminDashboard.html";
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