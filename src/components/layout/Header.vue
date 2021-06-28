<template>
  <div id="header">
    <Navbar/>
    <div id="heading">
      <span id="title">Statystykator</span>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  name: "Header",
  components: {Navbar}
}
</script>

<style>
@font-face {
  font-family: 'Frijole';
  src: url("../../assets/fonts/Frijole-Regular.ttf") format('truetype');
}
#heading{
  z-index: -9999;
  margin-top: -9rem;
  font-size: 4rem;
  text-shadow: #111111 1px 3px;
  font-family: 'Frijole';
  padding: 24px 24px;
  position: relative;
  height: 12rem;
}
#header{
  /*background-color: #314296;*/
  width: 100%;
}
#title{
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  animation: fromLeft 1.2s ;
}
@keyframes fromLeft {
  0% {left: -10000px;}
  80% {left: 60%;}
  100%{left:50%;}
}
@media only screen and (max-width: 680px) {
  #heading {
    display:none } }
</style>