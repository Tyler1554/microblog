// html const creation
const newPostButton = document.querySelector("#newPostButton");
// main div
const div = document.createElement("div");
div.classList.add("modal-js");

//div header
const divHeader = document.createElement("div");
divHeader.setAttribute("id", "divheader");

// content div
const divContent = document.createElement("div");
divContent.classList.add("modal-content-area");

// foot div
const footerDiv = document.createElement("div");
footerDiv.setAttribute("id", "footerDiv");

//text box
const texBox = document.createElement("textarea");
texBox.setAttribute("id", "text-area");
texBox.setAttribute("maxLength", "600");

//text box span for character limit

//post button
const newButton = document.createElement("button");
newButton.innerText = "Post";
newButton.setAttribute("id", "postButton");

// close button
const closeButton = document.createElement("button");

closeButton.setAttribute("id", "close");
closeButton.innerHTML = "&times;";

//text for post popup

const popText = document.createElement("h1");
popText.innerText = "Whats on your mind?";

// yes button
const yesButton = document.createElement("button");
yesButton.innerText = "yes";
yesButton.setAttribute("id", "buttonYes");

// popup text for are you sure?
const popTextDelete = document.createElement("h1");
popTextDelete.innerText = "Are you sure?";

// new div for delete
const deleteDiv = document.createElement("div");
deleteDiv.classList.add("modal-js");

// new div content for delete
const deleteDivContent = document.createElement("div");
deleteDivContent.classList.add("modal-content-delete");
// function to grab the text box stuff

function grabData() {
  const postTextData = texBox.value;
  const text = {
    text: `${postTextData}`,
  };
  const loginData = getLoginData();
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(text),
  })
    .then((response) => response.json())
    .then((text) => {
      return (window.location.href = "/posts/posts.html");
    });
}

// function for Delete
function deletePost(deletePostTextValue) {
  const loginDataDelete = getLoginData();
  fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${deletePostTextValue}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${loginDataDelete.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((text) => {
      return (window.location.href = "/profile/profile.html");
    });
}

//popup for new post
function newPost() {
  //deletePostPopup display none
  yesButton.style.display = "none";
  popTextDelete.style.display = "none";
  deleteDiv.style.display = "none";
  //newPost display block

  texBox.style.display = "block";
  popText.style.display = "block";
  div.style.display = "block";
  newButton.style.display = "block";
  //allows textbox to not show text on reopening
  texBox.value = "";
  //allows the modal displayed
  div.style.display = "block";
  //my header appended for the div
  divHeader.appendChild(popText);
  //all the contents in the div appended
  divContent.appendChild(closeButton);
  divContent.appendChild(divHeader);
  divContent.appendChild(texBox);
  divContent.appendChild(footerDiv);
  // footer for the button to post
  footerDiv.appendChild(newButton);
  // all the divcontent appended to the div itself
  div.appendChild(divContent);
  // the div appended to the body of the page
  document.body.appendChild(div);
}

//popup for delete post
function deletePostPopup() {
  //deletePostPopup block
  yesButton.style.display = "block";
  popTextDelete.style.display = "block";
  deleteDiv.style.display = "block";
  //newPost display none
  texBox.style.display = "none";
  popText.style.display = "none";
  div.style.display = "none";
  newButton.style.display = "none";
  //allows popup to display
  deleteDiv.style.display = "block";
  // header appended to div
  divHeader.appendChild(popTextDelete);
  //all contents in div to be appended
  deleteDivContent.appendChild(closeButton);
  deleteDivContent.appendChild(divHeader);
  deleteDivContent.appendChild(footerDiv);
  //footer for yes button
  footerDiv.appendChild(yesButton);
  //all div content appended to div
  deleteDiv.appendChild(deleteDivContent);
  // the div appended to the body
  document.body.appendChild(deleteDiv);
}

// //clear div
// function clearDiv() {
//   while (div.firstChild) {
//     div.removeChild(div.firstChild);
//   }
// }
//closing the popup
function closeTheWindow() {
  div.style.display = "none";
  deleteDiv.style.display = "none";
  parent.innerHTML = "";
}
// calling it all
// allows the user to close the window
closeButton.onclick = closeTheWindow;
//allows the user to post there new post
newButton.onclick = grabData;
//allows the user to click button to create new post
newPostButton.onclick = newPost;
// allows user to delete post
