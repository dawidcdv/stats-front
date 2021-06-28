<template>
  <div>
        <label for="file-input">Plik</label>
        <InputText @click="chooseFile" id="file-input" readonly v-model="fileName" type="text" />
        <input id="file" type="file" hidden  @change="onFilePicked"/>
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import { ref, defineComponent } from 'vue'

export default defineComponent({
  components : {InputText},
  name: 'FileInput',
  setup: () => {
    const file = <File | null> null
    const fileName = ref("")
    return { file, fileName}
  },
  methods:{
    chooseFile(){
      document.getElementById("file")?.click()
    },
    onFilePicked (event : Event) {
      const input = event.target as HTMLInputElement;

      if (!input.files?.length) {
        return;
      }

      let file = input.files[0]
      if (file !== undefined) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        this.fileName = file.name
        this.file = file
        this.$emit('choosen', this.file)
      } else {
        this.fileName = ''
        this.file = null
      }
    },

  }
})
</script>

<style scoped>
label {
  margin: 0 0.5em;
  font-weight: bold;
}
</style>
