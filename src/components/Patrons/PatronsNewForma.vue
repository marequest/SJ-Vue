<template>
  <div>
    <b-form @submit="onSubmit"
            @reset="onReset"
            v-if="show" >
      <b-form-group
          id="input-group-1"
          label="First Name:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.first_name"
            type="text"
            size="lg"
            placeholder="Upisi ime"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Surname:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.surname"
            type="text"
            size="lg"
            placeholder="Upisi prezime"
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
        <input type="checkbox" id="checkbox" v-model="form.status">
        <label for="checkbox">is status</label>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!validationEmail">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "PatronsNewForma",

  data() {
    return {
      id: 0,
      createdAt: '',
      form: {
        first_name: '',
        surname: '',
        email: '',
        status: false,
      },
      show: true,
    }
  },
  methods: {
    ...mapActions([
      'post'
    ]),

    onSubmit(event) {
      event.preventDefault()
      let obj = {table: 'patrons', id: 0, first_name: this.form.first_name, surname: this.form.surname, email: this.form.email, status: this.form.status, createdAt: new Date(), updatedAt: new Date()}
      console.log(obj)
      this.post(obj)

    },
    onReset(event) {
      event.preventDefault()

      this.form.first_name = ''
      this.form.surname = ''
      this.form.email = ''
      this.form.status = false

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