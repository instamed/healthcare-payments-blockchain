<template>
  <v-flex md4
          xs12
          :hidden-sm-and-down="!selected"
          class="user-card">
    <v-card :class="{'user-card-selected': selected}">
      <v-card-title primary-title
                    class="teal darken-1">
        <div class="card-title-icon">
          <img src="@/assets/provider-icon.png">
        </div>
        <div>
          <span class="card-sub-title">PROVIDER</span>
          <h3 class="card-title">Southbend Flu Clinic</h3>
        </div>
      </v-card-title>
      <v-card-text class="text-xs-center user-card-text saving-card">

        <template v-if="loading_user">
          <v-card-text class="text-xs-center waiting-text">
            <v-progress-circular indeterminate
                                 color="primary"></v-progress-circular><br /><br />
            Loading Patient Data...

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
        <template v-else-if="saving">
          <!-- Saving Indicators -->         
          <v-layout row
                    wrap
                    class="mt-5">
            
            <v-flex xs12
                    md12 style="text-align: left;">
                    
              <p class="saving-text">
                 <v-progress-circular color="teal" v-if="timer > 49"
                                     :value="100"></v-progress-circular>
                <v-progress-circular color="teal" v-else
                                     :value="timer*2"></v-progress-circular>
                </v-progress-circular>
                Saving Patient</p>
                <p class="saving-text">
                  <v-progress-circular color="teal"
                                     :value="0" v-if="timer < 30"></v-progress-circular>
                  <v-progress-circular color="teal" v-else
                                     :value="timer - 30"></v-progress-circular> Creating Claim </p>            
            </v-flex>        
          </v-layout>          
        </template>
        <template v-else-if="selected">
          <h2 class="card-entry-title">Southbend Flu Clinic Creates Claim</h2>
          <v-layout>
            <v-flex xs12
                    md6>

              <v-text-field v-model="first_name"
                            label="Patient First Name"></v-text-field>

            </v-flex>
            <v-flex xs12
                    md6>

              <v-text-field v-model="last_name"
                            label="Patient Last Name"></v-text-field>

            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12
                    md12>
              <v-text-field v-model="email"
                            label="Patient Email"></v-text-field>

            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12
                    md12>
              <v-text-field v-model="copay"
                            prefix="$"
                            label="Copay"></v-text-field>

            </v-flex>
          </v-layout>
          <h3 class="services-title">Services</h3>
          <div class="services-list">
            <template v-for="service in services">
              <v-checkbox v-model="selected_services"
                          :value="service"
                          :label="`${service.name} - $${service.unitPrice.toString()}`"></v-checkbox>
            </template>
          </div>

        </template>
        <!-- Completed State -->
        <template v-if="!selected">
          <img src="@/assets/green-check.png">
          <h2 class="success-title">Claim Created</h2>
          <p class="success-text">Southbend Flu Clinic created a claim producing a block and the claim was sent to All American Health</p>
        </template>

      </v-card-text>
      <template v-if="selected && !loading_user && !saving">
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
              ${{totalCharges}}
            </v-flex>

          </v-layout>
          <v-layout>
            <v-flex xs12
                    md12>
              <v-btn large
                     color="success teal darker-1"
                     @click="savePatient()">CREATE CLAIM</v-btn>
            </v-flex>
          </v-layout>

        </v-card-text>
      </template>
    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios"; // posts to REST api
