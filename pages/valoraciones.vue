<template>
  <div class="container mx-auto">
    <div class="pb-5">
      <h1 class="text-4xl text-green-400">Valoraciones del Producto</h1>
      <h2 class="text-xl">Aquí puedes consultar las últimas valoraciones que los usuarios han hecho sobre este producto.</h2>
    </div>
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
        <div v-for="(item, i) in array" :key="i" class="border p-5 m-3">
          <div>iocono {{ item.rating }}</div>
          <div><span class="text-xs text-gray-500">{{ item.author }} {{ formatFecha(item.date) }}</span></div>
          <div class="py-5 text-lg"><span>{{ item.comment }}</span></div>
          <div>
            <button @click="esUtiliClick(i)" class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 inline-flex items-center">
               <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
               <span>Es Util</span>
            </button><span class="text-gray-500 pl-2">{{ item.useful_count }} personas créiis que es útil</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

export default {
    data: () => ({
        array: [],
        indexButton: ''
    }),
    computed: {},
    watch: {},
    created() {
      this.listarValoraciones()
    },
    methods: {
      async listarValoraciones(){
      await axios.get(`http://localhost:3000/api/valoraciones`)
      .then((response) => {
      this.array = response.data.reviews
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    formatFecha (e) {
      return 'el ' + moment(e).format('dddd') + ', ' + moment(e).format('LL')
    },
    esUtiliClick (i) {
      this.indexButton = i
    }
    }
}
</script>
