let handleSubmit = () => {
    let username = document.getElementById("username-input-box");
    let fname = document.getElementById("fname-input-box");
    let lname = document.getElementById("lname-input-box");
    let email = document.getElementById("email-input-box")
    let password = document.getElementById("password-input-box");

    let hashed_pwd = md5(password.value);

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        let h5 = document.createElement("h5");
        h5.style.color = "red";
        login_form.appendChild(h5);

        let response = JSON.parse(this.responseText);
        let res = response["resp"];

        if (res == "username-found") {
            username.style.borderColor = "red";
            h5.textContent = "Username already exists";
        }
        else if (res == "email-found") {
            h5.textContent = "Email already exists";
        }
        else {
            console.log("User added!")
        }
    }

    xhr.open("POST", "../api/Auth/login.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`username=${username.value}&pwd=${hashed_pwd}&first_name=${fname}&last_name=${lname}&email=${email}`);
}

let loginRedirect = () => {
    window.location.href = "/Projects/Website/Instagram-like-website/website/";
}