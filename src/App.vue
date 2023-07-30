<template>
  <div id="app">
    <Navigation/>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>

  import { mapActions, mapState, mapMutations } from 'vuex';
  import Navigation from "@/components/Navigation";

  export default {
    name: 'App',
    components: {Navigation},
    data() {
      return {

      }
    },
  }
</script>

<style>

</style>
