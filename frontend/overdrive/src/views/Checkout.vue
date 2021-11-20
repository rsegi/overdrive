<template>
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Checkout</h1>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                        >
                            <td>{{ item.product.name }}</td>
                            <td>${{ item.product.price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>${{ getItemTotal(item).toFixed(2) }}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="2">Total</td>
                            <td>{{ cartTotalLength }}</td>
                            <td>${{ cartTotalPrice.toFixed(2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="column is-12 box">
                <h2 class="subtitle">Shipping details</h2>

                <p class="has-text-grey mb-4">* All fields are required</p>

                <div class="columns is-multiline">
                    <div class="column is-6">
                        <div class="field">
                            <label>First name*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="first_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>Last name*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="last_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>E-mail*</label>
                            <div class="control">
                                <input type="email" class="input" v-model="email">
                            </div>
                        </div>

                        <div class="field">
                            <label>Phone*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="phone">
                            </div>
                        </div>
                    </div>

                    <div class="column is-6">
                        <div class="field">
                            <label>Address*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="address">
                            </div>
                        </div>

                        <div class="field">
                            <label>Zip code*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="zipcode">
                            </div>
                        </div>

                        <div class="field">
                            <label>Place*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="place">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="notification is-danger mt-4" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <hr>

                <div id="card-element" class="mb-5"></div>

                <template v-if="cartTotalLength">
                    <hr>

                    <button class="button is-dark" @click="submitForm">Pay with Stripe</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ICartItem } from "@/models/cartItem";
import { defineComponent } from "vue";

interface Data {
   cart: {
     items: ICartItem[];
   }
   firstName: string;
   lastName: string;
   email: string;
   address: string;
   city: string;
   postalCode: string;
   country: string;
   errors: string[]

}

export default defineComponent({
  name: 'Checkout',
  data(): Data { 
    return {
     cart: {
      items: []
      },
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      errors: [],
    }
  },
  mounted() {
    document.title = 'Checkout | Overdrive';

    this.cart = this.$store.state.cart;
  },
  methods: {
    getItemTotal(item: ICartItem) {
          return item.quantity * item.product.price
      },

    submitForm() {
      this.errors = [];

      if (this.firstName === '') {
          this.errors.push('The first name field is missing!')
      }
      if (this.lastName === '') {
          this.errors.push('The last name field is missing!')
      }
      if (this.email === '') {
          this.errors.push('The email field is missing!')
      }
      if (this.address === '') {
          this.errors.push('The address field is missing!')
      }
      if (this.city === '') {
          this.errors.push('The city field is missing!')
      }
      if (this.postalCode === '') {
          this.errors.push('The postal code field is missing!')
      }
      if (this.country === '') {
          this.errors.push('The country field is missing!')
      } 

      // if (!this.errors.length) {
      //     this.$store.commit('setIsLoading', true);
      //     this.stripe.createToken(this.card).then(result => {                    
      //         if (result.error) {
      //             this.$store.commit('setIsLoading', false)
      //             this.errors.push('Something went wrong with Stripe. Please try again')
      //             console.log(result.error.message)
      //         } else {
      //             this.stripeTokenHandler(result.token)
      //         }
      //     })
      // }
    }
  },
});
</script>