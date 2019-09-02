<template>
  <v-flex md4
          :hidden-sm-and-down="!selected"
          xs12
          class="user-card">
    <v-card :class="{'user-card-selected': selected}">
      <v-card-title primary-title
                    :class="{'user-card-waiting': step === 'provider'}"
                    class="indigo darken-1">
        <div class="card-title-icon">
          <img src="@/assets/payer-icon.png">
        </div>
        <div>
          <span class="card-sub-title">PAYER</span>
          <h3 class="card-title">All American Health</h3>
        </div>
      </v-card-title>    
      <template v-if="saving">
         <v-card-text class="text-xs-center user-card-text saving-card">
          <!-- Saving Indicators -->         
          <v-layout row
                    wrap
                    class="mt-5">
            
            <v-flex xs12
                    md12 style="text-align: left;">
                    
              <p class="saving-text">
                 <v-progress-circular color="indigo" v-if="timer > 24"
                                     :value="100"></v-progress-circular>
                <v-progress-circular color="indigo" v-else
                                     :value="timer*4"></v-progress-circular>
                </v-progress-circular>
                Saving Claim
                </p>
                <p class="saving-text">
                <v-progress-circular color="indigo"
                                     :value="0" v-if="timer < 20"></v-progress-circular>
                 <v-progress-circular color="indigo" v-else-if="timer > 49"
                                     :value="100"></v-progress-circular>
                <v-progress-circular color="indigo" v-else
                                     :value="(timer - 20) * 4"></v-progress-circular>
                </v-progress-circular>
                 Creating Claim Response for Provider
                </p>
                <p class="saving-text">
                 <v-progress-circular color="indigo"
                                     :value="0" v-if="timer < 30"></v-progress-circular>
                 <v-progress-circular color="indigo" v-else-if="timer > 74"
                                     :value="100"></v-progress-circular>
                <v-progress-circular color="indigo" v-else
                                     :value="(timer - 30) * 3"></v-progress-circular>
                </v-progress-circular>
                 Saving Patient Account
                </p>
                <p class="saving-text">
                  <v-progress-circular color="indigo"
                                     :value="0" v-if="timer < 50"></v-progress-circular>
                 <v-progress-circular color="indigo" v-else-if="timer > 99"
                                     :value="100"></v-progress-circular>
                <v-progress-circular color="indigo" v-else
                                     :value="(timer - 50) * 3"></v-progress-circular>
                </v-progress-circular>
                 Creating Invoice for Patient
                </p>
               
               
               
            </v-flex>        
          </v-layout>   
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
      <template v-else-if="selected">
        <v-card-text class="text-xs-center user-card-text">
          <h2 class="card-entry-title">All American Health Adjudicates Claim</h2>
          <v-layout class="text-xs-left">
            <v-flex xs12
                    md6>

              <p class="entry-strong">Claim Date</p>
              <p class="entry-text">{{claim.timestamp | getDate}}</p>

            </v-flex>
            <v-flex xs12
                    md6>

              <p class="entry-strong">Claim Time</p>
              <p class="entry-text">{{claim.timestamp | getTime}}</p>

            </v-flex>
          </v-layout>
          <v-layout class="text-xs-left">
            <v-flex xs12
                    md12>
              <p class="entry-strong">Member Name</p>
              <p class="entry-text">{{claim.first_name}} {{claim.last_name}}</p>

            </v-flex>
          </v-layout>
          <v-layout class="text-xs-left">
            <v-flex xs12
                    md12>
              <p class="entry-strong">Email Address</p>
              <p class="entry-text">{{claim.email}}</p>

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
          <v-layout>
            <v-flex xs12
                    md12>
              <v-text-field v-model="eligpercent"
                            suffix="%"
                            mask="###"
                            :rules="[rules.percentage]"
                            label="Plan Covers"></v-text-field>

            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-xs-center user-card-text">

          <v-layout>
            <v-flex xs12
                    class="text-xs-left total-charges-text"
                    md6>
              Total Charges
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
              Total Benefit
            </v-flex>
            <v-flex xs12
                    class="text-xs-right total-charges-amount"
                    md6>
              ${{totalBenefit}}
            </v-flex>

          </v-layout>
          <v-layout>
            <v-flex xs12
                    class="text-xs-left total-charges-text"
                    md6>
              Member Responsibility
            </v-flex>
            <v-flex xs12
                    class="text-xs-right total-charges-amount"
                    md6>
              ${{totalResponsibility}}
            </v-flex>

          </v-layout>
          <v-layout>
            <v-flex xs12
                    md12>
              <v-btn large
                     color="success indigo darken-1"
                     @click="approveClaim">APPROVE CLAIM</v-btn>
            </v-flex>
          </v-layout>

        </v-card-text>
      </template>

      <!-- Completed State -->
      <template v-if="!selected && step === 'provider' && !saving">
        <v-card-text class="text-xs-center waiting-text">
          Waiting for Claim...
        </v-card-text>
      </template>
      <template v-else-if="!selected">
        <v-card-text class="text-xs-center user-card-text">
          <img src="@/assets/purple-check.png">
          <h2 class="success-title">Claim Approved</h2>
          <p class="success-text">All American Health approved the claim and sent a statement to patient {{claim.first_name}} {{claim.last_name}}</p>
        </v-card-text>
      </template>
      <!-- <template v-else-if="!selected">
          <v-card-text class="text-xs-center user-card-text">
        <img src="@/assets/purple-check.png">
        <h2 class="success-title">Claim Approved</h2>
          </v-card-text>
      </template> -->

    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios"; // posts to REST api
