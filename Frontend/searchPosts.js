const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('keyword');

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
                if (myParam) {
                    search(myParam);
                } else {
                    setPosts(posts);
                }
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
        button.onclick = function() {
            alert(posts[i].title);
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

function search(keyword) {
    let search = '';
    if (!keyword) {
        search = document.getElementById('search').value;
    } else {
        document.getElementById('search').value = keyword;
        search = keyword;
    }

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