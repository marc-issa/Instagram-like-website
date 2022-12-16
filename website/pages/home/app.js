if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

function isTyping() {
    post_bt.href = '#';
    post_bt.style.color = "#0095f6";
}

const showPosts = async () => {
    await followingsPosts().then(res => {
        let posts = res;
        const post_sec = document.getElementById("post-sec")

        for (let i = posts.length - 1; i >= 0; i--) {
            getUser(posts[i]["user_id"]).then(res => {
                let user = res;
                let liked = "../../images/like-icon.png"

                date = posts[i]["created_at"].split(" ")[0]
                time = posts[i]["created_at"].split(" ")[1]

                let post_time = timeDiff(date)

                getLike(posts[i]["id"]).then(res => {
                    if (res) {
                        liked = "../../images/liked-icon.png"
                    }

                    let post_card = document.createElement("div")
                    post_card.classList.add("post-card")

                    let profile_img = user["profile_img"]
                    let caption = posts[i]["caption"]

                    if (profile_img == "empty") {
                        profile_img = "../../images/no-profile.png"
                    }

                    if (caption == "empty") {
                        caption = ""
                    }

                    post_card.innerHTML = `
                        <div class="post-header">
                            <img src="${profile_img}" class="post-profile-size" onclick="profileRedirect(${user["id"]})">
                            <div class="post-user" onclick="profileRedirect(${user["id"]})">${user["username"]}</div>
                        </div>
                        <img src="${posts[i]["img_url"]}" class="post-img">
                        <div class="post-footer">
                            <div class="post-reaction">
                                <img src="${liked}" class="reaction-icon" id="like-bt-${posts[i]["id"]}" onclick="addRemoveLike(${posts[i]["id"]})">
                                <img src="../../images/comment-icon.png" class="reaction-icon" onclick="viewPost(${posts[i]["id"]})" ></div>
                                <div class="likes" id ="likes-${posts[i]["id"]}">${posts[i]["likes_count"]} likes</div>
                                <div class="caption">
                                    <div class="post-user" onclick="profileRedirect(${user["id"]})></div>
                                    <div class="post-caption">${caption}</div>
                                </div>
                                <div class="stats">
                                    <a class="comment-count" onclick="viewPost(${posts[i]["id"]})">Viw all ${posts[i]["comment_count"]} comments</a>
                                    <div class="upload-time">${post_time}</div>
                                </div>
                        </div>
                        `
                    post_sec.appendChild(post_card)
                })
            })
        }
    })
}

const timeDiff = (date) => {
    let today = new Date().toLocaleDateString()

    date = `${date.split("-")[1]}/${date.split("-")[2]}/${date.split("-")[0]}`

    today = new Date(today);
    date = new Date(date)

    let date_diff = (today - date)
    if (date_diff == 0) {
        return "today"
    } else {
        return `A while ago`
    }
}

const addRemoveLike = async (id) => {
    let args = new FormData();
    args.append("post_id", id)

    axios.post(`http://127.0.0.1:8000/api/v0.1/like/`, args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let like = res.data.message

            let like_bt = document.getElementById(`like-bt-${id}`);
            let likes = document.getElementById(`likes-${id}`);

            if (like == undefined) {
                like_bt.src = "../../images/liked-icon.png"
                likes.innerHTML = `${parseInt(likes.innerHTML.split(" ")[0]) + 1} likes`
            } else {
                like_bt.src = "../../images/like-icon.png"
                likes.innerHTML = `${parseInt(likes.innerHTML.split(" ")[0]) - 1} likes`
            }
        })
        .catch(err => console.log(err))
}

showPosts()
