<template>
  <div class="page-register">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>First name</label>
            <div class="control">
              <input type="text" class="input" v-model="firstName" />
            </div>
          </div>

          <div class="field">
            <label>Last name</label>
            <div class="control">
              <input type="text" class="input" v-model="lastName" />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" class="input" v-model="email" />
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>

          <div class="field">
            <label>Repeat password</label>
            <div class="control">
              <input type="password" class="input" v-model="password2" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>

          <hr />

          Or <router-link to="/log-in">click here</router-link> to log in!
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import authenticationService from "@/services/authenticationService";
import { defineComponent } from "vue";
import { toast } from "bulma-toast";

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  errors: string[];
}

export default defineComponent({
  name: "Register",
  data(): Data {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Sign Up | Overdrive";
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.firstName === "") {
        this.errors.push("The first name is missing");
      }
      if (this.lastName === "") {
        this.errors.push("The last name is missing");
      }
      if (this.email === "") {
        this.errors.push("The email is missing");
      }
      if (this.password === "") {
        this.errors.push("The password is too short");
      }
      if (this.password !== this.password2) {
        this.errors.push("The passwords doesn't match");
      }

      if (!this.errors.length) {
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        };

        authenticationService
          .register(formData)
          .then(() => {
            toast({
              message: "Account created, please log in!",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });

            this.$router.push("/log-in");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }
    },
  },
});
</script>
