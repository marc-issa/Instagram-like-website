if (localStorage.getItem("token") != null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/home/home.html";
}

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const username_email = document.getElementById("username");
const password = document.getElementById("password");

const error_ue = document.getElementById("error-username-email");
const error_password = document.getElementById("error-password");

const error = document.getElementById("error-head")

function handleSubmit() {
    resetInput();

    if (username_email.value == '') {
        error_ue.innerHTML = "Username or email required";
        username_email.classList.add("error");
    } else if (password.value == '') {
        error_password.innerHTML = "Password required";
        password.classList.add("error");
    } else {
        let args = new FormData();
        if (username_email.value.match(regex)) {
            args.append("email", username_email.value);
        } else {
            args.append("username", username_email.value);
        }
        args.append("password", password.value)

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/v0.1/user/login',
            data: args
        })
            .then(res => {
                let resp = res.data.authorisation.token;
                localStorage.setItem("token", "Bearer " + resp);
                axios.defaults.headers.common["Authorization"] = "Bearer" + resp;
                window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/home/home.html";
            })
            .catch(err => {
                console.log(err)
                error.innerHTML = "Wrong username/email or password";
            });


    }
}

function resetInput() {
    error_ue.innerHTML = "";
    error_password.innerHTML = "";

    username_email.classList.remove("error")
    password.classList.remove("error")

    error.innerHTML = "";
}