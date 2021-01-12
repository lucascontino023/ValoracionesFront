<template>
  <div
    class="p-2 pb-10 mt-12 max-w-2xl border bg-gray-100 rounded-lg border-gray-400 m-auto"
  >
    <div>
      <h1 class="pb-2 font-bold">Hola!</h1>
      <div>Suerte en la prueba!</div>
      <div>{{ test }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData() {
    const { data } = await axios.get(`http://localhost:3000/api/test`)

    return { test: data }
  },
}
</script>
