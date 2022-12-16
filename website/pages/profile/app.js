if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

const profile_username = document.getElementById("profile-username");
const profile_pic = document.getElementById("profile-pic");
const name = document.getElementById("name");
const bio = document.getElementById("bio");

const modifyFollow = async (get = false) => {
    let args = new FormData();
    args.append("user_followed", localStorage.getItem("id"))

    if (get) {
        args.append("get", true);

        const resp = await axios.post('http://127.0.0.1:8000/api/v0.1/follow', args, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
                return res.data.resp
            })
            .catch(err => console.log(err))
        return resp;
    } else {
        const resp = await axios.post('http://127.0.0.1:8000/api/v0.1/follow', args, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
                return res.data.resp
            })
            .catch(err => console.log(err))
        return resp;
    }

}

const modifyFollowing = () => {
    modifyFollow().then(res => {
        window.location.reload();
    })

}

const countFollows = async () => {
    const resp = await axios.get(`http://127.0.0.1:8000/api/v0.1/follow/${localStorage.getItem("id")}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            return res.data
        })
    return resp;
}

getCurrUser().then(res => {
    const curr_user = res

    if (curr_user["id"] == localStorage.getItem("id")) {
        const edit_bt = document.getElementById("edit-bt");
        edit_bt.classList.add("active-bt");

        profile_username.innerHTML = curr_user["username"]

        if (curr_user["profile_img"] != "empty") {
            profile_pic.src = curr_user["profile_img"]
        }

        if (curr_user["name"] != "empty") {
            name.innerHTML = curr_user["name"]
        }
        if (curr_user["bio"] != "empty") {
            bio.innerHTML = curr_user["bio"]
        }
    } else {
        const follow_bt = document.getElementById("follow-bt")
        const message_bt = document.getElementById("message-bt")
        const block_bt = document.getElementById("block-bt")

        follow_bt.classList.add("active-bt")
        message_bt.classList.add("active-bt")
        block_bt.classList.add("active-bt")


        getUser(localStorage.getItem("id")).then(res => {
            let user = res

            message_bt.setAttribute("onclick", `startChat(${user["id"]})`)

            profile_username.innerHTML = user["username"]

            name.innerHTML = user["name"]
            bio.innerHTML = user["bio"]

            if (user["profile_img"] != "empty") {
                profile_pic.src = user["profile_img"]
            }
            if (user["name"] == "empty") {
                name.innerHTML = ""
            }
            if (user["bio"] == "empty") {
                bio.innerHTML = ""
            }
        })
    }
})
    .catch(err => console.log(err))

axios.get(`http://127.0.0.1:8000/api/v0.1/post/user/${localStorage.getItem("id")}`, { headers: { Authorization: localStorage.getItem('token') } })
    .then(res => {
        let posts = res.data.posts
        const post_count = document.getElementById("posts-count")
        post_count.innerHTML = posts.length + " posts"

        let display_posts = document.getElementById("profile-posts-display");
        for (let i = posts.length - 1; i >= 0; i--) {
            let post_display = document.createElement("div");
            post_display.classList.add("post-display");
            post_display.innerHTML = ` <img src="${posts[i]["img_url"]}" class="profile-post-size" onclick="viewPost(${posts[i]["id"]})">`
            display_posts.appendChild(post_display);
        }
    })
    .catch(err => console.log(err))

modifyFollow(true).then(res => {
    const follow_bt = document.getElementById("follow-bt");
    if (res) {
        follow_bt.classList.add("unfollow-bt");
        follow_bt.innerHTML = "Unfollow"
    } else {
        follow_bt.classList.add("follow-bt");
        follow_bt.innerHTML = "Follow"
    }
})

countFollows().then(res => {
    const followers = document.getElementById("followers")
    const following = document.getElementById("following")

    followers.innerHTML = `${res.followers} followers`
    following.innerHTML = `${res.following} followings`
})

modifyBlock(true).then(res => {
    if (res) {
        const block_bt = document.getElementById("block-bt");
        if (res) {
            block_bt.classList.add("unblock-bt");
            block_bt.innerHTML = "Unblock"
        } else {
            block_bt.classList.add("block-bt");
            block_bt.innerHTML = "Block"
        }
    }
})

const modifyBlocks = () => {
    modifyBlock().then(res => {
        window.location.reload();
    })
}
