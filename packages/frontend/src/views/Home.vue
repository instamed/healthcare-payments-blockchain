<template>
  <div class="home">
    <v-dialog v-model="dialog"
              max-width="700">
      <v-card>
        <v-card-title v-if="selectedBlock && selectedBlock.number"
                      class="headline"
                      style="color: white;"
                      :class="{'teal': selectedBlock.type === 'provider', 'indigo': selectedBlock.type === 'payer', 'cyan': selectedBlock.type === 'patient', 'grey': !selectedBlock.type}">Block {{selectedBlock.number}}</v-card-title>
        <v-card-text v-if="selectedBlock"
                     style="text-align: left;">
          <v-flex xs12>
            <v-alert v-if="selectedBlock.other"
                     :value="true"
                     color="info"
                     outline>
              This block was created by another user
            </v-alert>
            <template v-if="selectedBlock.name">
              <p class="entry-strong">Transaction</p>
              <p class="entry-text">{{selectedBlock.name}}</p>
            </template>
            <template v-if="selectedBlock.hash">
              <p class="entry-strong">Hash</p>
              <p class="entry-text">{{selectedBlock.hash}}</p>
            </template>
            <template v-else-if="selectedBlock.data_hash">
              <p class="entry-strong">Data Hash</p>
              <p class="entry-text">{{selectedBlock.data_hash}}</p>
            </template>
            <template v-if="selectedBlock.previous_hash">
              <p class="entry-strong">Previous Block Hash</p>
              <p class="entry-text">{{selectedBlock.previous_hash}}</p>
            </template>
            <template v-if="selectedBlock.fhir">
              <p class="entry-strong">FHIR Transaction</p>
              <p><a href="#" @click="view_fhir = true" v-if="!view_fhir">View Transaction Details <i class="fas fa-caret-down"></i></a>
              <a href="#" @click="view_fhir = false" v-else>Hide Transaction Details <i class="fas fa-caret-up"></i></a>
              </p>
              <pre style="white-space: pre; overflow-x:scroll;" v-show="view_fhir"
                   v-highlightjs="selectedBlock.fhir"><code class="json"></code></pre>

            </template>
             <template v-if="selectedBlock.write_data">
              <p class="entry-strong">Block Write Information</p>
              <p><a href="#" @click="view_write = true" v-if="!view_write">View Transaction Details <i class="fas fa-caret-down"></i></a>
              <a href="#" @click="view_write = false" v-else>Hide Transaction Details <i class="fas fa-caret-up"></i></a>
              </p>
              <pre style="white-space: pre; overflow-x:scroll;"
                   v-highlightjs="selectedBlock.fhir"><code class="json"></code></pre>

            </template>
          </v-flex>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1"
                 flat
                 @click="dialog= false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div id="nav">
      <div id="nav-title">Healthcare Payments on Blockchain</div>
    </div>
    <div id="block-bar-wrapper">
      <div id="block-bar">
        <transition-group name="slide"
                          mode="out-in">

          <div v-for="block in blockList"
               v-if="block.number > (blockHeightStart - 1)"
               :key="block.number"
               class="block darken-1"
               :class="{'teal': block.type === 'provider', 'indigo': block.type === 'payer', 'cyan': block.type === 'patient', 'grey': !block.type}"
               @click.stop="viewBlock(block)">
            {{block.number}}
          </div>

        </transition-group>
        <v-progress-circular indeterminate
                             v-if="blocksLoading && blockHeightStart"
                             color="primary"></v-progress-circular>
      </div>
    </div>

    <v-container grid-list-xl
                 text-xs-left
                 fluid
                 hidden-md-and-up>

      <v-stepper vertical
                 v-model="stepNumber">
        <v-stepper-header>
          <v-stepper-step :complete="stepNumber > 1"
                          step="1">Provider</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepNumber > 2"
                          step="2">Payer</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="stepNumber > 3"
                          step="3">Patient</v-stepper-step>
        </v-stepper-header>

      </v-stepper>

    </v-container>

    <v-container grid-list-xl
                 text-xs-left
                 fluid>
      <v-layout row
                class="content">
        <provider :selected="step === 'provider'"
                  :claim="claim"
                  :step="step"
                  :services="services"
                  @createClaim="createClaim"
                  @saveFhir="saveFhir"
                  @setName="setName"></provider>
        <payer @approveClaim="approveClaim"
               @saveFhir="saveFhir"
               :claim="claim"
               :step="step"
               :selected="step === 'payer'"></payer>
        <patient @payClaim="payClaim"
                 @saveFhir="saveFhir"
                 @startNewClaim="startNewClaim"
                 :claim="claim"
                 :step="step"
                 :selected="['patient', 'paid'].includes(step)"></patient>
        </v-flex>

      </v-layout>

    </v-container>

  </div>