import { Mixin } from "./Mixin.js"
import moment from "moment"; // time tools
import Spark from "spark-md5"; // creates hashes used for IDs
export default {
  name: "Payer",
  mixins: [ Mixin ],
  props: {
    claim: Object,
    selected: Boolean,
    services: Array,
    step: String
  },
  filters: {
    getDate(d) {
      if (!d) return "";
      return moment(d).format("MM/DD/YYYY");
    },
    getTime(d) {
      if (!d) return "";
      return moment(d).format("LTS");
    }
  },
  computed: {
    elgibilityPercentage() {
      let e = this.eligpercent;
      if (e > 100) return 1;
      else if (e < 0) return 0;
      else return e / 100;
    },
    totalBenefit() {
      return (this.claim.total_charges * this.elgibilityPercentage).toFixed(2);
    },
    totalResponsibility() {
      return (this.claim.total_charges - this.totalBenefit).toFixed(2);
    }
  },
  data() {
    return {
      account_uid: null,
      claim_response_uid: null,
      claim_timestamp: null,
      eligpercent: 80,
      error: null,
      invoice_uid: null,
      rules: {
        percentage: value => {
          return parseInt(value) >= 0 && parseInt(value) < 101 || "Invalid Eligibility Percentage";
        },
        required: value => !!value || "Required."
      },
      saving: false,
      target_time: 20
    };
  },
  created() {
    this.setElig();
  },
  methods: {
    emitClaim() {
      // Emit Claim to Home.vue
      let c = Object.assign({}, this.claim);
      c.invoice_uid = this.invoice_uid;
      c.claim_response_uid = this.claim_response_uid
      c.account_uid = this.account_uid
      c.total_responsibility = this.totalResponsibility;
      c.total_benefit = this.totalBenefit;
      c.eligibility_percentage = this.elgibilityPercentage;
      this.$emit("approveClaim", c);
    },
    setElig() {
      // Set Random Copay amount
      let eligs = [70, 75, 80, 85, 90];
      this.eligpercent = eligs[Math.floor(Math.random() * eligs.length)];
    },
    claimJson() {
      // Build FHIR Claim JSON
      this.claim_timestamp = new Date();

      let adjudications = [];
      if(!this.claim || !this.claim.services){
        this.$router.push('/provider')
        return
      }
      for (let i = 0; i < this.claim.services.length; i++) {
        let service = this.claim.services[i];
        let s = {
          sequenceNumber: i + 1,
          adjudication: {
            eligible: service.unitPrice,
            copay: this.claim.copay,
            eligpercent: this.eligpercent,
            benefit: service.unitPrice * this.elgibilityPercentage
          }
        };
        adjudications.push(s);
      }

      let json = {
        txDate: this.claim_timestamp.toISOString().slice(0, 10),
        uid: "resource:org.fhir.core.ClaimResponse#",
        claimUid: this.claim.claim_uid,
        accountUid: "resource:org.fhir.core.Account#",
        invoiceUid: "resource:org.fhir.core.Invoice#",
        adjudications: adjudications
      };

      let id1 = Spark.hash(JSON.stringify(json))      
      json.accountUid = json.accountUid.concat(id1);
      json.uid = json.uid.concat(id1);
      json.invoiceUid = json.invoiceUid.concat(id1, "-1");
      this.invoice_uid = json.invoiceUid;
      this.account_uid =json.accountUid;
      this.claim_response_uid = json.uid
      this.$emit("saveFhir", {name: 'fhir_adjudication', data: json})
      return json;
    },
    approveClaim() {
      this.startTimer()
      // Sends adjudicate claim to server
      this.saving = true;
      let that = this;
      axios
        .post(`${this.$hostname}/claim/adjudicate?user=payer`, this.claimJson())
        .then(function(response) {
          console.log("approved claim", response);
          that.saving = false;
          that.timer = 0;
          that.emitClaim();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          that.error = error;
          that.saving = false;
          that.timer = 0;
        });
    }
  }
};
</script>