<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<style lang="scss">
body {
  color: rgba(0, 0, 0, 0.54);
  background-color: #f5f5f5;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav-title {
  height: 28px;
  color: #ffffff;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  padding-top: 15px;
}

#nav {
  height: 64px;
  width: 100%;
  background-color: #005596;
  z-index: 99;
}

</style>
