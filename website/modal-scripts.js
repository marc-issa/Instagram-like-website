function viewPost() {
    const modal = document.getElementById("modal");
    const post_modal = document.getElementById("modal-post");
    modal.classList.add('active')
    modal.classList.add('post')
    post_modal.classList.add('active')
}

function closePost() {
    const modal = document.getElementById("modal");
    const post_modal = document.getElementById("modal-post");
    modal.classList.remove('active')
    modal.classList.remove('post')
    post_modal.classList.remove('active')
}

function viewStorie() {

}