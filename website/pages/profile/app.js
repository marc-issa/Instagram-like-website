if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

const profile_username = document.getElementById("profile-username");
const profile_pic = document.getElementById("profile-pic");
const name = document.getElementById("name");
const bio = document.getElementById("bio");

axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
    .then(res => {
        const user = res.data.user
        if (user["id"] == localStorage.getItem("id")) {
            const edit_bt = document.getElementById("edit-bt");
            edit_bt.classList.add("active-bt");

            profile_username.innerHTML = user["username"]
            profile_pic.src = user["profile_img"]
            name.innerHTML = user["name"]
            bio.innerHTML = user["bio"]
        } else {
            const follow_bt = document.getElementById("follow-bt")
            const message_bt = document.getElementById("message-bt")
            const block_bt = document.getElementById("block-bt")
        }
        // localStorage.removeItem("id");
    })
    .catch(err => console.log(err))