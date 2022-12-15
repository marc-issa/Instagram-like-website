if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

let last_index = -1;
function activateRoom(index) {
    let active_room = document.querySelectorAll('.room-item')[index];
    let last_room = document.querySelectorAll('.room-item')[last_index];
    let chat = document.getElementById('chat');

    active_room.classList.add("active-room")

    if (last_room != undefined) {
        last_room.classList.remove("active-room");
        chat.classList.remove("active-chat")
    }

    chat.classList.add("active-chat")
    last_index = index;
}