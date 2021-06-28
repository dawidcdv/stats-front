<template>
  <div class="container">
    <Header></Header>
    <ContentView></ContentView>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import ContentView from  './components/layout/Content.vue'

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/mdc-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    ContentView
  }
})
</script>

<style >
* {
  margin: 0;
  padding: 0; }

*,
*::before,
*::after {
  box-sizing: inherit; }

html {
  box-sizing: border-box;
  font-size: 62.5%; }
@media only screen and (max-width: 68.75em) {
  html {
    font-size: 50%; } }

body {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  min-height: 100vh; }

.container {
  max-width: 120rem;
  margin: 0 auto;
  width: 100%;
  background-color: var(--color-grey-light-1);
  box-shadow: var(--shadow-dark);
  min-height: 50rem; }
@media only screen and (max-width: 75em) {
  .container {
    margin: 0;
    max-width: 100%;
  } }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>