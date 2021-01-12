<template>
  <div class="container mx-auto">
    <div class="pb-5 ml-3">
      <h1 class="text-4xl text-green-400">Valoraciones del Producto</h1>
      <h2 class="text-xl">Aquí puedes consultar las últimas valoraciones que los usuarios han hecho sobre este producto.</h2>
    </div>
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start">
        <div v-for="(item, i) in arrayInicialSeteado" :key="i" class="border p-5 m-3">
          <div><svg v-for="(itemEstrella, index) in 5" :key="index" :class="estrella('inline-flex h-5 w-5 text-yellow-500', itemEstrella, item)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg><span class="pl-3">{{ formatPuntuacion(item.rating) }}</span></div>
          <div><span class="text-sm text-gray-500">{{ item.author }} {{ formatFecha(item.date) }}</span></div>
          <div class="py-5 text-lg"><span>{{ item.comment }}</span></div>
          <div>
            <button @click="esUtiliClick(i, item)" :disabled="item.disabled" :class="item.claseButon">
               <svg class="inline-flex h-5 w-5 fill-current text-white-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
               <span class="pl-3">Es Util</span>
            </button><span class="text-gray-500 pl-2">{{ item.useful_count }} {{ item.creen }}</span>
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
        arrayInicial: [],
        arrayInicialSeteado: [],
        clickeados: []
    }),
    computed: {
      itemsValoraciones: {
            // getter
            get() {
              const arrayInicialValoracion = []
              this.arrayInicial.map((item, index) => {
                arrayInicialValoracion.push({
                  author: item.author,
                  comment: item.comment,
                  date: item.date,
                  rating: item.rating,
                  useful_count: item.useful_count,
                  claseButon: 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow inline-flex items-center',
                  disabled: false,
                  creen: 'personas creen que es útil'
                })
              })
            return arrayInicialValoracion
            },
            // setter
            set(i) {
              this.arrayInicialSeteado[i].claseButon = 'cursor-not-allowed py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 inline-flex items-center'
              this.arrayInicialSeteado[i].useful_count = this.arrayInicial[i].useful_count + 1
              this.arrayInicialSeteado[i].disabled = false
              this.arrayInicialSeteado[i].creen = 'personas créiis que es útil'
              return this.arrayInicialSeteado
            }
        }
    },
    watch: {
      itemsValoraciones (e) {
        this.arrayInicialSeteado = this.itemsValoraciones
      }
    },
    created() {
      this.listarValoraciones()
      this.arrayInicial = this.itemsValoraciones
    },
    methods: {
      async listarValoraciones(){
      await axios.get(`http://localhost:3000/api/valoraciones`)
      .then((response) => {
      this.arrayInicial = response.data.reviews
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    formatFecha (fecha) {
      return 'el ' + moment(fecha).format('dddd') + ', ' + moment(fecha).format('LL')
    },
    formatPuntuacion (valor) {
      let puntuacion = valor.lenght > 1 ? valor : valor + ',0'
      return puntuacion
    },
    estrella (clase, estrellas, index) {
      return index.rating >=  estrellas ? clase + ' fill-current' : clase
      },
    esUtiliClick (i, item) {
      this.itemsValoraciones = i
      }
    }
}
</script>
