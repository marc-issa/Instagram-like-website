if (localStorage.getItem("token") == null) {
    window.location.href = "http://localhost/Projects/Websites/Instagram-like-website/website/pages/login/login.html";
}

const getAllPosts = async () => {
    const posts = axios.get('http://127.0.0.1:8000/api/v0.1/post/', { headers: { Authorization: localStorage.getItem('token') } })
        .then(res => {
            return res.data
        }).catch(err => console.log(err));
    return posts
}

const searchByUsername = async (username) => {
    const resp = await axios.get(`http://127.0.0.1:8000/api/v0.1/user/search/${username}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then((result) => {
            return result.data.search;
        }).catch((err) => {
            console.log(err)
        });
    return resp;
}

function searchUser() {

    let search_input = document.getElementById("search-input")
    let search_sec = document.getElementById("search-sec");

    search_sec.classList.add("active")

    if (search_input.value == "") {
        search_sec.classList.remove("active")
    }
    search_sec.innerHTML = "";
    getCurrUser().then(res => {
        let user = res
        searchByUsername(search_input.value).then(res => {
            let results = res;
            if (results.length != 0) {
                for (let result of results) {
                    if (result["id"] != user["id"]) {
                        let result_item = document.createElement("div");
                        result_item.classList.add("result-item");
                        result_item.setAttribute("onclick", `profileRedirect(${result["id"]})`)
                        result_item.innerHTML = `${result["username"]}`;
                        search_sec.appendChild(result_item);
                    }
                }
            }
        })
    })

}

function displayAllPosts() {
    getAllPosts().then(res => {
        let posts = res[0];
        const explore_posts = document.getElementById("explore-posts");
        for (let i = posts.length - 1; i >= 0; i--) {
            console.log(posts[i]);
            let post_display = document.createElement("div")
            let post_img = document.createElement("img")
            post_display.classList.add("post-display")

            post_img.classList.add("explore-post-size")
            post_img.setAttribute("onclick", `viewPost(${posts[i]["id"]})`)
            post_img.src = posts[i]["img_url"]

            post_display.appendChild(post_img)
            explore_posts.appendChild(post_display)
        }
    })
}

displayAllPosts();

