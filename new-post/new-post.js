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

//text box
const texBox = document.createElement("textarea");
texBox.setAttribute("id", "text-area");
texBox.setAttribute("maxLength", "600");

//text box span for character limit

//post button
const newButton = document.createElement("button");
newButton.innerText = "post";
newButton.setAttribute("id", "postButton");

// close button
const closeButton = document.createElement("button");

closeButton.setAttribute("id", "close");
closeButton.innerHTML = "&times;";

//text for post popup

const popText = document.createElement("h1");
popText.innerText = "whats on your mind?";

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

//popup for new post
function newPost() {
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
  divContent.appendChild(newButton);
  // all the divcontent appended to the div itself
  div.appendChild(divContent);
  // the div appended to the body of the page
  document.body.appendChild(div);
}

//closing the popup
function closeTheWindow() {
  div.style.display = "none";
}
// calling it all
// allows the user to close the window
closeButton.onclick = closeTheWindow;
//allows the user to post there new post
newButton.onclick = grabData;
//allows the user to click button to create new post
newPostButton.onclick = newPost;
