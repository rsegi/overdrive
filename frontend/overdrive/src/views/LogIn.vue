<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Log in</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Email</label>
                        <div class="control">
                            <input type="email" class="input" v-model="email">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Log in</button>
                        </div>
                    </div>

                    <hr>

                    Or <router-link to="/sign-up">click here</router-link> to sign up!
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import authenticationService from "@/services/authenticationService";
import { defineComponent } from "vue";
// import axios from "axios";

interface Data {
   email: string,
   password: string,
   errors: string[]
}

export default defineComponent({
  name: 'LogIn',
  data(): Data { 
    return {
     email: '',
     password: '',
     errors: []
    }
  },
  mounted() {
    document.title = 'Log In | Overdrive';
  },
  methods: {
    submitForm() {
     const formData = {
        email: this.email,
        password: this.password,
      }

      authenticationService.logIn(formData).then(() => {
        this.$store.commit('setAuthentication');
        const toPath = this.$route.query.to || '/cart';
        this.$router.push(toPath as string);
      })
      .catch(error => {
          if (error.response) {
              for (const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`);
              }
          } else {
              this.errors.push('Something went wrong. Please try again');
              
              console.log(JSON.stringify(error));
          }
      })
    }
  },
});
</script>