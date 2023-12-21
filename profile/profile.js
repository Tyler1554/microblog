"use strict";

async function get_profile() {
  const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users")
  const data = await response.json();
  console.log(data);
}
get_profile();
