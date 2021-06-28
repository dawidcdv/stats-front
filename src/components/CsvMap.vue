<template>
  <div>
      <div class="p-grid csv-col" v-for="i in range">
        <div class="p-col-2">
          <label for="index">Nr kolumny</label>
          <InputText v-model="indexes[i]" id="index" type="text" />
        </div>
        <div class="p-col-4">
          <label for="name">Nazwa kolumny</label>
          <InputText v-model="names[i]"  id="name" type="text" />
        </div>
        <div class="p-col-4">
          <label for="type">Typ kolumny</label>
          <InputText v-model="types[i]"  id="type" type="text" />
        </div>
        <div class="p-col-2">
          <Button v-if="i>1" @click="removeCsvCol(i)" class="btn delete"  icon="pi pi-minus"/>
        </div>
      </div>
    <Button v-if="range<20" class="btn add" @click="add" icon="pi pi-plus"/>
    </div>
</template>

<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import {defineComponent, ref, watch} from "vue";
export default defineComponent({
props:['dialog'],
components:{ Dialog, InputText, Button},
name: "CsvMap",
  created(){
    watch([this.names, this.types,this.indexes], () => {
      this.$emit('changed',this.getPreparedData())
    })
  },
  data() {
    return {
      names: [],
      types: [],
      indexes: [],
      range: 1
    }
  },
  methods:{
    removeCsvCol(index) {
      this.names.splice(index, 1);
      this.types.splice(index, 1)
      this.indexes.splice(index, 1)
      this.range--;
    },
    add(){
      if(this.range<20)
        this.range++
    },
    getPreparedData(){
      let data = []
      for(let i=1;i<=this.range;i++){
        data.push({
          name : this.names[i],
          type : this.types[i],
          index : this.indexes[i]
        })
      }
      return data
    }
  }
})
</script>

<style scoped>
.btn{
  margin-top: 1.8rem;
}
.add{
  width: 50px;
  background-color: #00583b;
}
.delete{
  background-color: #810000;
}
.csv-col{
  margin-top: 0.5rem;
}
</style>