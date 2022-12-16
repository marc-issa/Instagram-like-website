/******************************/
/*      Handeling Messges   */
/*****************************/

const startChat = async (id) => {
    let args = new FormData();
    args.append("user2", id)

    const resp = await axios.post('http://127.0.0.1:8000/api/v0.1/chat/create', args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            localStorage.setItem("rid", res.data.room)
            window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/messages/messages.html";
        })
    return resp
}

/******************************/
/*      Handeling Homepage   */
/*****************************/

const followingsPosts = async () => {
    const resp = await axios.get('http://127.0.0.1:8000/api/v0.1/post/following', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            return res.data.posts
        }).catch(err => console.log(err));
    return resp
}

/******************************/
/*      Handeling blocks
/*****************************/

const modifyBlock = async (get = false) => {
    let args = new FormData();
    args.append("user_blocked", localStorage.getItem("id"))

    if (get) {
        args.append("get", true);

        const resp = await axios.post('http://127.0.0.1:8000/api/v0.1/block', args, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
                return res.data.resp
            })
            .catch(err => console.log(err))
        return resp;
    } else {
        const resp = await axios.post('http://127.0.0.1:8000/api/v0.1/block', args, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
                return res.data.resp
            })
            .catch(err => console.log(err))
        return resp;
    }

}

/******************************/
/* Handeling post modal
/*****************************/

const getCurrUser = async () => {
    const resp = await axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let curr_user = res.data.user
            return curr_user
        })
        .catch(err => console.log(err))
    return resp
}

const getPost = async (id) => {
    const resp = await axios.get(`http://127.0.0.1:8000/api/v0.1/post/${id}}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let post = res.data.post;
            return post
        })
        .catch(err => console.log(err))
    return resp;
}

const getUser = async (id) => {
    const resp = await axios.get(`http://127.0.0.1:8000/api/v0.1/user/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let user = res.data.user;
            return user
        })
        .catch(err => console.log(err))
    return resp
}

const getLike = async (id) => {
    let args = new FormData();
    args.append("post_id", id)

    const resp = await axios.post(`http://127.0.0.1:8000/api/v0.1/like/1`, args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let like = res.data.likes_val
            if (like != null) {
                return true
            }
            return false
        })
        .catch(err => console.log(err))
    return resp
}

const getAllComments = async (id) => {
    const resp = await axios.get(`http://127.0.0.1:8000/api/v0.1/comment/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let comments = res.data.comments
            for (let i = comments.length - 1; i >= 0; i--) {

                createCommentItem(comments[i])
            }
        })
        .catch(err => console.log(err))
}

const createCommentItem = (comment) => {
    const comment_content = document.getElementById("comment-content");

    let comment_item = document.createElement("div");
    comment_item.classList.add("comment-item")
    comment_item.innerHTML = `
        <div class="username-comment" onclick="profileRedirect(${comment["id"]})" >
                   ${comment["username"]} 
        </div >
        <div class="comment-text">
            ${comment["comment"]}
        </div>
    `

    comment_content.appendChild(comment_item);
}

const modifyLike = (id) => {
    let args = new FormData();
    args.append("post_id", id)

    axios.post(`http://127.0.0.1:8000/api/v0.1/like/`, args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let like = res.data.message

            let like_bt = document.getElementById("like-bt");
            if (like == undefined) {
                like_bt.src = "../../images/liked-icon.png"
            } else {
                like_bt.src = "../../images/like-icon.png"
            }
        })
        .catch(err => console.log(err))
}