</template>

<script>
import axios from "axios"; // posts to REST api
// @ is an alias to /src
import moment from "moment"; // time tools
import Provider from "@/components/Provider.vue";
import Payer from "@/components/Payer.vue";
import Patient from "@/components/Patient.vue";


export default {
  name: "Home",
  components: {
    Provider,
    Payer,
    Patient
  },
  watch: {
    $route(to, from) {
      this.waitAndGetBlockHeight(to);
      // if the route changes we need to refetch data
      this.step = to.name;
    }
  },
  computed: {
    stepNumber: {
      get: function() {
        switch (this.step) {
          case "provider":
            return 1;
            break;
          case "payer":
            return 2;
            break;
          case "patient":
            return 3;
            break;
          case "paid":
            return 4;
            break;
        }
      },
      set: function(newValue) {
        switch (newValue) {
          case 1:
            this.step = "provider";
            break;
          case 2:
            this.step = "payer";
            break;
          case 3:
            this.step = "patient";
            break;
          case 4:
            this.step = "paid";
            break;
        }
      }
    }
  },
  data() {
    return {
      blocks: [],
      blockList: {},
      blocksEnabled: true,
      blocksLoading: false,
      blockLoadLastRoute: null,
      blockLoadAttempts: 0,
      blockHeight: null,
      blockHeightStart: null,
      blockTemplate: {
        number: null
      },
      claim: {
        claim_uid: "",
        copay: "",
        eligibility_percentage: null,
        email: "",
        first_name: "",
        invoice_uid: null,
        last_name: "",
        services: [],
        timestamp: null,
        total_benefit: null,
        total_charges: null,
        total_responsibility: null
      },
      claimDefault: {
        first_name: "",
        last_name: ""
      },
      dialog: false,
      fhir_claim: {},
      fhir_patient: {},
      fhir_adjudication: {},
      fhir_payment: {},
      selectedBlock: null,
      services: [
        {
          chargeItemUid: "resource:org.fhir.core.ChargeItem#",
          hcpcsCode: "90465",
          name: "Flu Vaccine - Injected",
          procedureUid: "resource:org.fhir.core.Procedure#FluInjection1",
          quantity: 1,
          unitPrice: 45
        },
        {
          chargeItemUid: "resource:org.fhir.core.ChargeItem#",
          hcpcsCode: "90467",
          name: "Flu Vaccine - Oral",
          procedureUid: "resource:org.fhir.core.Procedure#FluOral1",
          quantity: 1,
          unitPrice: 70
        },
        {
          chargeItemUid: "resource:org.fhir.core.ChargeItem#",
          hcpcsCode: "90468",
          name: "RotaVirus Vaccine - Oral",
          procedureUid: "resource:org.fhir.core.Procedure#RotaVirusOral1",
          quantity: 1,
          unitPrice: 90
        },
        {
          chargeItemUid: "resource:org.fhir.core.ChargeItem#",
          hcpcsCode: "90756",
          name: "Tamiflu - Oral",
          procedureUid: "resource:org.fhir.core.Procedure#TamifluOral1",
          quantity: 1,
          unitPrice: 180
        },
        {
          chargeItemUid: "resource:org.fhir.core.ChargeItem#",
          hcpcsCode: "96365",
          name: "Acyclovir - Oral",
          procedureUid: "resource:org.fhir.core.Procedure#AcyclovirInjection1",
          quantity: 1,
          unitPrice: 350
        }
      ],
      step: "provider",
      view_fhir: false,
      view_write: false
    };
  },
  mounted() {
    this.$router.push("provider");
    this.getBlockHeight();
  },
  methods: {
    blockColor(b) {},
    setName(c) {
      // Set name from Provider card to use in other cards
      this.claim = c;
    },
    saveFhir(payload) {
      //saving submitted FHIR JSON to display on blocks
      if (payload.name && payload.data && this[payload.name]) {
        this[payload.name] = payload.data;
      }
    },
    createClaim(c) {
      // Create claim from Provider card
      this.claim = c;
      // Use Object Assign to duplicate the object so as not to re-reference the same object
      let b = Object.assign({}, this.blockTemplate);
      // set the block Type to determine color
      b.type = "provider";
      this.blocks.push(b);
      // Set the step to provide UI indicators on where the user is in the process
      this.$router.push("payer");
      //this.step = 'payer'
    },
    approveClaim(c) {
      // Approve claim from Payer card
      this.claim = c;
      let b = Object.assign({}, this.blockTemplate);
      b.type = "payer";
      this.blocks.push(b);
      this.$router.push("patient");
      //this.step = 'patient'
    },
    payClaim(c) {
      // Pay claim from Patient card
      this.claim = c;
      let b = Object.assign({}, this.blockTemplate);
      b.type = "patient";
      this.blocks.push(b);
      this.$router.push("paid");
      //this.step = 'paid'
    },
    startNewClaim() {
      this.claim = Object.assign({}, this.claimDefault);
      //this.step = 'provider'
      this.$router.push("provider");
    },
    viewBlock(block) {
      this.selectedBlock = block;
      this.dialog = true;
    },
    waitAndGetBlockHeight(to) {
      let that = this;
      setTimeout(function() {
        if (to) {
          that.blockLoadLastRoute = to.path;
          that.blockLoadAttempts = 0;
        } else if (
          that.blockLoadLastRoute &&
          that.blockLoadLastRoute !== that.$route.path
        ) {
          return; // exit out because route has changed and we've started another set of block queries
        }
        that.blockLoadAttempts++;
        that.getBlockHeight(); // adding some wait time as the block explorer can be slightly behind
      }, 500);
    },
    getBlockHeight() {
      let that = this;
      this.blocksLoading = true;
      axios
        .post(`${this.$block_explorer}/blockinfo`, {
          channelid: this.$channel_id
        })
        .then(function(response) {
          if (response.data && response.data.height && response.data.height.low)
            that.blockHeight = parseInt(response.data.height.low);
          if (!that.blockHeightStart) {
            that.blockHeightStart = parseInt(response.data.height.low);
            that.blocksLoading = false;
          } else if (that.blockHeight > that.blockHeightStart) {
            if (that.blockHeight > that.blockHeightStart + 30)
              that.blockHeightStart++; //Increase Start to decrease number shown on page
            that.waitAndGetAllBlocks();
          } else if (that.blockLoadAttempts < 4) {
            that.waitAndGetBlockHeight();
          } else {
            that.blocksLoading = false;
          }
        })
        .catch(function(error) {
          console.error(error);
          that.blocksEnabled = false;
          that.blocksLoading = false;
        });
    },
    waitAndGetAllBlocks() {
      let that = this;
      setTimeout(function() {
        that.getAllBlocks(); // adding some wait time as the block explorer can be slightly behind
      }, 1000);
    },
    getAllBlocks() {
      let skips = 0;
      for (let i = this.blockHeightStart; i < this.blockHeight; i++) {
        // Get block info if we don't already have it
        if (typeof this.blockList[i] !== "object") this.getBlockInfo(i);
        else skips++;
      }
      if (skips > 0) this.blocksLoading = false;
    },
    waitAndGetBlockInfo(i, attempts) {
      let that = this;
      if (!attempts || attempts < 5) {
        setTimeout(function() {
          that.getBlockInfo(i, attempts); // adding some wait time as the block explorer can be slightly behind
        }, 500);
      }
    },
    getBlockInfo(i, attempts) {
      if (!attempts) attempts = 0;
      let that = this;
      let blockNumber = i; // height is one off from block number because it starts at zero
      if (!that.blockList[blockNumber]) {
        axios
          .post(`${this.$block_explorer}/block`, {
            channelid: this.$channel_id,
            blocknumber: blockNumber
          })
          .then(function(response) {
            console.log('block info', response)
            if (typeof response === "object")
              that.processBlock(response, blockNumber);
            else {
              that.getBlockInfo(i, attempts++);
            }
          })
          .catch(function(error) {
            that.blocksLoading = false;
            console.error(error);
          });
      }
    },    
    processBlock(block, blockNumber) {
      let that = this;
      let blockJson = JSON.stringify(block); //turn to JSON string to search.
      block.number = blockNumber;

      if (
        this.claim.claim_response_uid &&
        blockJson.indexOf(this.claim.claim_response_uid) > 0
      ) {
        block.type = "payer";
         block.name = "Approve Claim for XYZ Provider for ".concat(
          this.claim.first_name,
          " ",
          this.claim.last_name, ' on ', moment(this.claim.timestamp).format("MM/DD/YYYY") 
        );    
        block.fhir = JSON.stringify(this.fhir_adjudication, null, 2);
      } else if (
        this.claim.invoice_uid &&
        blockJson.indexOf(this.claim.invoice_uid) > 0
      ) {
        block.type = "patient";
        block.name = `Payment from ${this.claim.first_name} ${this.claim.last_name} to XYZ Provider for visit on ${moment(this.claim.timestamp).format("MM/DD/YYYY")}`
        block.fhir = JSON.stringify(this.fhir_payment, null, 2);
      } else if (
        this.claim.encounter_uid &&
        blockJson.indexOf(this.claim.encounter_uid) > 0
      ) {
        block.type = "provider";
        block.name = "Create Claim for XYZ Provider for ".concat(
          this.claim.first_name,
          " ",
          this.claim.last_name, ' on ', moment(this.claim.timestamp).format("MM/DD/YYYY") 
        );
        block.fhir = JSON.stringify(this.fhir_claim, null, 2);
      } else if (
        this.claim.patient_id &&
        blockJson.indexOf(this.claim.patient_id) > 0
      ) {
        block.type = "provider";
        block.name = "Create Patient ".concat(
          this.claim.first_name,
          " ",
          this.claim.last_name
        );
        block.fhir = JSON.stringify(this.fhir_patient, null, 2);
      } else {
        block.other = true;
      }

      block.data_hash = "";
      block.previous_hash = "";

      if (block.data && block.data.header) {
        block.data_hash = block.data.header.data_hash;
        block.previous_hash = block.data.header.previous_hash;
      }

      // Get the full block hash from endpoint, which
      if(block.previous_hash && block.data_hash) this.getBlockHash(block)
      else {
          this.$set(this.blockList, blockNumber, block);
          that.blocksLoading = false;
          that.blockLoadAttempts = 0;
      }
     
    },
    getBlockHash(block, attempts) {
      
      let that = this;      
      
        axios
          .post(`${this.$block_explorer}/blockhash`, {
            number: block.number,
            prevhash: block.previous_hash,
            datahash: block.data_hash
          })
          .then(function(response) {
            console.log('block hash', response)
            block.hash = response.data            
             that.$set(that.blockList, block.number, block);
              that.blocksLoading = false;
              that.blockLoadAttempts = 0;
          })
          .catch(function(error) {
            console.error(error);
              that.blocksLoading = false;
              that.blockLoadAttempts = 0;
          });
      
    },
    addFakeBlocks(num) {
      // for Testing Purposes
      if (!num) num = 20;
      let n = this.blockHeight + 1 + num;
      let o = {
        adapter: {
          _custom: {
            type: "function",
            display: "<span>ƒ</span> xhrAdapter(config)"
          }
        },
        transformRequest: {
          "0": {
            _custom: {
              type: "function",
              display: "<span>ƒ</span> transformRequest(data, headers)"
            }
          }
        },
        transformResponse: {
          "0": {
            _custom: {
              type: "function",
              display: "<span>ƒ</span> transformResponse(data)"
            }
          }
        },
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        validateStatus: {
          _custom: {
            type: "function",
            display: "<span>ƒ</span> validateStatus(status)"
          }
        },
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8"
        },
        method: "post",
        url: "https://blockchain-demo.instamed.com:8443/block",
        data: '{"channelid":"public","blocknumber":284}'
      };

      for (let i = this.blockHeight + 1; i < n; i++) {
        o.number = parseInt(i);
        this.$set(this.blockList, i, o);
      }
    }
  }
};
</script>

