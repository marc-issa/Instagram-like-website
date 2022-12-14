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


    modal.classList.remove('active');
    storie_modal.classList.remove('active')
    post_modal.classList.remove('active');


    modal.classList.remove('post');
    modal.classList.remove('storie');
    modal.classList.remove('notif');


    enableScrolling();
}

function disableScrolling() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}

function enableScrolling() {
    window.onscroll = function () { };
}