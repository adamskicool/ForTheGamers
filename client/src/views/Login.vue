<template>
  <div class="login-view">
    <h2 class="logo bounce-top">CLANDOO</h2>
    <div class="description">
      <p>The premier client for meeting new gamers and handling gaming clans!</p>
    </div>
    <div class="login-options">
      <div class="login">
        <h5 id="title">Log in:</h5>
        <input type="text" placeholder="Username" v-model="login_username" />
        <input type="password" placeholder="Password" v-model="login_password" />
        <input type="submit" value="Log in" v-on:click="login()" />
        <!-- <div class="g-signin2"></div> -->
        <p>or</p>
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
        >Sign in with Google</g-signin-button>
        <p>{{this.login_message}}</p>
      </div>
      <div class="signup">
        <h5 id="title">Create account:</h5>
        <input type="text" placeholder="Username" v-model="signup_username" />
        <input type="text" placeholder="Email" v-model="signup_email" />
        <input type="password" placeholder="Password" v-model="signup_password" />
        <input type="password" placeholder="Password again" v-model="signup_password_again" />
        <input type="submit" value="Sign Up" v-on:click="signup()" />
        <p>{{this.signup_message}}</p>
      </div>
    </div>
    <div class="maker">
      <p>Made by Adam Torkkeli-Johansson, Bachelors degree in Computer Science from the Royal Insitute of Technology in STHLM</p>
    </div>
  </div>
</template>

<script>
const Cookie = require("js-cookie");
import env_variables from "../environment_variables.json";
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
      signup_message: "",
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          "79062734287-32i8arjsfst75ska23bsq7kr9mps2mgf.apps.googleusercontent.com"
      }
    };
  },
  // mounted() {
  //   console.log("Mounting google button");
  //   gapi.signin2.render("google-signin-button", {
  //     onsuccess: this.onSignIn
  //   });
  // },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // const profile = googleUser.getBasicProfile(); // etc etc
      // console.log(profile.getImageUrl());
      // this.$router.push("/home");

      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token);
      fetch(env_variables.BASE_URL + "googleSignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_token: id_token })
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
            //sätt kaka med JWT.
            Cookie.set("JWT", res.JWT);
            Cookie.set("id", res.userID);
            let json = {
              userid: Cookie.get("id")
            };
            this.$socket.emit("USER_LOGGED_IN", JSON.stringify(json));
            this.$router.push("/home");
          } else {
            this.login_message = res.message;
          }
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
    login() {
      //skicka request till servern för att logga in användaren, få tillbaka JWT.
      fetch(env_variables.BASE_URL + "login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          username: this.login_username,
          password: this.login_password
        }
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res);
          if (res.success) {
            //sätt kaka med JWT.
            Cookie.set("JWT", res.JWT);
            Cookie.set("id", res.userID);
            let json = {
              userid: Cookie.get("id")
            };
            this.$socket.emit("USER_LOGGED_IN", JSON.stringify(json));
            this.$router.push("/home");
          } else {
            this.login_message = res.message;
          }
        });
    },
    signup() {
      fetch(env_variables.BASE_URL + "signup", {
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
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  height: 25px;
  width: 70%;
}
.g-signin-button:hover {
  cursor: pointer;
}
.login-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  overflow: scroll;
}
.logo {
  font-family: "Delius swash caps", cursive;
  font-size: 50px;
}
.description,
.maker {
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.maker > p {
  font-size: 12px;
  color: grey;
}
.login-options {
  display: flex;
}
.login,
.signup {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 250px;
  margin: 20px;
  background-color: rgb(255, 255, 255);
  border: rgb(221, 223, 226) solid 1px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
  opacity: 1;
  z-index: 10;
}
.login:hover,
.signup:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: scale(1.005);
}
#title {
  z-index: 10;
}
input[type="text"],
input[type="password"],
input[type="submit"] {
  width: 70%;
  height: auto;
  border: none;
  outline: none;
  font-size: 14px;
  margin: 6px;
  border-radius: 3px;
  z-index: 10;
  background-color: rgba(230, 230, 230, 0.3);
  transition: all ease 300ms;
}
input[type="submit"]:focus {
  background-color: rgba(50, 50, 50, 0.9);
  color: white;
}

.bounce-top {
  -webkit-animation: bounce-top 0.9s both;
  animation: bounce-top 0.9s both;
}

@keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
    transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
    transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}

@media only screen and (max-width: 600px) {
  .login-options {
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
}
</style>