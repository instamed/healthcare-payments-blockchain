<template>
  <div class="home">
    <v-dialog v-model="dialog"
              max-width="290">
      <v-card>
        <v-card-title v-if="selectedBlock && selectedBlock.number"
                      class="headline">Block {{selectedBlock.number}}</v-card-title>
        <v-card-text>This is information about the block</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1"
                 flat
                 @click="dialog= false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div id="nav">
      <div id="nav-title">Healthcare Payments in Blockchain</div>
    </div>
    <div id="block-bar-wrapper">
      <div id="block-bar">

        <template v-for="(block, index) in blocks">
          <div class="block darken-1"
               :class="{'teal': block.type === 'provider', 'indigo': block.type === 'payer', 'cyan': block.type === 'patient'}"
               @click.stop="viewBlock(block, index)">
            {{index + 1}}
          </div>
        </template>

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
                  @setName="setName"></provider>
        <payer @approveClaim="approveClaim"
               :claim="claim"
               :step="step"
               :selected="step === 'payer'"></payer>
        <patient @payClaim="payClaim"
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
// @ is an alias to /src
import Provider from "@/components/Provider.vue";
import Payer from "@/components/Payer.vue";
import Patient from "@/components/Patient.vue";

export default {
  name: "home",
  components: {
    Provider,
    Payer,
    Patient
  },
  watch: {
    $route(to, from) {
      console.log("route change", to);
      // if the route changes we need to refetch data
      this.step = to.name;
    }
  },
  computed: {
    stepNumber: {
      get: function (){
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
      set: function(newValue){
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
      step: "provider"
    };
  },
  mounted() {
    this.$router.push("provider");
  },
  methods: {
    blockColor(b) {},
    setName(c) {
      // Set name from Provider card to use in other cards
      this.claim = c;
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
    viewBlock(block, i) {
      this.selectedBlock = block;
      this.$set(this.selectedBlock, "number", i + 1);
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss">
#block-bar-wrapper {
  height: 72px;
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
  width: 36px;
  border-radius: 2px;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 36px;
  color: white;
  font-size: 15px;
  font-weight: bold;
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

.user-card-waiting {
  opacity: 0.5;
}

.v-stepper--vertical {
  padding-bottom: 0px !important;
}
</style>