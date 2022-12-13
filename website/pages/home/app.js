let post_bt = document.getElementById("comment-post-bt");
post_bt.href = 'javascript:void(0)';

function isTyping() {
    post_bt.href = '#';
    post_bt.style.color = "#0095f6";
}