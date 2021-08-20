let username = document.getElementById("username");
let password = document.getElementById("password");

window.onload = () => {
  document.getElementById("logout").style.display = "none";
  if (sessionStorage.getItem("token")) {
    document.getElementById("login-div").style.display = "none";
    document.getElementById("logout").style.display = "block";
  }
  document.getElementById("log-in").onclick = signIn;
  document.getElementById("logout").onclick = signout;
};

async function signIn() {
  console.log(username.value, password.value);

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      role: "regular",
    }),
  });

  let data = await response.json();
  console.log(data);
  if (data.token) {
    signinChanges(data);
  } else {
    console.log("wrong password or username");
  }
}

function signinChanges(data) {
  console.log(data);
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("username", username.value);
  document.getElementById("login-div").style.display = "none";
  document.getElementById("logout").style.display = "block";
  getProfile();
}

function signout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
  document.getElementById("login-div").style.display = "block";
  document.getElementById("logout").style.display = "none";
  password.value = "";
}

async function getProfile() {
  let currentUsername = sessionStorage.getItem("username");
  const response = await fetch(
    `http://localhost:3000/users/${currentUsername}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + sessionStorage.getItem("token"),
      },
    }
  );
  const data = await response.json();
  console.log(data);
}