<style lang="scss">
#block-bar-wrapper {
  min-height: 72px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.24);
  padding: 18px;
  z-index: 99;
}

#block-bar {
  text-align: left;
  //max-width: 1440px;
  margin: 0 auto;
  padding-left: 8px;
}

.block {
  height: 36px;
  min-width: 36px;
  padding: 0px 8px;
  border-radius: 2px;
  margin: 4px 8px 4px 0px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 36px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

.defgreen {
  background-color: #00897b;
}
.defteal {
  background-color: #00acc1;
}
.defpurple {
  background-color: #3949ab;
}

.content {
  // max-width: 1440px;
  // margin: 0 auto;
  //padding-top: 24px;
}

.card-title {
  color: rgba(255, 255, 255, 0.87);
  font-family: Roboto;
  font-size: 20px;
  line-height: 24px;
}

.card-sub-title {
  color: rgba(255, 255, 255, 0.87);
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
}

.card-title-icon {
  margin-right: 16px;
}

.user-card-selected {
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12), 0 24px 24px 0 rgba(0, 0, 0, 0.24);
}
.user-card-text {
  // min-height: 300px;
  p {
  }
}

.card-entry-title {
  color: rgba(0, 0, 0, 0.54);
  font-family: Roboto;
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1.5em;
  margin: 2rem 0 2rem 0;
}

.entry-strong {
  color: rgba(0, 0, 0, 0.54);
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
}

.entry-text {
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 16px;
  line-height: 20px;
}

.success-text {
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  margin: 0 10%;
  margin-bottom: 32px;
}

.success-title {
  margin: 16px 0;
}

.waiting-text {
  min-height: 271px;
  padding-top: 100px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.54);
}

.saving-text {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.54);
}

.user-card-waiting {
  opacity: 0.5;
}

.v-stepper--vertical {
  padding-bottom: 0px !important;
}

.saving-card {
  min-height: 280px;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}

.slide-enter {
  transform: translateX(100vw);
}

.slide-leave-to {
  transform: translateX(-100vw);
}
pre {
  white-space: pre-wrap;
  /* css-3 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
}
</style>