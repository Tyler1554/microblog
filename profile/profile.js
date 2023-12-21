"use strict";
let users_list = document.querySelector("#users_list");

async function get_users() {
  const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/", {
    headers: {
      "content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlhbXVtMTExIiwiaWF0IjoxNzAzMTg3OTQxLCJleHAiOjE3MDMyNzQzNDF9.f0tFuctwdMKbDhfELuVa_tAyqOqJDq5l8vOs8DgFSc0",
    },
  });
  const users = await response.json();
  for (const user of users) {
    let option = document.createElement("option");
    option.innerText = user.username;
    users_list.appendChild(option);
  }
}
get_users();
