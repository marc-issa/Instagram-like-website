let send_bt = document.getElementById("chat-post-bt");
send_bt.href = 'javascript:void(0)';

function isTyping() {
    send_bt.href = '#';
    send_bt.style.color = "#0095f6";
}