"use strict";
//variables for register page
let nameFeild = document.querySelector("#nameFeild");
let userNameFeild = document.querySelector("#userNameFeild");
let passwordFeild = document.querySelector("#passwordFeild");
let inputFeildButton = document.querySelector("#inputFeildButton");

function createUser() {
  let newNameFeild = nameFeild.value;
  let newUserNameFeild = userNameFeild.value;
  let newPasswordFeild = passwordFeild.value;

  const createdUser = {
    username: `${newUserNameFeild}`,
    fullName: `${newNameFeild}`,
    password: `${newPasswordFeild}`,
  };

  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(createdUser),
  })
    .then((resopnse) => resopnse.json())
    .then((createdUser) => {
      window.location.href = "login.html";
      return createdUser;
    });
}

inputFeildButton.onclick = createUser;
