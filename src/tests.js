const fetch = require("node-fetch");
const stateShape = {
  auth: {
    isAuthenticated: false,
    isFetching: false
  },
  user: null
};

fetch("https://conduit.productionready.io/api/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    user: { email: "piiiiq@gmail.com", password: "1231231231" }
  })
})
  .then(response => response.json())
  .catch(e => console.log(e));
