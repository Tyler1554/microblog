"use strict";

const postCard = document.querySelector(".post-card");
const loginData = getLoginData();

//time stamp
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

//load posts
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

        let userName = document.createElement("a");
        userName.innerText = post.username;
        userName.className = "username";
        userName.href = `../profile/profile.html?username=${post.username}`;

        let postContent = document.createElement("p");
        postContent.innerText = post.text;
        postContent.className = "post-content";
        postContent.value = post._id;
        let postLikeIds = post.likes;

        let postTimestamp = document.createElement("span");
        postTimestamp.className = "post-timestamp";
        postTimestamp.innerText = timeAgo(post.createdAt);

        let likeButton = document.createElement("button");
        likeButton.className = "like-button";
        likeButton.innerText = "Like";
        likeButton.onclick = function () {
          likePost(postContent);
        };

        let dislikeButton = document.createElement("button");
        dislikeButton.className = "dislike-button";
        dislikeButton.innerText = "Un-Like";
        dislikeButton.onclick = function () {
          unlikePost(postLikeIds);
        };

        jsCard.appendChild(userName);
        jsCard.appendChild(postTimestamp);

        const imageUrlRegex = /:\s*(.+)/;
        const match = post.text.match(imageUrlRegex);

        if (match) {
          const imageUrl = match[1];
          const imgElement = document.createElement("img");
          imgElement.className = "post-image";
          imgElement.src = imageUrl;
          jsCard.appendChild(imgElement);
        } else {
          postContent.innerText = post.text;
        }

        jsCard.appendChild(postContent);
        jsCard.appendChild(likeButton);
        jsCard.appendChild(dislikeButton);
        postCard.appendChild(jsCard);
      }
    });
}

//like post
function likePost(postContent) {
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: postContent.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Message Liked");
    })
    .catch((error) => {
      alert("Failed to like the message. Please try again.");
      
    });
}

//unlike post
function unlikePost(postLikeIds) {
  for (let id of postLikeIds){
    let likeId = id._id;
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes/${likeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Message Un-Liked");
      
    });
  }
  
}

//log out function
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
