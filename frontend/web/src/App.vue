<template>
  <div id="app">
    <Navbar/>
    <router-view />
  </div>
</template>


<script>
import Navbar from './components/Navbar'

export default {
  name:"App",

  components: {
    Navbar
  },

  data: function() {
    return {

    }
  }
}
</script>


<style>

  :root{
    background:aquamarine
  }

  
</style>
