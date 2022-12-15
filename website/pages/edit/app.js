if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}
console.log(localStorage.getItem("token"))

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const username_display = document.getElementById("username-display");
const profile_pic = document.getElementById("profile-pic")
const name = document.getElementById("name")
const username = document.getElementById("username")
const bio_input = document.getElementById("bio-input")
const email = document.getElementById("email")
const gender = document.getElementById("gender")

let args = new FormData();

axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
    .then(res => {
        const user = res.data.user

        username_display.innerHTML = user.username
        username.value = user.username
        email.value = user.email

        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("bio", user.bio);
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("img-change", false);

        if (user.profile_img != "empty") {
            profile_pic.src = user.profile_img;
        }
        if (user.name != "empty") {
            name.value = user.name
        }
        if (user.bio != "empty") {
            bio_input.value = user.bio
        }

        if (user.gender != "empty") {
            let male = document.getElementById("male")
            let female = document.getElementById("female")
            let pnts = document.getElementById("pnts")
            let empty = document.getElementById("empty")

            if (user.gender == "male") {
                male.setAttribute("selected", true)
                female.removeAttribute("selected")
                pnts.removeAttribute("selected")
            }
            if (user.gender == "female") {
                female.setAttribute("selected", true)
                male.removeAttribute("selected")
                pnts.removeAttribute("selected")
            }
            if (user.gender == "pnts") {
                pnts.setAttribute("selected", true)
                female.removeAttribute("selected")
                male.removeAttribute("selected")
            }
            empty.removeAttribute("selected")
        }

        if (user.profile_img != "empty") {
            profile_pic.src = user.profile_img
        }

    })
    .catch(error => console.log(error));

function editProfile() {
    let changes = false;

    let args = new FormData();

    let old_username = localStorage.getItem("username");
    let old_email = localStorage.getItem("email");
    let old_name = localStorage.getItem("name");
    let old_bio = localStorage.getItem("bio");
    let old_gender = localStorage.getItem("gender");

    if (username.value != old_username) {
        args.append("username", username.value);
        changes = true;
    }
    if (email.value != old_email) {
        if (email.value.match(regex)) {
            args.append("email", email.value);
            changes = true;
        }
    }

    if (name.value != old_name) {
        args.append("name", name.value)
        changes = true;
    }

    if (bio_input.value != old_bio) {
        args.append("bio", bio_input.value)
        changes = true;
    }

    if (gender.value != old_gender) {
        args.append("gender", gender.value)
        changes = true;
    }

    if (localStorage.getItem("img-change")) {
        args.append("profile_img", localStorage.getItem("uploaded-img"))
        changes = true;
    }

    if (changes) {
        axios.post('http://127.0.0.1:8000/api/v0.1/user/edit/profile', args, { headers: { Authorization: localStorage.getItem('token') } })
            .then(res => {
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("name");
                localStorage.removeItem("bio");
                localStorage.removeItem("gender");
                localStorage.removeItem("img-change");
                localStorage.removeItem("uploaded-img");
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

}

function chamgeImgVal() {
    changeImg();
    localStorage.setItem("img-change") = true;
}

function changeImg() {
    let reader = new FileReader();
    const uploaded_img = document.getElementById("profile-pic");
    const img_input = document.getElementById("pic-input");

    reader.readAsDataURL(img_input.files[0]);

    reader.addEventListener("load", function () {
        localStorage.setItem("uploaded-img", reader.result);
        uploaded_img.src = localStorage.getItem("uploaded-img");
    })
}

function editPassword() {

}

/* ****************************** */
/*          Change Display        */
/* ****************************** */

/* Default option and display */
const edit_profile = document.getElementById("edit-profile");
const profile_display = document.getElementById("profile-display");

const change_password = document.getElementById("change-password")
const change_display = document.getElementById("change-display")

edit_profile.classList.add('active-option')
profile_display.classList.add('active-display')

function changeContent(num) {
    console.log(num)
    if (num == 0) {
        edit_profile.classList.add('active-option')
        profile_display.classList.add('active-display')

        change_password.classList.remove('active-option')
        change_display.classList.remove('active-display')
    } else {
        change_password.classList.add('active-option')
        change_display.classList.add('active-display')

        edit_profile.classList.remove('active-option')
        profile_display.classList.remove('active-display')
    }
}

/* ****************************** */
/*           Delete Modal         */
/* ****************************** */

function deleteAccount() {
    const modal = document.getElementById("modal");
    const del_modal = document.getElementById("modal-delete");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.add('active');
    modal.classList.add('delete');
    del_modal.classList.add('active');

    bt_link.classList.add("deactivate-bt")

    disableScrolling();
}

function closeDelete() {
    const modal = document.getElementById("modal");
    const del_modal = document.getElementById("modal-delete");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.remove('active');
    modal.classList.remove('delete');
    del_modal.classList.remove('active');

    bt_link.classList.remove("deactivate-bt")

    disableScrolling();
}

// disable scrolling
function disableScrolling() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}