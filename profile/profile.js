"use strict";
let users_list = document.querySelector("#users_list");
let main_container = document.querySelector("#main_container");
let background_container = document.querySelector("#background_container");
let bio_container = document.querySelector("#bio_container");
let log_in_data = getLoginData();

async function get_user() {
  const response = await fetch(
    `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${log_in_data.username}`,
    {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${log_in_data.token}`,
      },
    }
  );
  const user = await response.json();

  let profile_div = document.createElement("div");
  let profile_name = document.createElement("p");
  let bio = document.createElement("p");

  bio.textContent = user.bio;
  profile_name.textContent = user.username;
  profile_div.appendChild(profile_name);
  bio_container.appendChild(bio);
  background_container.appendChild(profile_div);
  console.log(user);
  get_post();
}

async function get_post() {
  let user_post = log_in_data.username;
  const response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?username=${user_post}`, {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${log_in_data.token}`,
    },
  });
  const posts = await response.json();
  for (const post of posts) {
    let post_div = document.createElement("div");
    let post_text = document.createElement("p");
    let time_stamp = document.createElement("p");

    post_text.textContent = post.text;
    time_stamp.textContent = post.createdAt;

    post_div.appendChild(post_text);
    post_div.appendChild(time_stamp);
    document.body.appendChild(post_div);

    console.log(post);
  }
}

get_user();
// window.onload = get_users;
