let params = window.location.search.split('?')[1];

let id = params.split("=")[1];
let likes = [];

let data = new FormData();
data.append('user_id', id);

fetch('http://localhost/Projects/Website/Instagram-like-website/api/posts/user_likes.php', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
    },
    body: data
}).then(response => response.text())
    .then(text => {
        likes = JSON.parse(text)["liked"];
    })

fetch('http://localhost/Projects/Website/Instagram-like-website/api/home/all_posts.php', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
}).then(response => response.text())
    .then(text => {
        let res = JSON.parse(text);
        let posts = res["posts"];
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];

            fetch(`http://localhost/Projects/Website/Instagram-like-website/api/posts/get_user.php?id=${post["user_id"]}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }).then(response => response.text())
                .then(text => {
                    let user = JSON.parse(text);
                    let username = user["username"];

                    fetch(`http://localhost/Projects/Website/Instagram-like-website/api/uploads/get_img.php?img_path=${post["img_url"]}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'image/png'
                        },
                    }).then(response => response.blob())
                        .then(image => {
                            const imageObjectURL = URL.createObjectURL(image);

                            let div = document.createElement('div');
                            div.setAttribute('class', 'post-item');
                            div.style.marginTop = "1em";
                            div.innerHTML = `
                                                <div class="header">
                                                        <h3 class="username">${username}</h3>
                                                    </div>
                                                    <div class="post-image">
                                                        <img src="${imageObjectURL}" class="img" alt="post image">
                                                    </div>
                                                    <div class="likencomment">
                                                        <span><img src="images/like-icon.png" class="like" id="like${post["id"]}" onclick="addLike(${post["id"]},${id})"><img src="images/comment-icon.png"
                                                                class="comment" id="comment"></span>
                                                    </div>
                                                    <div class="caption">
                                                        <h4 class="username-content">${username}</h4>
                                                        <p class="caption-content">  ${post["caption"]}</p>
                                                    </div>
                            `

                            document.getElementById("mid").appendChild(div);
                            let user_liked = likes.includes(post["id"]);
                            if (user_liked) {
                                let like = document.getElementById(`like${post["id"]}`);
                                like.src = "images/liked-icon.png"
                            }
                        })
                })
        }

    })

let addLike = (post_id, user_id) => {
    let data = new FormData();
    data.append('user_id', user_id);
    data.append('post_id', post_id);

    let resp = "";

    fetch('http://localhost/Projects/Website/Instagram-like-website/api/posts/add_remove_like.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: data
    }).then(response => response.text())
        .then(text => {
            resp = JSON.parse(text)["resp"];
            let like = document.getElementById(`like${post_id}`);
            if (resp == "like-added") {
                like.src = "images/liked-icon.png"
            } else {
                like.src = "images/like-icon.png"
            }
        })
}


