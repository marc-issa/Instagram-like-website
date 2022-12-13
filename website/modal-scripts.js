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

function closeModal() {
    const modal = document.getElementById("modal");
    const post_modal = document.getElementById("modal-post");
    const storie_modal = document.getElementById("modal-storie");

    modal.classList.remove('active');
    modal.classList.remove('post');
    modal.classList.remove('storie');
    storie_modal.classList.remove('active')
    post_modal.classList.remove('active');

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