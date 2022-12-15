const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const email = document.getElementById("email");
const fname = document.getElementById("fname");
const username = document.getElementById("username");
const password = document.getElementById("password");

const error_email = document.getElementById("error-email");
const error_fname = document.getElementById("error-fname");
const error_username = document.getElementById("error-username");
const error_password = document.getElementById("error-password");

function handleSubmit() {
    resetInput();

    if (email.value == '') {
        error_email.innerHTML = "Email required";
        email.classList.add("error")
    } else if (fname.value == '') {
        error_fname.innerHTML = "Full name required";
        fname.classList.add("error")
    } else if (username.value == '') {
        error_username.innerHTML = "Username required";
        username.classList.add("error")
    } else if (password.value == '') {
        error_password.innerHTML = "Password required";
        password.classList.add("error")
    } else if (!email.value.match(regex)) {
        error_email.innerHTML = "Enter valid email";
        email.classList.add("error")
    } else {
        let args = new FormData();
        args.append("email", email.value.toLowerCase());
        args.append("full_name", fname.value.toLowerCase());
        args.append("username", username.value.toLowerCase());
        args.append("password", password.value.toLowerCase());

        args.append("name", "empty");
        args.append("bio", "empty");
        args.append("gender", "empty");
        args.append("profile_img", "empty");

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/v0.1/user/register',
            data: args
        })
            .then(res => {
                let resp = res.data.authorisation.token;
                localStorage.setItem("token", "Bearer " + resp);
                axios.defaults.headers.common["Authorization"] = "Bearer" + resp;
                window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/home/home.html";
            })
            .catch(err => {
                if (err.response.data.message == "username-exists") {
                    error_username.innerHTML = "Username exists";
                    username.classList.add("error")
                }
                if (err.response.data.message == "email-exists") {
                    error_email.innerHTML = "Email exists";
                    email.classList.add("error")
                }
            });
    }
}

function resetInput() {
    error_email.innerHTML = "";
    error_fname.innerHTML = "";
    error_username.innerHTML = "";
    error_password.innerHTML = "";

    email.classList.remove("error")
    fname.classList.remove("error")
    username.classList.remove("error")
    password.classList.remove("error")
}