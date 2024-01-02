"use strict";
let users_list = document.querySelector("#users_list");




// async function get_users() {
  
//   const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/", {
//     headers: {
//       "content-Type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhbXVtMTExIiwiaWF0IjoxNzA0MTU0MDIyLCJleHAiOjE3MDQyNDA0MjJ9.t03n-mULgLuxTRdY4SkgAkATCqVHhEVI1H7Am3FQ7L4",
//     },
//   });
//   const users = await response.json();
//   for (const user of users) {
//     let option = document.createElement("option");
//     option.innerText = user.username;
//     option.value = user.username;
//     users_list.appendChild(option);
//   }
// }
async function get_user() {
  let log_in_data = getloginData();
  const response = await fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${log_in_data.username}`, {
    headers: {
      "content-Type": "application/json",
      Authorization:
        `Bearer ${log_in_data.token}`,
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhbXVtMTExIiwiaWF0IjoxNzA0MTU0MDIyLCJleHAiOjE3MDQyNDA0MjJ9.t03n-mULgLuxTRdY4SkgAkATCqVHhEVI1H7Am3FQ7L4",
    },
  });
  const posts = await response.json()
  for (const post of posts) {
    let post_div = document.createElement("div")
    let post_text = document.createElement("p")
    let time_stamp = document.createElement("p")

    post_text.textContent = post.text
    time_stamp.textContent = post.createdAt

    post_div.appendChild(post_text)
    post_div.appendChild(time_stamp)
    document.body.appendChild(post_div)

    console.log(post)

  }
}

 get_user();
// window.onload = get_users;
