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
  name: "HoldsUpdateForma",
  props: ['clicked'],
  mounted() {
    this.id = this.clicked.id
    this.createdAt = this.clicked.createdAt

    this.form.start_time = this.clicked.start_time
    this.form.end_time = this.clicked.end_time
    this.form.book_id = this.clicked.book_id
    this.form.patron_id = this.clicked.patron_id
  },

  data() {
    return {
      id: 0,
      createdAt: '',
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
      'put'
    ]),

    onSubmit(event) {
      event.preventDefault()
      let obj = {table: 'holds', id: this.id, start_time: this.form.start_time,
        end_time: this.form.end_time, book_id: this.form.book_id, patron_id: this.form.patron_id,
        createdAt: this.createdAt, updatedAt: new Date()}
      console.log(obj)
      this.put(obj)

    },
    onReset(event) {
      event.preventDefault()

      this.form.start_time = this.clicked.start_time
      this.form.end_time = this.clicked.end_time
      this.form.book_id = this.clicked.book_id
      this.form.patron_id = this.clicked.patron_id

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