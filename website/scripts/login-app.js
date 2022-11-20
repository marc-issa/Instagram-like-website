let handleSubmit = () => {
    let username = document.getElementById("username-input-box");
    let password = document.getElementById("password-input-box");
    let login_form = document.getElementById("login-form");

    let hashed_pwd = md5(password.value);

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        let response = JSON.parse(this.responseText);
        let res = response["resp"];
        if (res != "user-not-found") {
            console.log("User Found");
        } else {
            username.style.borderColor = "red";
            password.style.borderColor = "red";

            let h5 = document.createElement("h5");
            h5.textContent = "Wrong username or password";
            h5.style.color = "red";
            login_form.appendChild(h5);
        }
    }

    xhr.open("POST", "../api/Auth/login.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`username=${username.value}&pwd=${hashed_pwd}`);
}


let signupRedirect = () => {
    window.location.href = "/Projects/Website/Instagram-like-website/website/signup.html";
}