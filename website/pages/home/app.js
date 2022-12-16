if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

function isTyping() {
    post_bt.href = '#';
    post_bt.style.color = "#0095f6";
}