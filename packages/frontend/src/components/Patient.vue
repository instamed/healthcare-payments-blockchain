<template>
  <v-flex md4
          xs12
          :hidden-sm-and-down="!selected"
          class="user-card">
    <v-card :class="{'user-card-selected': selected}">
      <v-card-title primary-title
                    :class="{'user-card-waiting': ['provider', 'payer'].includes(step)}"
                    class="cyan darken-1">
        <div class="card-title-icon">
          <img src="@/assets/patient-icon.png">
        </div>
        <div>
          <span class="card-sub-title">Patient</span>
          <h3 class="card-title"
              v-if="claim && claim.first_name && claim.last_name">{{claim.first_name}} {{claim.last_name}}</h3>
          <h3 class="card-title"
              v-else>Patient Name</h3>
        </div>
      </v-card-title>
      <template v-if="saving">
        <v-card-text class="text-xs-center waiting-text">
          <v-progress-circular indeterminate
                               color="primary"></v-progress-circular><br /><br />
          Saving...

        </v-card-text>
      </template>
      <template v-else-if="error">
        <v-card-text class="waiting-text">
          <v-alert :value="true"
                   type="error">
            <strong>Error</strong><br />
            {{error}}
          </v-alert>

        </v-card-text>
      </template>
      <template v-else-if="selected && step === 'patient'">
        <v-card-text class="text-xs-center user-card-text">
          <h2 class="card-entry-title">{{claim.first_name}} {{claim.last_name}} Pays Claim</h2>
          <v-layout class="text-xs-left">
            <v-flex xs6
                    md6>
              <p class="entry-strong">Patient Name</p>
              <p class="entry-text">{{claim.first_name}} {{claim.last_name}}</p>

            </v-flex>
            <v-flex xs6
                    md6>

              <p class="entry-strong">Date Visited</p>
              <p class="entry-text">1/2/2019</p>

            </v-flex>
          </v-layout>
          <v-layout class="text-xs-left">
            <v-flex xs12
                    md12>
              <p class="entry-strong">Services</p>
              <p class="entry-text"
                 v-for="service in claim.services">{{service.name}}</p>

            </v-flex>
          </v-layout>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-xs-center user-card-text">

          <v-layout>
            <v-flex xs12
                    class="text-xs-left total-charges-text"
                    md6>
              Amount Billed
            </v-flex>
            <v-flex xs12
                    class="text-xs-right total-charges-amount"
                    md6>
              ${{claim.total_charges}}
            </v-flex>

          </v-layout>
          <v-layout>
            <v-flex xs12
                    class="text-xs-left total-charges-text"
                    md6>
              Insurance Paid
            </v-flex>
            <v-flex xs12
                    class="text-xs-right total-charges-amount"
                    md6>
              ${{claim.total_benefit}}
            </v-flex>

          </v-layout>
          <v-layout>
            <v-flex xs12
                    class="text-xs-left total-charges-text"
                    md6>
              You Owe
            </v-flex>
            <v-flex xs12
                    class="text-xs-right total-charges-amount"
                    md6>
              ${{claim.total_responsibility}}
            </v-flex>
          </v-layout>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-xs-center user-card-text">

          <v-layout>
            <v-flex xs12
                    md12>
              <v-text-field v-model="card_name"
                            label="Name on Card"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12
                    md12>
              <v-text-field v-model="card_number"
                            mask="credit-card"
                            label="Card Number"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12
                    md4>
              <v-text-field v-model="card_month"
                            mask="##"
                            label="Exp Date"
                            :rules="[rules.required, rules.month]"></v-text-field>
            </v-flex>
            <v-flex xs12
                    md4>
              <v-text-field v-model="card_year"
                            mask="####"
                            :rules="[rules.required, rules.year]"></v-text-field>
            </v-flex>
            <v-flex xs12
                    md4>
              <v-text-field v-model="card_cvc"
                            mask="####"
                            :rules="[rules.required, rules.cvc]"
                            label="CVC"></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12
                    md12>
              <v-btn large
                     color="success cyan darken-1"
                     @click="payClaim">PAY</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </template>
      <!-- Completed State -->
      <template v-if="!selected && step !== 'paid' && !saving">
        <v-card-text class="text-xs-center waiting-text">
          Waiting for Statement...
        </v-card-text>
      </template>
      <template v-else-if="step === 'paid'">
        <v-card-text class="text-xs-center user-card-text">
          <img src="@/assets/teal-check.png">
          <h2 class="success-title">Payment Completed</h2>
          <p class="success-text">{{claim.first_name}} {{claim.last_name}} paid the patient responsibility.</p>
          <v-layout>
            <v-flex xs12
                    md12>
              <v-btn large
                     color="success cyan darken-1"
                     @click="startNewClaim">START NEW CLAIM</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </template>
    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios"; // posts to REST api
import Spark from "spark-md5"; // creates hashes used for IDs
export default {
  name: "Patient",
  props: {
    selected: Boolean,
    services: Array,
    claim: Object,
    step: String
  },
  watch: {
    claim(to) {
      if (to.first_name && to.first_name)
        this.card_name = to.first_name.concat(" ", to.last_name);
    }
  },
  filters: {
    getDate(d) {
      if (!d) return "";
      return moment(d).format("MM/DD/YYYY");
    }
  },
  data() {
    return {
      card_cvc: "381",
      card_month: "06",
      card_name: "John Smith",
      card_number: "4444444444444444",
      card_year: "2021",
      copay: 10,
      email: "jonsmith@gmail.com",
      error: null,
      first_name: "John",
      last_name: "Smith",
      rules: {
        cvc: value => {
          return (
            (parseInt(value) > 0 && parseInt(value) < 10000) || "Invalid CVC"
          );
        },
        month: value => {
          return (
            (parseInt(value) > 0 && parseInt(value) < 13) || "Invalid Month"
          );
        },
        required: value => !!value || "Required.",
        year: value => {
          return (
            (parseInt(value) > 2018 && parseInt(value) < 2100) || "Invalid Year"
          );
        }
      },
      saving: false,
      selected_services: []
    };
  },
  mounted() {
    this.setCard();
  },
  methods: {
    setCard() {
      // Set Random Card data

      let cardNums = [
        4444444444444448,
        36111111111111,
        5105105105105100,
        4111111111111111,
        4012888888881881,
        5555555555554444
      ];
      this.card_number = cardNums[Math.floor(Math.random() * cardNums.length)];

      let years = [2021, 2022, 2023, 2024, 20205];
      this.card_year = years[Math.floor(Math.random() * years.length)];

      let months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ];
      this.card_month = months[Math.floor(Math.random() * months.length)];

      this.card_cvc = this.randomIntFromInterval(100, 999);
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    emitClaim() {
      // Send Claim back to Home.vue
      let c = Object.assign({}, this.claim);
      c.paid = true;
      this.$emit("payClaim", c);
    },
    startNewClaim() {
      this.$emit("startNewClaim");
    },
    paymentJson() {
      // Builds FHIR JSON
      return {
        payment: this.claim.invoice_uid
      };
    },
    payClaim() {
      // Sends Make Payment
      this.saving = true;
      let that = this;
      axios
        .post(`${this.$hostname}/payment/make`, this.paymentJson())
        .then(function(response) {
          console.log("paid claim", response);
          that.saving = false;
          that.emitClaim();
        });
    }
  }
};
</script>