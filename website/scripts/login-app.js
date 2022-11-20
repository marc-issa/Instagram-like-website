let login_form = document.getElementById("login-form");
let h5 = document.createElement("h5");
h5.style.color = "red";
login_form.appendChild(h5);

let handleSubmit = () => {
    let username = document.getElementById("username-input-box");
    let password = document.getElementById("password-input-box");

    h5.textContent = "";
    username.style.borderColor = "#DEE2E6";
    password.style.borderColor = "#DEE2E6";

    if (username == "") {
        h5.textContent = "Missing fields";
        username.style.borderColor = "red";
    }
    else if (password == "") {
        h5.textContent = "Missing fields";
        password.style.borderColor = "red";
    }
    else {
        let hashed_pwd = md5(password.value);

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            let response = JSON.parse(this.responseText);
            let res = response["resp"];
            if (res != "user-not-found") {
                window.location.href = "/Projects/Website/Instagram-like-website/website/home.html?id=" + res;
            } else {
                username.style.borderColor = "red";
                password.style.borderColor = "red";
            }
        }

        xhr.open("POST", "../api/Auth/login.php");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(`username=${username.value}&pwd=${hashed_pwd}`);
    }
}


let signupRedirect = () => {
    window.location.href = "/Projects/Website/Instagram-like-website/website/signup.html";
}