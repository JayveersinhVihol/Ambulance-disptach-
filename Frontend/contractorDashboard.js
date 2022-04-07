let avl_posts = [];
let tmp_avl_posts = [];
let job_id = '';

function getPageData() {
    let data = localStorage.getItem('contractorUser');
    if (data) {
        data = JSON.parse(data);

        document.getElementById('name').innerText = data.fName + ' ' + data.lName;
        document.getElementById('email').innerText = data.email;
        document.getElementById('mobile').innerText = data.contact;

        document.getElementById('name').style.display = 'block';
        document.getElementById('email').style.display = 'block';
        document.getElementById('mobile').style.display = 'block';
        document.getElementById('edit').style.display = 'block';
        document.getElementById('save').style.display = 'none';
        document.getElementById('fNameEdit').style.display = 'none';
        document.getElementById('lNameEdit').style.display = 'none';
        document.getElementById('emailEdit').style.display = 'none';
        document.getElementById('mobileNumberEdit').style.display = 'none';
    } else {
        window.location.href = 'LoginContractor.html';
    }
}

getPageData();

function getPosts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/getAllPosts');
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let posts = JSON.parse(request.response);

            if (posts.length > 0) {
                avl_posts = posts;
                tmp_avl_posts = posts;
                document.getElementsByClassName('no-posts')[0].style.display = 'none';
                setPosts(posts);
            } else {
                alert('No posts available');
                document.getElementsByClassName('no-posts')[0].style.display = 'block';
            }
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
        }
    }
}

function setPosts(posts) {
    if (document.getElementsByClassName('post').length > 0) {
        document.getElementsByClassName('post')[0].remove();
    }

    let tmpPost = document.createElement('div');
    tmpPost.classList.add('post');
    tmpPost.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('post-list');

        let firstLine = document.createElement('div');
        firstLine.classList.add('line-one');

        let img = document.createElement('img');
        img.src = './images.png';
        let title = document.createElement('div');
        title.classList.add('title');
        title.innerText = posts[i].title;
        firstLine.appendChild(img);
        firstLine.appendChild(title);

        let lineTwo = document.createElement('div');
        lineTwo.classList.add('line-two');
        let desc = document.createElement('div');
        desc.classList.add('desc');
        desc.innerText = posts[i].description;
        lineTwo.appendChild(desc);

        let lineThree = document.createElement('div');
        lineTwo.classList.add('line-three');
        let button = document.createElement('button');
        button.innerText = 'Apply';
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#exampleModal');
        button.onclick = function() {
            document.getElementById('job-title').innerText = posts[i].title;
            console.log(posts[i]);
            job_id = posts[i].id;
        }
        lineTwo.appendChild(button);

        mainDiv.appendChild(firstLine);
        mainDiv.appendChild(lineTwo);
        mainDiv.appendChild(lineThree);
        tmpPost.appendChild(mainDiv);
    }
    let allPosts = document.getElementsByClassName('post-main');
    allPosts[0].appendChild(tmpPost);
}

getPosts();

function search() {
    let search = document.getElementById('search').value;

    if (search.length > 0) {
        let tmp = [];
        for (let i = 0; i < avl_posts.length; i++) {
            if (avl_posts[i].title.toLowerCase().includes(search.toLowerCase())) {
                tmp.push(avl_posts[i]);
            }
        }

        if (tmp.length > 0) {
            setPosts(tmp);
        } else {
            alert('No results found');
        }
    } else {
        setPosts(avl_posts);
    }
}

function edit() {
    let editFName = document.getElementById('fNameEdit');
    let editLName = document.getElementById('lNameEdit');
    let editEmail = document.getElementById('emailEdit');
    let editMobile = document.getElementById('mobileNumberEdit');

    document.getElementById('name').style.display = 'none';
    document.getElementById('email').style.display = 'none';
    document.getElementById('mobile').style.display = 'none';
    document.getElementById('edit').style.display = 'none';
    document.getElementById('save').style.display = 'block';

    let data = localStorage.getItem('contractorUser');
    if (data) {
        data = JSON.parse(data);

        editFName.value = data.fName;
        editLName.value = data.lName;
        editEmail.value = data.email;
        editMobile.value = data.contact;
    }

    editFName.style.display = 'inline-block';
    editLName.style.display = 'inline-block';
    editEmail.style.display = 'block';
    editMobile.style.display = 'block';
}

function save() {
    document.getElementById('name').style.display = 'block';
    document.getElementById('email').style.display = 'block';
    document.getElementById('mobile').style.display = 'block';
    document.getElementById('edit').style.display = 'block';
    document.getElementById('save').style.display = 'none';
    document.getElementById('fNameEdit').style.display = 'none';
    document.getElementById('lNameEdit').style.display = 'none';
    document.getElementById('emailEdit').style.display = 'none';
    document.getElementById('mobileNumberEdit').style.display = 'none';
}

function logOut() {
    localStorage.removeItem('contractorUser');
    window.location.href = 'Home.html';
}

function apply() {
    let email = document.getElementById('userEmail').value || '';
    let Fname = document.getElementById('Fname').value || '';
    let Lname = document.getElementById('Lname').value || '';
    let phone = document.getElementById('phone').value || '';
    let Add = document.getElementById('Add').value || '';
    let city = document.getElementById('city').value || '';
    let province = document.getElementById('province').value || '';
    let country = document.getElementById('country').value || '';
    let school = document.getElementById('school').value || '';
    let program = document.getElementById('program').value || '';
    let edu_lvl = document.getElementById('edu_lvl').value || '';
    let gr_date = document.getElementById('gr_date').value || '';
    let emp_name = document.getElementById('emp_name').value || '';
    let job_t = document.getElementById('job_t').value || '';
    let job_d = document.getElementById('job_d').value || '';
    let w_year = document.getElementById('w_year').value || '';

    let request = new XMLHttpRequest();
    request.open('POST', `http://localhost:3000/applyJob?id=${job_id}`);
    request.send(JSON.stringify({ email, Fname, Lname, phone, Add, city, province, country, school, program, edu_lvl, gr_date, emp_name, job_t, job_d, w_year }));
    request.onload = () => {
        if (request.status === 200) {
            alert('Applied for post successfully');
        } else {
            console.log(`Error ${request.status} ${request.statusText}`);
        }
    }
}