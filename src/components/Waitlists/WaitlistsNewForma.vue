<template>
  <div>
    <b-form @submit="onSubmit"
            @reset="onReset"
            v-if="show" >

      <b-form-group id="input-group-1" label="Patron Id:" label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.patron_id"
            placeholder="Upisi category Id"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Book Id:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.book_id"
            placeholder="Upisi category Id"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "WaitlistsNewForma",

  mounted() {
    this.form.patron_id = 0
    this.form.book_id = 0
  },

  data() {
    return {
      form: {
        patron_id: 0,
        book_id: 0,
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
      let obj = {table: 'waitlists', id: null, patron_id: this.form.patron_id, book_id: this.form.book_id, createdAt: new Date(), updatedAt: new Date()}
      this.post(obj)
    },
    onReset(event) {
      event.preventDefault()

      this.form.patron_id = 0
      this.form.book_id = 0

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },

  },
  watch: {
  },
}
</script>

<style scoped>

</style>