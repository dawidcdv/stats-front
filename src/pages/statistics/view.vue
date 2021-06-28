<template>
  <div>
    <Dialog v-if="loading" :closable="false"  v-model:visible="loading" :style="{width: '50vw'}" >
      <ProgressBar mode="indeterminate"/>
    </Dialog>

    <div v-else id="content">
      <div class="p-grid" >
        <div class="p-col-1">  <Button @click="back()" class="primary button-back"  icon="pi pi-angle-left"  /></div>
      </div>

      <div class="p-grid" style="margin-top:2rem">
        <div class="p-col-7 offset-1"><b>Statystyka :</b> {{statistics?.name}}</div>
        <div class="p-col-7 "><b>Opis : </b>{{statistics?.description}}</div>
        <div class="p-col-7 "><b>Liczba wierszy : </b>{{statistics?.file?.row}}</div>
        <div class="p-col-7"><b>Liczba kolumn : </b>{{statistics?.file?.column}}</div>
      </div>


      <div  v-for="(groupedStats, type) in groupedStatistics" style="margin-top:5rem">
        <h3>Statystyki dla typu :  {{type}}</h3>
        <DataTable  :value="groupedStats" responsiveLayout="scroll">
          <Column v-for="col of getColNames(groupedStats)" :field="col" :header="translate(col)" :sortable="true"></Column>
        </DataTable>
      </div>

      <div class="histograms">
        <h2>Histogramy </h2>
        <div class="p-grid" >
          <div v-for="(path) in histogramsPath" class="p-col-6">
            <img :src='path'>
          </div>
        </div>
      </div>

  </div>
</div>
</template>


<script>
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import { ref, defineComponent } from 'vue'
import http from '@/plugins/http.ts'

const INT ='int64'
const FLOAT = 'float64'
const NUMBER = 'number'

export default defineComponent({
  components: {
    DataTable,
    Column,
    Button,
    ProgressBar,
    Dialog
  },
  name: 'Form',
  data() {
    return {
      groupedStatistics: {},
      histogramsPath :[],
      statistics :{},
      loading : true
    }
  },
  created() {
    http.get('/statistics/' + this.$route.params.id).then(res => {
      this.statistics = res.data
        this.groupedStatistics = this.groupByType()
        this.histogramsPath = this.getHistogramsPath()
      this.loading =false
    }).catch(e=>{
      if(!e.response || e.response.status != 404 ){
        this.$toast.add({severity:'error', summary: 'Nie można pobrać żadanej statystyki', detail: "Wystąpił nieznany bład", life: 5000})
      }else{
        this.$toast.add({severity:'error', summary: 'Żadana statystyka nie istnieje', life: 5000})
      }
      this.back()
    })
  },
  methods: {
    getHistogramsPath(){
      return this.statistics.data_description
          .filter(v =>!!v.histogram)
          .map(v => import.meta.env.VITE_APP_API_URL + "/" + v.histogram )
    },
    groupByType() {
      return this.statistics.data_description.reduce((groupedStats, dataStats)=>{
        let type = dataStats.type

        if(type == INT || type == FLOAT){
          type = NUMBER
        }

        if (!groupedStats[type]) {
          groupedStats[type] = [];
        }
        groupedStats[type].push({'name' : dataStats.name, 'type' : dataStats.type, ...dataStats.stats})

        return groupedStats;

      }, {})
    },
    getColNames(stats){
      let colNames = []
      for(let statsProperty in stats[0]){
          colNames.push(statsProperty)
      }
      return colNames
    },
    translate(colName){
      switch(colName){
        case "mean" : return "Średnia"
        case "max" : return "Maksimum"
        case "min" : return "Minimum"
        case "median" : return "Mediana"
        case "null" : return "Puste"
        case "std" : return "Odchylenie standardowe"
        case "count" : return "Ilosc"
        case "freq" : return "Powtórzen"
        case "top" : return "Najwyższy"
        case "unique" : return "Unikalnych"
        default  : return colName
      }
    },
    back(){
      this.$router.push({'name':'Statistics'})
    }
  }
})
</script>

<style scoped>
.p-col-7{
  text-align: left;
  font-size : 1.2rem
}
.button-back{
  float : left;
  padding: .5rem 3rem;
}
.histograms{
  margin-top: 8rem;
}
</style>