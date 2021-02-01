<template>
  <div id="app">
    <Header></Header>
    <div id="wrapper">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
}
</script>

<style>


/** Default font **/
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
html, body, input, select, textarea {
  font-family: "Roboto Light", "Segoe UI", Arial, Helvetica, sans-serif;
  color: #ffffff !important;
  font-size: calc(15px + 0.35vw) !important;
  line-height: calc(15px + 1.05vw) !important;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
}
a {
  text-decoration: none;
  color: #fff;
}

/** **/
body, html {
  margin: 0;
  height: 100%;
  background: #121212;
}
#wrapper {
  min-height: 80vh;
  width: 100%;
  background: #303030;
}
.vue-codemirror .CodeMirror {
  height: auto;
}

.container {
  width: 75em !important;
  max-width: 100% !important;
}


/** Dark Cards **/
.card {
  background: #424242 !important;
}
.card .card-title {
  color: #fff !important;
}
.card .card-text {
  color: #fff !important;
}


/** **/
.dark-button {
  background-color: #bb86fc !important;
}
</style>
