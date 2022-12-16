if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

let last_index = -1;

const getMessages = async (id) => {
    const resp = await axios.get(`http://127.0.0.1:8000/api/v0.1/chat/messages/get/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            return res.data.messages
        }).catch(err => console.log(err))
    return resp
}

function activateRoom(id) {
    const send_bt = document.getElementById("send-bt")
    send_bt.setAttribute("onclick", `send(${id})`)
    getCurrUser().then(res => {
        let curr_user = res
        getRoom(id).then(res => {
            let room = res
            let user = room["user2_id"];

            if (curr_user["id"] == room["user2_id"]) {
                user = room["user1_id"]
            }

            getUser(user).then(res => {
                let user = res
                const username = document.getElementById("chat-header-text")
                const profile = document.getElementById("chat-profile-pic")

                username.innerHTML = user["username"]
                profile.src = user["profile_img"];

                if (user["profile_img"] == "empty") {
                    profile.src = "../../images/no-profile.png"
                }

                const chat_content = document.getElementById("chat-content-display");

                getMessages(id).then(res => {
                    let messages = res;

                    let active_room = document.getElementById(`${id}`)
                    let last_room = document.getElementById(`${last_index}`);
                    let chat = document.getElementById('chat');

                    active_room.classList.add("active-room")

                    if (last_room != undefined) {
                        last_room.classList.remove("active-room");
                        chat.classList.remove("active-chat")
                        chat_content.innerHTML = "";
                    }

                    for (let i = messages.length - 1; i >= 0; i--) {
                        let message = document.createElement("div")
                        message.classList.add("message")
                        message.classList.add("black-mess")

                        if (messages[i]["sender_id"] == curr_user["id"]) {
                            message.classList.add("user-sent")
                        }

                        message.innerHTML = messages[i]["message"]
                        chat_content.appendChild(message);
                    }



                    chat.classList.add("active-chat")
                    last_index = id;
                })
            })
        })
    })

}

getCurrUser().then(res => {
    let username = document.getElementById("header-username");
    username.innerHTML = res["username"]
})

const getRooms = async () => {
    const resp = await axios.get('http://127.0.0.1:8000/api/v0.1/chat/', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            return res.data.room
        })
        .catch(err => console.log(err))
    return resp
}

const getRoom = async (id) => {
    let args = new FormData();
    args.append("room_id", id)

    const resp = await axios.post('http://127.0.0.1:8000/api/v0.1/chat/getRoom', args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            return res.data.room
        })
        .catch(err => console.log(err))
    return resp
}

getRooms().then(res => {
    let rooms = res;
    getCurrUser().then(res => {
        let user = res
        const rooms_list = document.getElementById("rooms-list")
        for (let i = 0; i < rooms.length; i++) {
            let room_item = document.createElement("div");
            room_item.classList.add("room-item");
            room_item.setAttribute("onclick", `activateRoom(${rooms[i]["id"]})`)
            room_item.setAttribute("id", `${rooms[i]["id"]}`)

            let user_id = rooms[i]["user1_id"];

            if (user_id = user["id"]) {
                user_id = rooms[i]["user2_id"];
            }

            getUser(user_id).then(res => {
                let user_profile = res["profile_img"];
                let username = res["username"]

                if (user_profile == "empty") {
                    user_profile = "../../images/no-profile.png"
                }

                room_item.innerHTML = `
                    <div class="user-profile-pic">
                        <img src=${user_profile} class="room-profile-pic" alt="">
                    </div>
                    <div class="room-info">
                        <div class="user-fullname">
                            ${username}
                        </div>
                    </div>
                    `
                rooms_list.append(room_item)
            })
        }
    })
})
const send = ($id) => {
    console.log("sending")
    let args = new FormData();
    args.append("room_id", $id)
    let message = document.getElementById("chat-input-field");
    args.append("message", message.value)

    axios.post(`http://127.0.0.1:8000/api/v0.1/chat/messages/add`, args, { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            console.log(res)
        }).catch(err => console.log(err))

} 