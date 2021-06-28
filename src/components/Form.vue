<template>
  <div>
    <Dialog :closable="false" header="Wrzucam plik" v-model:visible="dialog" :style="{width: '50vw'}" >
      <h3>Trwa wrzucanie i obliczanie statystyk.Zostaniesz przekierowany automatycznie po zakonczeniu przetwarzania pliku.</h3>
      <ProgressBar mode="indeterminate"/>
    </Dialog>

    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-12">
        <label for="firstname">Nazwa</label>
        <InputText  v-model="name" id="firstname" type="text" />
      </div>
      <div class="p-field p-col-12 p-md-12">
        <label for="decription">Opis</label>
        <InputText  v-model="description" id="decription" type="text" />
      </div>
      <div class="p-field p-col-12 p-md-12">
        <label for="separator">Separator</label>
        <InputText maxlength="1" v-model="separator" id="separator" type="text" />
      </div>
      <div class="p-field p-col-12 p-md-12">
        <FileInput v-on:choosen="onFilePicked"></FileInput>
      </div>
      <div class="p-field p-col-12 p-md-12">
        <label for="mode">Tryb</label>
        <Dropdown id='mode' :options="modes" optionLabel="name"  v-model="mode"></Dropdown>
      </div>
      <div v-if="mode.mode == 1" class="p-field p-col-12 p-md-12">
        <label>Mapuj kolumny csv</label>
        <CsvMap v-on:changed="onChangeCsvMap"></CsvMap>
      </div>
      <div class="p-col-12 p-md-12 p-justify-center">
        <Button :disabled="mode.mode==1" @click="upload" icon="pi pi-upload" label="Wrzuć" />
      </div>
    </div>
    <Message v-for="msg in messages" :severity="msg.severity" >{{ msg.content }}</Message>
    <Message v-if="mode.mode==1" :severity="warn" >Wybrany tryb jest obecnie niedostępny</Message>
  </div>
</template>

<script lang="ts">
import CsvMap from "./CsvMap.vue"
import FileInput from "./FileInput.vue";
import Message from "primevue/message";
import ProgressBar from 'primevue/progressbar';
import Dialog from "primevue/dialog";
import Button from 'primevue/button';
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import { ref, defineComponent } from 'vue'
import Textarea from "primevue/textarea";
import FileUpload from 'primevue/fileupload';
import http from '@/plugins/http';
import {AxiosError, AxiosResponse} from "axios";

export default defineComponent({
  components : {FileInput, Button,InputText,Dropdown,Textarea, Checkbox, FileUpload, Dialog, ProgressBar, Message, CsvMap},
  name: 'Form',
  data(){
    return{
      modes: [
        {name: 'W pliku', mode: '0'},
        {name: 'Definiowane', mode: '1'}
      ],
       file : <File> {},
       name  : "",
       description : "",
       separator : "",
       range : 1,
       messages : <{severity: string, content: string}[]> [],
       csvMap : [],
       mode : <{name: string, mode: string}> {},
       dialog : false
    }
  },
  methods:{
    upload(){
      if( !this.validate()){
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('name', this.name);
      formData.append('separator', this.separator);
      formData.append('description',this.description)
      if(this.mode.mode == '1'){
        formData.append('map',JSON.stringify(this.csvMap))
      }
      this.dialog = true
      http.post('/statistics',formData,{headers: {'Content-Type': 'multipart/form-data'}}).then( (data :AxiosResponse) =>{
        this.$toast.add({severity:'success', summary: 'Statytsyka wygenerowana', detail:'Przetwarznie zakończone sukcesem', life: 5000});
        this.$router.push({ name: 'StatisticsView', params: { id: data.data.id } })
      })
      .catch((e : AxiosError )=>{
        let msg = e?.response?.data?.message || "Unkown error"
        this.messages.push({ 'severity': 'error', 'content': msg})
      })
      .finally(() => this.dialog=false)
    },
    validate(){
      this.messages = []
      if(this.file == null){
        this.messages.push({ 'severity': 'warn', 'content': 'Wybierz plik'})
        return false
      }
      if(!this.name || this.name.length < 3){
        this.messages.push({ 'severity': 'warn', 'content': 'Nazwa musi zawierac conajmniej 3 znaki'})
        return false
      }
      if(!this.separator){
        this.messages.push({ 'severity': 'warn', 'content': 'Separator  jest wymagany'})
        return false
      }
      if (this.mode.mode !== '0' && this.mode.mode !== '1'){
        this.messages.push({ 'severity': 'warn', 'content': 'Wybierz tryb'})
        return false
      }
      if (this.mode.mode == '1' && !!this.csvMap){
        this.messages.push({ 'severity': 'warn', 'content': 'Uzupelnij mapowanie'})
        return false
      }
      return true
    },
    onFilePicked(file: File){
      this.file = file
    },
    onChangeCsvMap(data : []){
      this.csvMap = data
    }
  }
})
</script>

<style scoped>
label {
  margin: 0 0.5em;
  font-weight: bold;
}
button{
  margin-top: 2rem;
}
</style>
