<template>
  <div>
    <div class="center">
      <Form></Form>
    </div>

  </div>
</template>

<script lang="ts">
import Button from 'primevue/button';
import InputText from "primevue/inputtext";
import Form from "@/components/Form.vue";
import { ref, defineComponent } from 'vue'
export default defineComponent({
  components : { Button,InputText,Form },
  name: 'About',
  setup: () => {
    const count = ref(0)
    const cities = ref([])
    const fieldId = 0
    return { count,cities,fieldId }
  }
})
</script>

<style scoped>
.center{
  max-width:400px;
  margin: auto;
}
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
