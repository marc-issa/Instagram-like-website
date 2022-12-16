function homeRedirect() {
    clearLocalStorage()
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/home/home.html";
}

function exploreRedirect() {
    clearLocalStorage()
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/explore/explore.html";
}

function chatRedirect() {
    clearLocalStorage()
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/messages/messages.html";
}

function uploadRedirect() {
    clearLocalStorage()
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/upload/upload.html";
}

function editRedirect() {
    clearLocalStorage()
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/edit/edit.html";
}

function loginRedirect() {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

function signupRedirect() {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/signup/signup.html";
}

function clearLocalStorage() {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("bio");
    localStorage.removeItem("gender");
    localStorage.removeItem("img-change");
    localStorage.removeItem("uploaded-img");
}

/***************************/
/*      Profile Redirect   */
/***************************/

function profileRedirect(id) {
    clearLocalStorage()
    localStorage.setItem("id", id);
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/profile/profile.html";
}