function postInfo(id) {
    getPost(id).then(res => {
        let post = res;
        getCurrUser().then(res => {
            let curr_user = res;
            getUser(post["user_id"]).then(res => {
                let user = res;
                getLike(id).then(res => {
                    let liked = res

                    if (user["id"] == curr_user["id"]) {
                        const delete_bt = document.getElementById("delete-bt");
                        delete_bt.classList.add("active")
                        delete_bt.setAttribute("onclick", `deletePost(${post['id']})`)
                    }

                    let user_post_profile = document.getElementById("user-post-profile");
                    let user_post_username = document.getElementById("user-post-username");

                    user_post_profile.setAttribute("onclick", `profileRedirect(${post["user_id"]})`)
                    user_post_username.setAttribute("onclick", `profileRedirect(${post["user_id"]})`)

                    let post_img = document.getElementById("post-img")
                    let comment_bt = document.getElementById("comment-bt");
                    let like_bt = document.getElementById("like-bt");

                    like_bt.src = "../../images/like-icon.png"
                    if (liked) {
                        like_bt.src = "../../images/liked-icon.png"
                    }

                    user_post_profile.src = user["profile_img"];
                    user_post_username.innerHTML = user["username"]
                    post_img.src = post["img_url"]
                    comment_bt.setAttribute("onclick", `shareComment(${id})`)
                    like_bt.setAttribute("onclick", `modifyLike(${id})`)

                    getAllComments(id)
                })
                    .catch(err => console.log(err))
            })
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))
    })
        .catch(err => console.log(err))
}

const deletePost = async (id) => {
    let args = new FormData();
    args.append("post_id", id)
    await axios.post("http://127.0.0.1:8000/api/v0.1/post/delete", args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.error(err));
}

function shareComment(id) {
    getCurrUser().then(res => {
        curr_user = res;
        let comment_input = document.getElementById("comment-input").value;

        let args = new FormData();
        args.append("post_id", id)
        args.append("user_id", curr_user["id"])
        args.append("comment", comment_input)

        axios.post('http://127.0.0.1:8000/api/v0.1/comment/share', args, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
                incrementComments(id);
            })
    })
}

