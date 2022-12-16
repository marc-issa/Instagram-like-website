/******************************/
/* Handeling post modal
/*****************************/

function deletePost(id) {

}

function postInfo(id) {
    axios.get(`http://127.0.0.1:8000/api/v0.1/post/${id}}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            let post = res.data.post;
            axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
                .then(res => {
                    let curr_user = res.data.user

                    if (post["user_id"] == curr_user["id"]) {
                        let delete_bt = document.getElementById("delete-bt");
                        delete_bt.classList.add("active")
                        delete_bt.setAttribute("onclick", `deletePost(${post['id']})`)
                    }
                    axios.get(`http://127.0.0.1:8000/api/v0.1/user/${post['user_id']}`, { headers: { Authorization: localStorage.getItem('token') } })
                        .then(res => {
                            user = res.data.user;
                            let header_profile = document.getElementById("header_profile")
                            header_profile.innerHTML = `
                            <img src="${user["profile_img"]}" alt="" class="post-profile" onclick="profileRedirect(${user["id"]})">
                            <div class="username-post" onclick="profileRedirect(${user["id"]})">
                                ${user["username"]}
                            </div>
                            `

                            let comment_bt = document.getElementById("share-comment-bt");
                            comment_bt.setAttribute("onclick", `shareComment(${id})`)
                        })
                        .catch(err => console.log(err))


                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

function shareComment(id) {
    axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            curr_user = res.data.user;
            let comment_input = document.getElementById("comment-input").value;

            let args = new FormData();
            args.append("post_id", id)
            args.append("user_id", curr_user["id"])
            args.append("comment", comment_input)

            axios.post('http://127.0.0.1:8000/api/v0.1/comment/share', args, { headers: { Authorization: localStorage.getItem('token') } })
                .then(res => {
                    window.location.reload()
                })
        })
        .catch(err => console.log(err))
}

/******************************/
/* Handleing post submission  */
/******************************/

function sharePost() {
    let args = new FormData();

    const caption_input = document.getElementById("caption-input");

    if (caption_input.value.length < 300) {
        if (caption_input.value != '') {
            args.append("caption", caption_input);
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

    caption_input.value = "";


    modal.classList.remove('active');
    storie_modal.classList.remove('active')
    post_modal.classList.remove('active');
    upload_modal.classList.remove('active')


    modal.classList.remove('post');
    modal.classList.remove('storie');
    modal.classList.remove('notif');
    modal.classList.remove('add');


    enableScrolling();
    deleteImg();
    resetCounter();
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
axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
    .then(res => {
        const user = res.data.user
        const profile_redirect_dash = document.getElementById("profile-redirect-dash")
        profile_redirect_dash.setAttribute("onclick", `profileRedirect(${user["id"]})`)
    })
    .catch(err => err)
