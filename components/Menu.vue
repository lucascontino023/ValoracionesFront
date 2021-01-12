<template>
  <ul class="flex flex-row space-x-2 justify-center">
    <li v-for="(item, index) in menu" :key="index">
      <nuxt-link
        class="py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
        :class="{ 'bg-gray-300 text-gray-900': $route.path === item.path }"
        :to="{ path: item.path }"
        >{{ item.label }}</nuxt-link
      >
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        { label: 'Inicio', path: '/' },
        { label: 'Valoraciones', path: '/valoraciones' },
      ],
    }
  },
}
</script>
