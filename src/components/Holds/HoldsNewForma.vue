<template>
  <div>
    <b-form @submit="onSubmit"
            @reset="onReset"
            v-if="show" >
      <b-form-group
          id="input-group-1"
          label="Start time:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.start_time"
            type="text"
            size="lg"
            placeholder="Upisi start time"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="End time:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.end_time"
            type="text"
            size="lg"
            placeholder="Upisi end time"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Book Id:" label-for="input-3">
        <b-form-input
            id="input-3"
            v-model="form.book_id"
            placeholder="Upisi book id"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Patron Id:" label-for="input-3">
        <b-form-input
            id="input-3"
            v-model="form.patron_id"
            placeholder="Upisi patron id"
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
  name: "HoldsNewForma",

  mounted() {
    const d = new Date()
    d.setMonth(d.getMonth() + 1)

    this.form.start_time = new Date()
    this.form.end_time = d
    this.form.book_id = 0
    this.form.patron_id = 0
  },

  data() {
    return {
      form: {
        start_time: '',
        end_time: '',
        book_id: 0,
        patron_id: 0,
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
      let obj = {table: 'holds', id: 0, start_time: this.form.start_time,
        end_time: this.form.end_time, book_id: this.form.book_id, patron_id: this.form.patron_id,
        createdAt: new Date(), updatedAt: new Date()}
      console.log(obj)
      this.post(obj)

    },
    onReset(event) {
      event.preventDefault()

      const d = new Date()
      d.setMonth(d.getMonth() + 1)

      this.form.start_time = new Date()
      this.form.end_time = d
      this.form.book_id = 0
      this.form.patron_id = 0

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