

/* ****************************** */
/*          Change Display        */
/* ****************************** */

/* Default option and display */
const edit_profile = document.getElementById("edit-profile");
const profile_display = document.getElementById("profile-display");

const change_password = document.getElementById("change-password")
const change_display = document.getElementById("change-display")

edit_profile.classList.add('active-option')
profile_display.classList.add('active-display')

function changeContent(num) {
    console.log(num)
    if (num == 0) {
        edit_profile.classList.add('active-option')
        profile_display.classList.add('active-display')

        change_password.classList.remove('active-option')
        change_display.classList.remove('active-display')
    } else {
        change_password.classList.add('active-option')
        change_display.classList.add('active-display')

        edit_profile.classList.remove('active-option')
        profile_display.classList.remove('active-display')
    }
}

/* ****************************** */
/*           Delete Modal         */
/* ****************************** */

function deleteAccount() {
    const modal = document.getElementById("modal");
    const del_modal = document.getElementById("modal-delete");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.add('active');
    modal.classList.add('delete');
    del_modal.classList.add('active');

    bt_link.classList.add("deactivate-bt")

    disableScrolling();
}

function closeDelete() {
    const modal = document.getElementById("modal");
    const del_modal = document.getElementById("modal-delete");
    const bt_link = document.getElementById("close-bt-link")

    modal.classList.remove('active');
    modal.classList.remove('delete');
    del_modal.classList.remove('active');

    bt_link.classList.remove("deactivate-bt")

    disableScrolling();
}

// disable scrolling
function disableScrolling() {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
}