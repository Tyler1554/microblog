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
        let jsCard = document.createElement("div");
        jsCard.className = "user-post";

        let userName = document.createElement("h3");
        userName.innerText = post.username;
        

        let postContent = document.createElement("p");
        postContent.innerText = post.text;
        postContent.className = "post-content"

        let likeButton = document.createElement("button");
        likeButton.className= "like-button";
        likeButton.innerText= "Like";

        let commentButton = document.createElement("button");
        commentButton.className= "comment-button";
        commentButton.innerText= "Comment";

        jsCard.appendChild(userName);
        jsCard.appendChild(postContent);
        jsCard.appendChild(likeButton);
        jsCard.appendChild(commentButton);
        postCard.appendChild(jsCard);
      }
    });
}

loadPosts();
