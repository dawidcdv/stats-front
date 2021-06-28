<template>
  <div class="wrapper">
    <div>
    <Card>
      <template #header>
        <img alt="user header" src="/img/stats.jpg">
      </template>
      <template #title>
        Wrzuć plik
      </template>
      <template #content>
        Załaduj plik csv i zobacz wygenerowane statytyski
      </template>
      <template #footer>
        <Button @click="goToUpload()" icon="pi pi-check" label="Przejdź" />
      </template>
    </Card>
    </div>
    <div>
    <Card>
      <template #header>
        <img alt="user header" src="/img/results.jpg">
      </template>
      <template #title>
        Przeglądaj wyniki
      </template>
      <template #content>
        Zobacz wygenerowane wyniki na podstawie wrzuconych plików csvj
      </template>
      <template #footer>
        <Button @click="goToResults()" icon="pi pi-check" label="Zobacz" />
      </template>
    </Card>
  </div>
  </div>

</template>

<script>
import Button from "primevue/button";
import Card from 'primevue/card'

export default {
  components:{Card, Button},
  name: "Main",
  methods:{
    goToUpload(){
      this.$router.push({ name: 'StatisticsUpload' })
    },
    goToResults(){
      this.$router.push({ name: 'Statistics' })
    }
  }
}
</script>

<style scoped>
.wrapper{
  margin-top: 10rem;
  display: flex;
  font-size: 5rem;
  flex-shrink: 0;
}
.wrapper > div:first-child{
  margin-right: 1rem;
}
.wrapper > div{
  margin-right: 1rem;
  flex: 1 ;
  flex-shrink: 1;
}
Card{
  font-size: 3rem;
}
@media only screen and (max-width: 680px) {
  .wrapper {
    flex-direction :column;
    margin-top: 0px;
  } }
</style>