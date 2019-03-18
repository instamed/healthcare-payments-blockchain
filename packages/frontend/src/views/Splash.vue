<template>
  <div class="splash">
    <v-container grid-list-sm>
      <v-layout row
                wrap>
        <v-flex xs12
                hidden-md-and-up
                style="margin-bottom: 32px;">

          <img src="@/assets/blockchain-image.png">
        </v-flex>
        <v-flex md6
                xs12
                class="splash-text-wrapper">
          <div class="splash-text">

            <h1>Healthcare Payments</h1>
            <h1>on Blockchain</h1>
            <p>You will be going through a claim-payment workflow where you will act as the provider, payer, and the patient. After completing each step, a block will be created that is viewable by all parties within the blockchain network.</p>
            <v-flex xs12
                    text-xs-center>
              <v-btn round
                     large
                     color="indigo"
                     dark
                     @click="start">START DEMO</v-btn>
            </v-flex>
          </div>
        </v-flex>

        <v-flex md6
                hidden-sm-and-down>
          <div class="splash-image-wrapper">
            <img class="splash-image"
                 src="@/assets/blockchain-image.png">
          </div>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Splash",
  methods: {
    start() {
      this.$router.push("provider");
    }
  }
};
</script>

<style lang="scss">
.splash {
  // margin-top: 150px;
  // margin-left: auto;
  // margin-right: auto;
  //   max-width: 1200px;

 // position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  

  display: flex;
  .container {
    margin: auto;
    width: 10em;
  }
}
img {
  padding: 0;
  display: block;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
}

.splash-text-wrapper {
  //     //height: 500px;
  //     position: fixed;
  //   left: 0;
  //   top: 0;
  //   //width: 100vw;
  //   //height: 100vh;
  //   display: flex;
  display: flex;
  align-items: center;
}
.splash-text {
  display: table-cell;
  vertical-align: middle;
  text-align: left;
  h1 {
    font-size: 54px;
    font-weight: 800;
    line-height: 72px;
  }
  //height: 100%;
  color: rgba(0, 0, 0, 0.87);
  p {
    font-size: 18px;
    line-height: 30px;
    margin-top: 24px;
  }
}
</style>

