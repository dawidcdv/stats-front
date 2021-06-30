<template>
<div id="content">


  <div class="statistics">
    <div class="statistics-heading">
      <h2>Statystyki</h2>
    </div>

    <div class="statistics-tabel">
    <DataTable  :value="statistics"  :paginator="true" :rows="10" columnResizeMode="fit | expand" responsiveLayout="scroll">
      <Column  :sortable="true" field="id" header="Id" headerStyle="width: 10%" ></Column>
      <Column  :sortable="true" field="name" header="Name" headerStyle="width: 20%" ></Column>
      <Column  :sortable="true" field="description" header="Description" headerStyle="width: 20%"></Column>
      <Column  :sortable="true" field="file.column" header="Liczba kolumn" headerStyle="width: 20%"></Column>
      <Column  :sortable="true" field="file.row" header="Liczba wierszy" headerStyle="width: 20%"></Column>
      <Column   header="Akcje" headerStyle="width: 10%">
        <template #body="slotProps">
          <Button @click="open(slotProps.data)" type="button" icon="pi pi-search" class="p-button-success" style="margin-right: .5rem"></Button>
          <Button @click="deleteStats(slotProps.data)" type="button" icon="pi pi-trash" class="p-button-danger"></Button>
        </template>
      </Column>
    </DataTable>
    </div>

  </div>
</div>
</template>


<script>
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import { ref, defineComponent } from 'vue'
import http from '@/plugins/http.ts'

export default defineComponent({
  components: {
    DataTable,
    Column,
    Button
  },
  name: 'StatisticsIndex',
  data() {
    return {
      statistics :{},
    }
  },
  created() {
    http.get('/statistics').then(res => {
      this.statistics = res.data
    }).catch(()=> this.$toast.add({severity:'error', summary: 'Problem z załadowaniem strony', life: 5000}))
  },
  methods: {
    open(stats){
      this.$router.push({ name: 'StatisticsView', params: { id: stats.id } })
    },
    deleteStats(stats){
      http.delete('/statistics/' + stats.id).then(()=>{
        this.$toast.add({severity:'success', summary: 'Statystyka usunieta', life: 5000})
        this.statistics = this.statistics.filter(v => v.id != stats.id)
      }).catch( e => {
        if(!e.response || e.response.status != 404 ){
          this.$toast.add({severity:'error', summary: 'Nie można usunąć statystyki', detail : "Wystapił błąd podczas usuwania statystyki", life: 5000})
        }else{
          this.$toast.add({severity:'error', summary: 'Wystapił błąd podczas usuwania statystyki', detail : "Statystyka nie istnieje", life: 5000})
        }
      })
    }
  }
})
</script>

<style scoped>
.statistics{
  margin-top: 8rem;
}

</style>