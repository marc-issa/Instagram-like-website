const overlay = document.getElementById("overlay");

function viewPost() {
    console.log("opening")
    const modal = document.getElementById("modal");
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closePost() {
    const modal = document.getElementById("modal");
    modal.classList.remove('active')
    overlay.classList.remove('active')
}