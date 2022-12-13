let last_index = -1;
function activateRoom(index) {
    let active_room = document.querySelectorAll('.room-item')[index];
    let last_room = document.querySelectorAll('.room-item')[last_index];
    let chat = document.getElementById('chat');

    active_room.classList.add("active-room")
    chat.classList.add("active-chat")

    if (last_room != undefined) {
        last_room.classList.remove("active-room");
    }

    last_index = index;
}