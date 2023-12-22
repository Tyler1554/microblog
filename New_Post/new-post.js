// grabbing the elements from the html
const postText = document.querySelector("#postText");
const postButton = document.querySelector("#postButton");

// function to grab the text box stuff

function grabData() {
  const postTextData = postText.value;
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
// calling it all
postButton.onclick = grabData;
