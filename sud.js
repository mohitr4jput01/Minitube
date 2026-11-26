
const videos = [
    {
        title: "Lofi Music Live",
        channel: "Music World",
        category: "Music",
        id: "jfKfPfyJRdk"
    },
    {
        title: "HTML CSS Tutorial",
        channel: "Code Academy",
        category: "Education",
        id: "qz0aGYrrlhU"
    },
    {
        title: "JavaScript Full Course",
        channel: "Programming Hub",
        category: "Education",
        id: "PkZNo7MFNFg"
    },
    {
        title: "Gaming Video",
        channel: "Gaming World",
        category: "Gaming",
        id: "aqz-KE-bpKQ"
    },
    {
        title: "Technology Video",
        channel: "Tech Channel",
        category: "Technology",
        id: "M7lc1UVf-VE"
    },
    {
        title: "Popular Music",
        channel: "Music Studio",
        category: "Music",
        id: "kJQP7kiw5Fk"
    }
];

let liked = JSON.parse(
    localStorage.getItem("minitubeLikes") || "[]"
);

const videosContainer = document.getElementById("videos");

function displayVideos(list) {
    videosContainer.innerHTML = "";

    document.getElementById("empty").textContent =
        list.length ? "" : "No videos found!";

    list.forEach(video => {
        const div = document.createElement("div");
        div.className = "video";

        const image = document.createElement("img");
        image.src =
            `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        image.alt = video.title;

        const title = document.createElement("h3");
        title.textContent = video.title;

        const channel = document.createElement("p");
        channel.textContent = video.channel;

        const category = document.createElement("p");
        category.textContent = video.category;

        const play = document.createElement("button");
        play.textContent = "▶ Play";
        play.onclick = () => playVideo(video);

        const like = document.createElement("button");
        like.textContent = liked.includes(video.id)
            ? "❤️ Liked"
            : "♡ Like";

        like.onclick = () => toggleLike(video.id);

        div.append(
            image, title, channel, category, play, like
        );

        div.onclick = event => {
            if (event.target.tagName !== "BUTTON") {
                playVideo(video);
            }
        };

        videosContainer.appendChild(div);
    });
}

function playVideo(video) {
    document.getElementById("player").style.display = "block";

    document.getElementById("videoFrame").src =
        `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`;

    document.getElementById("videoTitle").textContent =
        video.title;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function searchVideos() {
    const query = document
        .getElementById("search")
        .value.toLowerCase();

    const result = videos.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query)
    );

    displayVideos(result);
}

function filterVideos(category) {
    const result = videos.filter(
        video => video.category === category
    );

    displayVideos(result);
}

function showAll() {
    document.getElementById("search").value = "";
    displayVideos(videos);
}

function toggleLike(id) {
    if (liked.includes(id)) {
        liked = liked.filter(item => item !== id);
    } else {
        liked.push(id);
    }

    localStorage.setItem(
        "minitubeLikes",
        JSON.stringify(liked)
    );

    displayVideos(videos);
}

function showLiked() {
    const result = videos.filter(
        video => liked.includes(video.id)
    );

    displayVideos(result);
}

document.getElementById("search").addEventListener(
    "keydown",
    event => {
        if (event.key === "Enter") searchVideos();
    }
);

displayVideos(videos);