import { Mixin } from "./Mixin.js"
import Spark from "spark-md5"; // creates hashes used for IDs
export default {
  name: "Provider",
  mixins: [ Mixin ],
  props: {
    claim: Object,
    selected: Boolean,
    services: Array,
    step: String
  },
  watch: {
    claim(to, from) {
      // If there's no patient defined, get some fake data
      if (to && !to.first_name) this.getFakeData();
    }
  },
  computed: {
    totalCharges() {
      if (this.selected_services && this.selected_services.length > 0) {
        let total = 0;
        for (let s of this.selected_services) {
          total = total + s.unitPrice;
        }
        return total;
      } else {
        return 0;
      }
    }
  },
  data() {
    return {
      address1: "",
      birth_date: "",
      city: "",
      claim_timestamp: null,
      claim_uid: null,
      copay: 10,
      country: "USA",
      email: "jonsmith@gmail.com",
      encounter_uid: null,
      error: false,
      fake_data: {},
      first_name: "John",
      gender: "male",
      last_name: "Smith",
      loading_user: true,
      patient_id: null,
      phone: "",
      postal_code: "",
      selected_services: [],
      state: "",
      target_time: 14      
    };
  },
  created() {
    this.getFakeData(); // Get Fake Data to Create User
    this.setServices(); // Randomly set Services
    this.setCopay(); // Randomly set CoPay
  },
  methods: {
    setCopay() {
      //Set Random Copay amount
      let copays = [10, 15, 20, 25, 30, 35, 40];
      this.copay = copays[Math.floor(Math.random() * copays.length)];
    },
    getFakeData() {
      // Get Fake User Data from randomuser.me
      let that = this;
      this.loading_user = true;
      axios.get("https://randomuser.me/api/?nat=us").then(function(response) {
        that.fake_data = response.data.results[0];
        that.writeFakeData();
      });
    },
    writeFakeData() {
      // Store fake data in reactive data
      if (this.fake_data) {
        this.email = this.fake_data.email;
        this.first_name = this.uppFirstLetter(this.fake_data.name.first);
        this.last_name = this.uppFirstLetter(this.fake_data.name.last);
        this.birth_date = this.fake_data.dob.date;
        this.address1 = this.fake_data.location.street;
        this.state = this.fake_data.location.state;
        this.city = this.fake_data.location.city;
        this.postal_code = this.fake_data.location.postcode;
        this.gender = this.fake_data.gender;
        this.phone = this.fake_data.phone;
      }
      //Pass name along to use in other cards
      this.$emit("setName", {
        first_name: this.first_name,
        last_name: this.last_name
      });
      this.loading_user = false;
    },
    uppFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    setServices() {
      // Randomly Set Services
      let picked = this.services[
        Math.floor(Math.random() * this.services.length)
      ];
      this.selected_services.push(picked);
    },
    patientJson() {
      // Build the FHIR JSON for Patient
      let json = {
        resourceType: "Patient",
        id: new Date(), // Set a date here and later we replace with a Has
        identifier: [
          {
            use: "usual",
            system: "Blockchain:Patient",
            value: "resource:org.fhir.core.Patient"
          }
        ],
        active: true,
        name: [
          {
            use: "usual",
            family: this.last_name,
            given: [this.first_name],
            suffix: []
          }
        ],
        telecom: [
          {
            system: "phone",
            value: this.phone,
            use: "mobile"
          },
          {
            system: "email",
            value: this.email,
            use: "home"
          }
        ],
        gender: this.gender,
        birth_date: this.birth_date.substring(0, 10),
        deceasedBoolean: false,
        address: [
          {
            use: "home",
            line: [this.address1],
            city: this.city,
            postal_code: this.postal_code,
            state: this.state,
            country: this.country
          }
        ],
        maritalStatus: {
          coding: [
            {
              system: "http://hl7.org/fhir/v3/MaritalStatus",
              code: "M",
              display: "Married"
            }
          ],
          text: "Married"
        },
        managingOrganization: {
          identifier: {
            $class: "org.fhir.datatypes.Identifier",
            use: "usual",
            system: "Blockchain:Provider",
            value: this.$provider_id
          }
        }
      };
      // Hash the object and set the ID to the hash. This creates a unique ID with low chance of collision, which is good enough for our purposes here.
      json.id = "resource:org.fhir.core.Patient#".concat(
        Spark.hash(JSON.stringify(json))
      );
      json.identifier[0].value = json.id;
      this.patient_id = json.id.toString();
      return json;
    },
    savePatient() {
      // Sends Save Patient Request. We do this before sending the claim as we're creating a new patient
      this.saving = true;
      this.startTimer();
      let that = this;
      axios
        .post(`${this.$hostname}/patient`, this.patientJson())
        .then(function(response) {
          console.log("saved patient", response);
          that.saveClaim();
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          that.error = error;
          that.saving = false;
          that.timer = 0
        });
    },
    claimJson() {
      // Creates Claim FHIR JSON
      this.claim_timestamp = new Date();

      // Loop through the services selected and prepare as charge items
      let s = this.selected_services.slice();
      for (let service of s) {
        service.chargeItemUid = service.chargeItemUid.concat(
          Spark.hash(
            JSON.stringify({
              service: service,
              patient_id: this.patient_id,
              provider_id: this.$provider_id,
              payer_id: this.$payer_id,
              timestamp: this.claim_timestamp.toString()
            })
          )
        );
      }
      let json = {
        txDate: this.claim_timestamp.toISOString().slice(0, 10), // this is only getting the day and a full implementation would deal with time and timezone
        patientId: this.patient_id,
        providerId: this.$provider_id,
        encounterUid: "resource:org.fhir.core.Encounter#",
        claimUid: "resource:org.fhir.core.Claim#",
        payerId: this.$payer_id,
        services: s // list of selected services set above
      };
      let id = Spark.hash(JSON.stringify(json));
      json.encounterUid = json.encounterUid.concat(id); // add Unique Hash for Uid
      json.claimUid = json.claimUid.concat(id, "-1");
      this.encounter_uid = json.encounterUid;
      this.claim_uid = json.claimUid.toString(); // Cast to string unlinks the data
      return json;
    },
    saveClaim() {
      // Sends claim create to server
      if(this.timer < 45) this.timer = 50
      this.saving = true;
      let that = this;
      axios
        .post(`${this.$hostname}/claim`, this.claimJson())
        .then(function(response) {
          console.log("saved claim", response);
          that.saving = false;
          that.timer = 0
          that.emitClaim();
        });
    },
    emitClaim() {
      // Emit claim to Home.vue
      let c = {};
      c.claim_uid = this.claim_uid;
      c.copay = this.copay;
      c.email = this.email;
      c.encounter_uid = this.encounter_uid;
      c.first_name = this.first_name;
      c.last_name = this.last_name;
      c.patient_id = this.patient_id;
      c.services = this.selected_services;
      c.timestamp = this.claim_timestamp;
      c.total_charges = this.totalCharges.toFixed(2);
      this.$emit("createClaim", c);
    }
  }
};
</script>

<!-- Don't want to use scoped if using classes on Vuetify components as it will not pass -->
<style lang="scss">
.total-charges-text {
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 18px;
  line-height: 20px;
}
.total-charges-amount {
  color: rgba(0, 85, 150, 0.87);
  font-family: Roboto;
  font-size: 20px;
  line-height: 20px;
  text-align: right;
}

.services-title {
  color: rgba(0, 0, 0, 0.38);
  font-family: Roboto;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  text-align: left;
}

.services-list {
  margin-left: 1rem;
  .v-input--selection-controls {
    margin-top: 4px;
  }
  .v-label {
    color: rgba(0, 0, 0, 0.87);
    font-family: Roboto;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
