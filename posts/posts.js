"use strict";

const postCard = document.querySelector(".post-card");
const likeButton = document.querySelector("#like-button");

function loadPosts() {
  const loginData = getLoginData();
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let post of data) {
        let userName = document.createElement("h3");
        userName.innerText = post.username;
        postCard.appendChild(userName);
        // postContent.innerText = post.text;
      }
    });
}

loadPosts();
