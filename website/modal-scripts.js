const uploaded_img = document.getElementById("uploaded-img");

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

function disableScrolling() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
    window.onscroll = function () { };
}

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

function charCounter() {
    const caption_input = document.getElementById("caption-input");
    const char_counter = document.getElementById("char-counter");

    char_counter.style.color = "000005";
    char_counter.innerHTML = `${caption_input.value.length}`;
}

function resetCounter() {
    const char_counter = document.getElementById("char-counter");
    char_counter.innerHTML = "0";
}