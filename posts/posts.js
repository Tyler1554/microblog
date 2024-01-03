"use strict";

const postCard = document.querySelector(".post-card");
const loginData = getLoginData();

function timeAgo(timestamp) {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((currentDate - postDate) / 1000);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(seconds / 31536000);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}
function loadPosts() {
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let post of data) {
        let jsCard = document.createElement("div");
        jsCard.className = "user-post";

        let userName = document.createElement("h3");
        userName.innerText = post.username;
        userName.className = "username";

        let postContent = document.createElement("p");
        postContent.innerText = post.text;
        postContent.className = "post-content";

        let postTimestamp = document.createElement("span");
        postTimestamp.className = "post-timestamp";
        postTimestamp.innerText = timeAgo(post.createdAt);

        let likeButton = document.createElement("button");
        likeButton.className = "like-button";
        likeButton.innerText = "Like";
        likeButton.onclick = likePost;

        let commentButton = document.createElement("button");
        commentButton.className = "comment-button";
        commentButton.innerText = "Comment";

        jsCard.appendChild(userName);
        jsCard.appendChild(postTimestamp);
        jsCard.appendChild(postContent);
        jsCard.appendChild(likeButton);
        jsCard.appendChild(commentButton);
        postCard.appendChild(jsCard);
      }
    });
}

function likePost() {
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify({ postId: "65943a025cbe66285d126e98" }),
  })
    .then((response) => response.json())
    .then((data) => alert("Message Liked"));
}

let logoutButton1 = document.querySelector("#logOut1");

function logout1() {
  const loginData = getLoginData();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      window.localStorage.removeItem("login-data");
      window.location.assign("/");
    });
}

logoutButton1.onclick = logout1;
loadPosts();
