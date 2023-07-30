<template>
  <div>
    <b-form @submit="onSubmit"
            @reset="onReset"
            v-if="show" >
      <b-form-group
          id="input-group-1"
          label="Name:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            size="lg"
            placeholder="Upisi name"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            size="lg"
            placeholder="Upisi email"
            required
            :state="validationEmail"
        ></b-form-input>
        <b-form-valid-feedback :state="validationEmail">
          Looks Good ✅
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group>
        <input type="checkbox" id="checkbox" v-model="form.admin">
        <label for="checkbox">is admin</label>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!validationEmail">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "UsersUpdateForma",
  props: ['clicked'],
  mounted() {
    this.id = this.clicked.id
    this.createdAt = this.clicked.createdAt

    this.form.name = this.clicked.name
    this.form.admin = this.clicked.admin
    this.form.email = this.clicked.email
  },

  data() {
    return {
      id: 0,
      createdAt: '',
      form: {
        name: '',
        admin: false,
        email: '',
      },
      show: true,
    }
  },
  methods: {
    ...mapActions([
      'put'
    ]),

    onSubmit(event) {
      event.preventDefault()
      let obj = {table: 'users', id: this.id, name: this.form.name, password: this.clicked.password, admin: this.form.admin, email: this.form.email, createdAt: this.createdAt, updatedAt: new Date()}
      this.put(obj)

    },
    onReset(event) {
      event.preventDefault()

      this.form.name = this.clicked.name
      this.form.admin = this.clicked.admin
      this.form.email = this.clicked.email

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

  },
  watch: {
  },
  computed: {
    validationEmail() {
      var re = /\S+@\S+\.\S+/;
      return re.test(this.form.email);
    }
  }
}
</script>

<style scoped>

</style>