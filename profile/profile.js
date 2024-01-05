"use strict";
let users_list = document.querySelector("#users_list");
let main_container = document.querySelector("#main_container");
let background_container = document.querySelector("#background_container");
let bio_container = document.querySelector("#bio_container");
let post_containter = document.querySelector("#post_container");
let edit_button = document.querySelector("#edit_button");
let bio_textbox = document.querySelector("#bio_textbox");
let username_textbox = document.querySelector("#username_textbox");
let password_textbox = document.querySelector("#password_textbox");
let log_in_data = getLoginData();

function timeAgo(timestamp) {
  const currentDate = new Date();
  const postDate = new Date(timestamp);
  const seconds = Math.floor((currentDate - postDate) / 1000);
  //yes i really calculated the seconds
  //help
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

async function get_user() {
  //if theres a query perameter for user name use it
  //else use login data
  let user_name = get_username();
  const response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${user_name}`, {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${log_in_data.token}`,
    },
  });
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

function get_username() {
  let params = new URLSearchParams(window.location.search);

  let user_name = log_in_data.username;
  if (params.has("username")) {
    user_name = params.get("username");
  }
  return user_name;
}

async function get_post() {
  let user_name = get_username();
  const response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?username=${user_name}`, {
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

    // ian added delete button here
    let delete_button = document.createElement("button");
    delete_button.setAttribute("id", "deletePostButton");
    delete_button.innerText = "Delete";

    //ian adding so he can get the id
    post_text.value = post._id;
    let deletePostTextValue = post_text.value;
    delete_button.value = deletePostTextValue;
    post_text.textContent = post.text;
    time_stamp.textContent = timeAgo(post.createdAt);
    
    post_div.classList.add("post_box");

    post_div.appendChild(post_text);
    post_div.appendChild(time_stamp);
    post_div.appendChild(delete_button);

    const imageUrlRegex = /:\s*(.+)/;
    const match = post.text.match(imageUrlRegex);

    //ian onclick event for delete post function that has params
    delete_button.onclick = function () {
      deletePostPopup(deletePostTextValue);
    };
    yesButton.onclick = deletePost;

    if (match) {
      const imageUrl = match[1];
      const imgElement = document.createElement("img");
      imgElement.className = "post-image";
      imgElement.src = imageUrl;
      post_div.appendChild(imgElement);
    } else {
      post_text.innerText = post.text;
    }
    post_containter.appendChild(post_div);
  }
}
async function edit_user() {
  let response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${log_in_data.username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${log_in_data.token}`,
    },
    body: JSON.stringify({
      password: password_textbox.value,
      bio: bio_textbox.value,
      fullName: username_textbox.value,
    }),
  });

  const edit = await response.json();
  console.log(edit);
}

edit_button.onclick = edit_user;
get_user();
// window.onload = get_users;
