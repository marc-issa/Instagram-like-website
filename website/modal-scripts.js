//**********************************
//     Modal Design Controls
//**********************************
function viewPost() {
    const modal = document.getElementById("modal");
    const post_modal = document.getElementById("modal-post");

    modal.classList.add('active');
    modal.classList.add('post');
    post_modal.classList.add('active');

    disableScrolling();
}

function viewStorie() {
    const modal = document.getElementById("modal");
    const storie_modal = document.getElementById("modal-storie");

    modal.classList.add('active');
    modal.classList.add('storie');
    storie_modal.classList.add('active')

    disableScrolling();
}

function viewAdd() {
    const modal = document.getElementById("modal");
    const upload_modal = document.getElementById("modal-add");

    modal.classList.add('active');
    modal.classList.add('add');
    upload_modal.classList.add('active')

    disableScrolling();
}

function viewNotif() {
    const modal = document.getElementById("modal");
    const notif_modal = document.getElementById("modal-notif");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.add('active');
    modal.classList.add('notif');

    notif_modal.classList.add('active')

    bt_link.classList.add("deactivate-bt")

    disableScrolling();
}

function closeNotif() {
    const modal = document.getElementById("modal");
    const notif_modal = document.getElementById("modal-notif");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.remove('active');
    notif_modal.classList.remove('active');

    modal.classList.remove('notif');
    bt_link.classList.remove("deactivate-bt")

    enableScrolling();

}

function closeModal() {
    const modal = document.getElementById("modal");
    const post_modal = document.getElementById("modal-post");
    const storie_modal = document.getElementById("modal-storie");
    const upload_modal = document.getElementById("modal-add");
    const caption_input = document.getElementById("caption-input");

    caption_input.value = "";


    modal.classList.remove('active');
    storie_modal.classList.remove('active')
    post_modal.classList.remove('active');
    upload_modal.classList.remove('active')


    modal.classList.remove('post');
    modal.classList.remove('storie');
    modal.classList.remove('notif');
    modal.classList.remove('add');


    enableScrolling();
    deleteImg();
    resetCounter();
}

// disable/enable scrolling
function disableScrolling() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
    window.onscroll = function () { };
}

// Image uploading and deleting in Add Modal
function addUploadedImg() {
    let reader = new FileReader()

    const uploaded_img = document.getElementById("uploaded-img");
    const img_input = document.getElementById("uploaded-img-input");
    const sec_footer = document.getElementById("upload-sec-footer");
    const delete_icon = document.getElementById("delete-icon")
    const share_bt = document.getElementById("share-bt")

    uploaded_img.classList.add("active");
    delete_icon.classList.add("active");
    share_bt.classList.add("active");

    reader.readAsDataURL(img_input.files[0]);

    reader.addEventListener("load", function () {
        localStorage.setItem("uploaded-img", reader.result);
        uploaded_img.src = localStorage.getItem("uploaded-img");
    })

    sec_footer.classList.add("deactivate-upload-footer")

}

function deleteImg() {
    const uploaded_img = document.getElementById("uploaded-img");
    const sec_footer = document.getElementById("upload-sec-footer");
    const delete_icon = document.getElementById("delete-icon")
    const share_bt = document.getElementById("share-bt")

    uploaded_img.classList.remove("active");
    delete_icon.classList.remove("active");
    share_bt.classList.remove("active");

    localStorage.removeItem("uploaded-img")
    uploaded_img.src = "";

    sec_footer.classList.remove("deactivate-upload-footer")
}

// Caption Charachters counter
function charCounter(input_id, display_id, num) {
    const input = document.getElementById(input_id);
    const counter_display = document.getElementById(display_id);

    let str_len = input.value.length;

    if (str_len > num) {
        counter_display.style.color = "red";
    } else {
        counter_display.style.color = "#000005";
    }
    counter_display.innerHTML = `${str_len}/${num}`;
}

function resetCounter() {
    const char_counter = document.getElementById("char-counter");
    char_counter.innerHTML = "0";
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("bio");
    localStorage.removeItem("gender");
    localStorage.removeItem("img-change");
    localStorage.removeItem("uploaded-img");
    axios.get('http://127.0.0.1:8000/api/v0.1/user/logout', { headers: { Authorization: localStorage.getItem('token') } })
        .then(response => {
            window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
            localStorage.removeItem("token")
        })
        .catch(error => console.log(error));
}