let isEdit = false;
let postId = 0;

function getPageData() {
    let data = localStorage.getItem('managementUser');
    if (data) {
        data = JSON.parse(data);
        getUserPosts();
    } else {
        window.location.href = "LoginManagement.html";
    }
}

getPageData();

function getUserPosts() {
    let request = new XMLHttpRequest();
    request.open('GET', `http://localhost:3000/getAllPosts`);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let posts = JSON.parse(request.response);
            if (posts.length > 0) {
                if (document.getElementsByClassName('no-posts')[0]) {
                    document.getElementsByClassName('no-posts')[0].style.display = 'none';
                }
                let dynamicPosts = document.getElementsByClassName('dynamic-posts')[0];
                dynamicPosts.innerHTML = '';
                for (let i = 0; i < posts.length; i++) {
                    let mainDiv = document.createElement('div');
                    mainDiv.classList.add('all-posts');

                    let img = document.createElement('img');
                    img.src = './images.png';
                    mainDiv.appendChild(img);

                    let title = document.createElement('div');
                    title.classList.add('title');
                    title.innerText = posts[i].title;
                    mainDiv.appendChild(title);

                    let desc = document.createElement('div');
                    desc.classList.add('desc');
                    desc.innerText = posts[i].description;
                    mainDiv.appendChild(desc);

                    let button = document.createElement('button');
                    button.innerText = 'Edit';
                    button.onclick = function() {
                        isEdit = true;
                        postId = posts[i].id;
                        document.getElementById('header-title').innerText = 'EDIT';
                        document.getElementById('create-button').innerText = 'Edit';

                        document.getElementById('title').value = posts[i].title;
                        document.getElementById('description').value = posts[i].description;
                        document.getElementById('category').value = posts[i].category;
                    }
                    mainDiv.appendChild(button);

                    if (posts[i].applicants.length > 0) {
                        let applicants = document.createElement('div');
                        applicants.classList.add('applicants');
                        applicants.innerText = 'Applicants';
                        mainDiv.appendChild(applicants);

                        for (let j = 0; j < posts[i].applicants.length; j++) {
                            let applicant = document.createElement('div');
                            applicant.classList.add('applicant');
                            applicant.setAttribute('data-bs-toggle', 'modal');
                            applicant.setAttribute('data-bs-target', '#applicantModal');
                            applicant.innerText = posts[i].applicants[j].Fname + ' ' + posts[i].applicants[j].Lname;
                            applicant.onclick = function() {
                                document.getElementById('userEmail').innerText = posts[i].applicants[j].email;
                                document.getElementById('Fname').innerText = posts[i].applicants[j].Fname;
                                document.getElementById('Lname').innerText = posts[i].applicants[j].Lname;
                                document.getElementById('phone').innerText = posts[i].applicants[j].phone;
                                document.getElementById('Add').innerText = posts[i].applicants[j].Add;
                                document.getElementById('city').innerText = posts[i].applicants[j].city;
                                document.getElementById('province').innerText = posts[i].applicants[j].province;
                                document.getElementById('country').innerText = posts[i].applicants[j].country;
                                document.getElementById('school').innerText = posts[i].applicants[j].school;
                                document.getElementById('program').innerText = posts[i].applicants[j].program;
                                document.getElementById('edu_lvl').innerText = posts[i].applicants[j].edu_lvl;
                                document.getElementById('gr_date').innerText = posts[i].applicants[j].gr_date;
                                document.getElementById('emp_name').innerText = posts[i].applicants[j].emp_name;
                                document.getElementById('job_t').innerText = posts[i].applicants[j].job_t;
                                document.getElementById('job_d').innerText = posts[i].applicants[j].job_d;
                                document.getElementById('w_year').innerText = posts[i].applicants[j].w_year;
                            }
                            mainDiv.appendChild(applicant);
                        }
                    }
                    dynamicPosts.appendChild(mainDiv);
                }

                let allPosts = document.getElementsByClassName('old-posts')[0];
                allPosts.appendChild(dynamicPosts);
            } else {
                alert('No posts available');
                document.getElementsByClassName('no-posts')[0].style.display = 'block';
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
        }
    }
}

function createPost() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let data = localStorage.getItem('employerUser');
    if (data) {
        data = JSON.parse(data);
    }

    if (!isEdit) {
        let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/createPost');
        // request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ title, description, category }));
        request.onload = () => {
            if (request.status === 200) {
                alert('Post created successfully');
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('category').value = '';
                getUserPosts();
            } else {
                console.log(`Error ${request.status} ${request.statusText}`);
            }
        }
    } else {
        let request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3000/updatePost');
        // request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ title, description, category, id: postId }));
        request.onload = () => {
            if (request.status === 200) {
                alert('Post edited successfully');
                isEdit = true;
                postId = 0;
                document.getElementById('header-title').innerText = 'CREATE';
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('category').value = '';
                document.getElementById('create-button').innerText = 'Create';
                getUserPosts(data.id);
            } else {
                console.log(`Error ${request.status} ${request.statusText}`);
            }
        }
    }
}

function logOut() {
    localStorage.removeItem('managementUser');
    window.location.href = 'Home.html';
}