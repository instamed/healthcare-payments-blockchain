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
                            label="Eligibility Percentage"></v-text-field>

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
import moment from "moment"; // time tools
import Spark from "spark-md5"; // creates hashes used for IDs
export default {
  name: "Payer",
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
      claim_timestamp: null,
      eligpercent: 80,
      error: null,
      invoice_uid: null,
      rules: {
        percentage: value => {
          return (
            (parseInt(value) >= 0 && parseInt(value) < 101) ||
            "Invalid Eligibility Percentage"
          );
        },
        required: value => !!value || "Required."
      },
      saving: false
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

      json.uid = json.uid.concat(Spark.hash(JSON.stringify(json)));
      json.accountUid = json.accountUid.concat(Spark.hash(json.uid));
      json.invoiceUid = json.invoiceUid.concat(json.accountUid, "-1");
      this.invoice_uid = json.invoiceUid;
      return json;
    },
    approveClaim() {
      // Sends adjudicate claim to server
      this.saving = true;
      let that = this;
      axios
        .post(`${this.$hostname}/claim/adjudicate`, this.claimJson())
        .then(function(response) {
          console.log("approved claim", response);
          that.saving = false;
          that.emitClaim();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          that.error = error;
          that.saving = false;
        });
    }
  }
};
</script>