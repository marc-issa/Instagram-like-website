// if (localStorage.getItem("token") == null) {
//     window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
// }

let post_bt = document.getElementById("comment-post-bt");
post_bt.href = 'javascript:void(0)';

function isTyping() {
    post_bt.href = '#';
    post_bt.style.color = "#0095f6";
}