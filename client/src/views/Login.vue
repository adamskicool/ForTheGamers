<template>
  <div class="login-view">
    <div class="login">
      <h5>Log in:</h5>
      <input type="text" placeholder="Username" v-model="login_username">
      <input type="password" placeholder="Password" v-model="login_password">
      <input type="submit" value="Log in" v-on:click="login()">
      <p>{{this.login_message}}</p>
    </div>
    <div class="signup">
      <h5>Sign up:</h5>
      <input type="text" placeholder="Username" v-model="signup_username">
      <input type="text" placeholder="Email" v-model="signup_email">
      <input type="password" placeholder="Password" v-model="signup_password">
      <input type="password" placeholder="Password Again" v-model="signup_password_again">
      <input type="submit" value="Sign Up" v-on:click="signup()">
      <p>{{this.signup_message}}</p>
    </div>
  </div>
</template>

<script>
const Cookie = require("js-cookie");
export default {
  data() {
    return {
      login_username: "",
      login_password: "",
      login_message: "",
      signup_username: "",
      signup_email: "",
      signup_password: "",
      signup_password_again: "",
      signup_message: ""
    };
  },
  methods: {
    login() {
      //skicka request till servern för att logga in användaren, få tillbaka JWT.
      fetch("http://localhost:8989/api/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          username: this.login_username,
          password: this.login_password
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.success) {
            //sätt kaka med JWT.
            Cookie.set("JWT", res.JWT);
            Cookie.set("id", res.userID);
            this.$router.push("/home");
          } else {
            this.login_message = res.message;
            this.$router.push("/home");
          }
        });
    },
    signup() {
      fetch("http://localhost:8989/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.signup_username,
          email: this.signup_email,
          password: this.signup_password,
          password_again: this.signup_password_again
        })
      })
        .then(res => res.json())
        .then(res => {
          //check if the login was successfull
          this.signup_message = res.message;
          setTimeout(() => {
            this.signup_message = "";
          }, 5000);
        });
    }
  }
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login,
.signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 300px;
  margin: 20px;
  background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
}
.login:hover,
.signup:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.005);
}
</style>