let params = window.location.search.split('?')[1];
let id = params.split("=")[1];

let addPost = () => {
    let image = document.getElementById("image");
    let cap = document.getElementById("caption");

    let img_path = `images/${image.files[0].name}`

    let data = new FormData();
    data.append("id", id);
    data.append("img_path", img_path);
    data.append("cap", cap.value);

    fetch(`http://localhost/Projects/Website/Instagram-like-website/api/posts/add_post.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: data,
    }).then(response => response.text())
        .then(text => { })

    let img = new FormData();
    img.append("image", image.files[0]);

    fetch(`http://localhost/Projects/Website/Instagram-like-website/api/uploads/img_upload.php`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: img,
    }).then(response => response.text())
        .then(text => { console.log(text) })
}

let homeRedirect = () => {
    window.location.href = `/Projects/Website/Instagram-like-website/website/home.html?id=${id}`;
}