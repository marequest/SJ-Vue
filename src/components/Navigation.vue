<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-container>
        <b-navbar-brand to="/">Biblioteka</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>

            <b-nav-item-dropdown text="All Tables">
              <b-dropdown-item
                  v-for="item in tables"
                  :key="item"
                  :to="`/${item}`">
                {{ item }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
            <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
            <b-nav-item v-else @click="logout()">Log Out</b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>

import {mapActions, mapMutations, mapState} from "vuex";

export default {
    name: 'Navigation',

  computed: {
    ...mapState([
      'tables',
      'token'
    ])
  },

  mounted() {
    this.fetchTables();

    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  },

  methods: {
    ...mapActions([
      "fetchTables"
    ]),

    ...mapMutations([
      'removeToken',
      'setToken'
    ]),

    logout() {
      this.removeToken();
    }
  },
  }

</script>

<style scoped>

</style>