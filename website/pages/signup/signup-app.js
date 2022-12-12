let signup_form = document.getElementById("signup-form");
let h5 = document.createElement("h5");
h5.style.color = "red";
signup_form.appendChild(h5);

let handleSignup = () => {
    let username = document.getElementById("username-input-box");
    let fname = document.getElementById("fname-input-box");
    let lname = document.getElementById("lname-input-box");
    let email = document.getElementById("email-input-box")
    let password = document.getElementById("password-input-box");

    h5.textContent = "";
    username.style.borderColor = "#DEE2E6";
    email.style.borderColor = "#DEE2E6";
    password.style.borderColor = "#DEE2E6";
    fname.style.borderColor = "#DEE2E6";
    lname.style.borderColor = "#DEE2E6";


    if (username.value == "") {
        username.style.borderColor = "red";
        h5.textContent = "Missing fields";
    }
    else if (fname.value == "") {
        fname.style.borderColor = "red";
        h5.textContent = "Missing fields";
    }
    else if (lname.value == "") {
        lname.style.borderColor = "red";
        h5.textContent = "Missing fields";
    }
    else if (email.value == "") {
        email.style.borderColor = "red";
        h5.textContent = "Missing fields";
    }
    else if (password.value == "") {
        password.style.borderColor = "red";
        h5.textContent = "Missing fields";
    }
    else {
        let hashed_pwd = md5(password.value);

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            let response = JSON.parse(this.responseText);
            let res = response["resp"];

            if (res == "username-found") {
                username.style.borderColor = "red";
                h5.textContent = "Username already exists";
            }
            else if (res == "email-found") {
                email.style.borderColor = "red";
                h5.textContent = "Email already exists";
            }
            else {
                console.log(res);
            }
        }

        xhr.open("POST", "../api/Auth/signup.php");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(`username=${username.value}&pwd=${hashed_pwd}&first_name=${fname.value}&last_name=${lname.value}&email=${email.value}`);
    }
}

let loginRedirect = () => {
    window.location.href = "/Projects/Website/Instagram-like-website/website/";
}