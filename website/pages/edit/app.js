if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}
console.log(localStorage.getItem("token"))

const username_display = document.getElementById("username-display");
const profile_pic = document.getElementById("profile-pic")
const name = document.getElementById("name")
const username = document.getElementById("username")
const bio_input = document.getElementById("bio-input")
const email = document.getElementById("email")

axios.get('http://127.0.0.1:8000/api/v0.1/user/', { headers: { Authorization: localStorage.getItem('token') } })
    .then(res => {
        const user = res.data.user

        username_display.innerHTML = user.username
        username.value = user.username
        email.value = user.email

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

    })
    .catch(error => console.log(error));

function editProfile() {
    let args = new FormData();
    args.append("username", username.value);
    axios.post('http://127.0.0.1:8000/api/v0.1/user/edit/profile', args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            window.location.reload();
        })
        .catch(error => console.log(error));
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