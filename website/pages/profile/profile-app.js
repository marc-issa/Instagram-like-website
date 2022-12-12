let params = window.location.search.split('?')[1];
let id = params.split("=")[1];

let username = document.getElementById("username");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");

let getUser = () => {
    fetch(`http://localhost/Projects/Website/Instagram-like-website/api/posts/get_user.php?id=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then(response => response.text())
        .then(text => {
            let user = JSON.parse(text);
            username.setAttribute("placeholder", user["username"]);
            fname.setAttribute("placeholder", user["first_name"]);
            lname.setAttribute("placeholder", user["last_name"]);
            email.setAttribute("placeholder", user["email"]);
        })
}

let profileChange = () => {
    let data = new FormData();
    data.append("id", id);
    if (username.value != "") {
        data.append("username", username.value);
    }
    if (fname.value != "") {
        data.append("first_name", fname.value);
    }
    if (lname.value != "") {
        data.append("last_name", lname.value);
    }
    if (email.value != "") {
        data.append("email", email.value);
    }

    fetch(`http://localhost/Projects/Website/Instagram-like-website/api/features/edit_profile.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: data,
    }).then(response => response.text())
        .then(text => { })
    window.location.reload();
}

let homeRedirect = () => {
    window.location.href = `/Projects/Website/Instagram-like-website/website/home.html?id=${id}`;
}

getUser();