function incrementComments(id) {
    axios.get(`http://127.0.0.1:8000/api/v0.1/post/comment/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

function removeChanges() {
    const comment_content = document.getElementById("comment-content");
    const user_post_profile = document.getElementById("user-post-profile");
    const user_post_username = document.getElementById("user-post-username");
    const post_img = document.getElementById("post-img")

    comment_content.innerHTML = "";
    user_post_profile.src = "";
    user_post_username.innerHTML = "";
    post_img.src = "";
}

/******************************/
/* Handleing post submission  */
/******************************/

function sharePost() {
    let args = new FormData();

    const caption_input = document.getElementById("caption-input");

    if (caption_input.value.length < 300) {
        if (caption_input.value != '') {
            args.append("caption", caption_input.value);
        }
        if (localStorage.getItem("uploaded-img") != null) {
            args.append("img_url", localStorage.getItem("uploaded-img"))
            axios.post('http://127.0.0.1:8000/api/v0.1/post/share', args, { headers: { Authorization: localStorage.getItem('token') } })
                .then(res => {
                    localStorage.removeItem("uploaded-img")
                    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/home/home.html";
                })
                .catch(err => console.log(err));
        }
    }
}


/**********************************/
/*    Modal Design Controls       */
/**********************************/
function viewPost(id) {
    const modal = document.getElementById("modal");
    const post_modal = document.getElementById("modal-post");

    modal.classList.add('active');
    modal.classList.add('post');
    post_modal.classList.add('active');

    postInfo(id);

    disableScrolling();
}

function viewStorie() {
    const modal = document.getElementById("modal");
    const storie_modal = document.getElementById("modal-storie");

    modal.classList.add('active');
    modal.classList.add('storie');
    storie_modal.classList.add('active')

    disableScrolling();
}

function viewAdd() {
    const modal = document.getElementById("modal");
    const upload_modal = document.getElementById("modal-add");

    modal.classList.add('active');
    modal.classList.add('add');
    upload_modal.classList.add('active')

    disableScrolling();

    axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            const user = res.data.user
            const username = document.getElementById("share-username-post");
            const profile = document.getElementById("share-post-profile");
            username.innerHTML = user["username"];
            profile.src = user["profile_img"]
        })
        .catch(error => console.log(error));
}

function viewNotif() {
    const modal = document.getElementById("modal");
    const notif_modal = document.getElementById("modal-notif");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.add('active');
    modal.classList.add('notif');

    notif_modal.classList.add('active')

    bt_link.classList.add("deactivate-bt")

    disableScrolling();
}

function closeNotif() {
    const modal = document.getElementById("modal");
    const notif_modal = document.getElementById("modal-notif");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.remove('active');
    notif_modal.classList.remove('active');

    modal.classList.remove('notif');
    bt_link.classList.remove("deactivate-bt")

    enableScrolling();

}

function closeModal() {
    const modal = document.getElementById("modal");
    const post_modal = document.getElementById("modal-post");
    const storie_modal = document.getElementById("modal-storie");
    const upload_modal = document.getElementById("modal-add");
    const caption_input = document.getElementById("caption-input");
    const delete_bt = document.getElementById("delete-bt");

    caption_input.value = "";

    delete_bt.classList.remove("active")
    modal.classList.remove('active');
    storie_modal.classList.remove('active')
    post_modal.classList.remove('active');
    upload_modal.classList.remove('active')


    modal.classList.remove('post');
    modal.classList.remove('storie');
    modal.classList.remove('notif');
    modal.classList.remove('add');

    delete_bt.removeAttribute("onclick")

    enableScrolling();
    deleteImg();
    resetCounter();
    removeChanges();
}

// disable/enable scrolling
function disableScrolling() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
    window.onscroll = function () { };
}

// Image uploading and deleting in Add Modal
function addUploadedImg() {
    let reader = new FileReader()

    const uploaded_img = document.getElementById("uploaded-img");
    const img_input = document.getElementById("uploaded-img-input");
    const sec_footer = document.getElementById("upload-sec-footer");
    const delete_icon = document.getElementById("delete-icon")
    const share_bt = document.getElementById("share-bt")
    if (img_input.files[0].size < 65000) {

        uploaded_img.classList.add("active");
        delete_icon.classList.add("active");
        share_bt.classList.add("active");

        reader.readAsDataURL(img_input.files[0]);

        reader.addEventListener("load", function () {
            localStorage.setItem("uploaded-img", reader.result);
            uploaded_img.src = localStorage.getItem("uploaded-img");
        })

        sec_footer.classList.add("deactivate-upload-footer")
    } else {
        alert("Image size too big")
    }
}

function deleteImg() {
    const uploaded_img = document.getElementById("uploaded-img");
    const sec_footer = document.getElementById("upload-sec-footer");
    const delete_icon = document.getElementById("delete-icon")
    const share_bt = document.getElementById("share-bt")

    uploaded_img.classList.remove("active");
    delete_icon.classList.remove("active");
    share_bt.classList.remove("active");

    localStorage.removeItem("uploaded-img")
    uploaded_img.src = "";

    sec_footer.classList.remove("deactivate-upload-footer")
}

// Caption Charachters counter
function charCounter(input_id, display_id, num) {
    const input = document.getElementById(input_id);
    const counter_display = document.getElementById(display_id);

    let str_len = input.value.length;

    if (str_len > num) {
        counter_display.style.color = "red";
    } else {
        counter_display.style.color = "#000005";
    }
    counter_display.innerHTML = `${str_len}/${num}`;
}

function resetCounter() {
    const char_counter = document.getElementById("char-counter");
    char_counter.innerHTML = "0";
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("bio");
    localStorage.removeItem("gender");
    localStorage.removeItem("img-change");
    localStorage.removeItem("uploaded-img");
    axios.get('http://127.0.0.1:8000/api/v0.1/user/logout', { headers: { Authorization: localStorage.getItem('token') } })
        .then(response => {
            window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
            localStorage.removeItem("token")
        })
        .catch(error => console.log(error));
}
