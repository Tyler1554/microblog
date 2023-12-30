"use strict";
let users_list = document.querySelector("#users_list");

async function get_users() {
  const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/", {
    headers: {
      "content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhbXVtMTExIiwiaWF0IjoxNzAzODc3MzQwLCJleHAiOjE3MDM5NjM3NDB9.2LHsy07ezsYJHA9Pq8t4ahLcUW5eMmb0tFy5lFMojMs",
    },
  });
  const users = await response.json();
  for (const user of users) {
    let option = document.createElement("option");
    option.innerText = user.username;
    option.value = user.username;
    users_list.appendChild(option);
  }
}
async function get_user() {
  let user_name = users_list.value;
  const response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${user_name}`, {
    headers: {
      "content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhbXVtMTExIiwiaWF0IjoxNzAzODc3MzQwLCJleHAiOjE3MDM5NjM3NDB9.2LHsy07ezsYJHA9Pq8t4ahLcUW5eMmb0tFy5lFMojMs",
    },
  });
  const user = await response.json();

  let profile_div = document.createElement("div");
  let profile_name = document.createElement("p");
  let bio = document.createElement("p");

  bio.textContent = user.bio;
  profile_name.textContent = user.username;
  profile_div.appendChild(profile_name);
  profile_div.appendChild(bio);
  document.body.appendChild(profile_div);

  console.log(user);
  get_post()
}

async function get_post() {
  let user_post = users_list.value;
  const response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?username=${user_post}`, {
    headers: {
      "content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhbXVtMTExIiwiaWF0IjoxNzAzODc3MzQwLCJleHAiOjE3MDM5NjM3NDB9.2LHsy07ezsYJHA9Pq8t4ahLcUW5eMmb0tFy5lFMojMs",
    },
  });
  const posts = await response.json()
  for (const post of posts) {
    console.log(post);
  }
}

users_list.onchange = get_user;
window.onload = get_users;
