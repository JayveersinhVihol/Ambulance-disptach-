let userId = 0;
let postId = 0;

if (!localStorage.getItem('adminUser')) {
    window.location.href = 'LoginAdmin.html';
}

function getAllUsers() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getAllUsers');
    request.send();
    request.onload = () => {
        if (request.status === 200) {

            let users = JSON.parse(request.responseText);

            let table = document.getElementById('users-table');
            table.innerText = '';
            for (let i = 0; i < users.length; i++) {
                let tr = document.createElement('tr');

                let td1 = document.createElement('td');
                td1.innerText = users[i].fName + ' ' + users[i].lName;
                tr.appendChild(td1);

                let td2 = document.createElement('td');
                td2.innerText = users[i].email;
                tr.appendChild(td2);

                let td3 = document.createElement('td');
                let btn1 = document.createElement('a');
                btn1.classList.add('edit-btn');
                btn1.setAttribute('href', 'javascript:void(0)');
                btn1.setAttribute('data-bs-toggle', 'modal');
                btn1.setAttribute('data-bs-target', '#userEditModal');
                btn1.innerText = 'Edit';
                btn1.onclick = () => {
                    document.getElementById('firstName').value = users[i].fName;
                    document.getElementById('lastName').value = users[i].lName;
                    document.getElementById('email').value = users[i].email;
                    document.getElementById('contact').value = users[i].contact;
                    userId = users[i].id;
                }
                let btn2 = document.createElement('a');
                btn2.classList.add('delete-btn');
                btn2.setAttribute('href', 'javascript:void(0)');
                btn2.innerText = 'Delete';
                btn2.onclick = () => {
                    userId = users[i].id;
                    deleteUser();
                }
                td3.appendChild(btn1);
                td3.appendChild(btn2);
                tr.appendChild(td3);
                table.appendChild(tr);
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

getAllUsers();

function getAllPosts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getAllPosts');
    request.send();
    request.onload = () => {
        if (request.status === 200) {

            let posts = JSON.parse(request.responseText);

            let table = document.getElementById('posts-table');
            table.innerText = '';
            for (let i = 0; i < posts.length; i++) {
                let tr = document.createElement('tr');

                let td1 = document.createElement('td');
                td1.innerText = posts[i].title;
                tr.appendChild(td1);

                let td2 = document.createElement('td');
                td2.innerText = posts[i].description;
                tr.appendChild(td2);

                let td3 = document.createElement('td');
                let btn1 = document.createElement('a');
                btn1.classList.add('edit-btn');
                btn1.setAttribute('href', 'javascript:void(0)');
                btn1.setAttribute('data-bs-toggle', 'modal');
                btn1.setAttribute('data-bs-target', '#postEditModal');
                btn1.innerText = 'Edit';
                btn1.onclick = () => {
                    document.getElementById('postTitle').value = posts[i].title;
                    document.getElementById('postDescription').value = posts[i].description;
                    document.getElementById('postCategory').value = posts[i].category;
                    postId = posts[i].id;
                }
                let btn2 = document.createElement('a');
                btn2.classList.add('delete-btn');
                btn2.setAttribute('href', 'javascript:void(0)');
                btn2.innerText = 'Delete';
                btn2.onclick = () => {
                    postId = posts[i].id;
                    deletePost();
                }
                td3.appendChild(btn1);
                td3.appendChild(btn2);
                tr.appendChild(td3);
                table.appendChild(tr);
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

getAllPosts();

function editUser() {
    let fName = document.getElementById('firstName').value;
    let lName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let contact = document.getElementById('contact').value;

    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/updateUser');
    request.send(JSON.stringify({fName, lName, email, contact, id: userId}));
    request.onload = () => {
        if (request.status === 200) {
            alert('User edited');
            document.getElementById('userCloseBtn').click();
            getAllUsers();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

function deleteUser() {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/deleteUser');
    request.send(JSON.stringify({id: userId}));
    request.onload = () => {
        if (request.status === 200) {
            alert('User deleted');
            getAllUsers();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

function editPost() {
    let title = document.getElementById('postTitle').value;
    let description = document.getElementById('postDescription').value;
    let category = document.getElementById('postCategory').value;
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/updatePost');
    request.send(JSON.stringify({title, description, category, id: postId}));
    request.onload = () => {
        if (request.status === 200) {
            alert('Post edited');
            document.getElementById('postCloseBtn').click();
            getAllPosts();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

function deletePost() {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/deletePost');
    request.send(JSON.stringify({id: postId}));
    request.onload = () => {
        if (request.status === 200) {
            alert('Post deleted');
            getAllPosts();
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
            alert("Something went wrong");
        }
    }
}

function logOut() {
    localStorage.removeItem('adminUser');
    window.location.href = 'Home.html';
}