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

      <b-form-group id="input-group-3" label="Book Copy Id:" label-for="input-3">
        <b-form-input
            id="input-3"
            v-model="form.book_copy_id"
            placeholder="Upisi book copy id"
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

      <b-form-group>
        <input type="checkbox" id="checkbox" v-model="form.is_returned">
        <label for="checkbox">is returned</label>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "CheckoutsNewForma",

  data() {
    return {
      id: 0,
      createdAt: '',
      form: {
        start_time: '',
        end_time: '',
        book_copy_id: 1,
        patron_id: 1,
        is_returned: false,
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
      let obj = {table: 'checkouts', id: this.id, start_time: this.form.start_time,
        end_time: this.form.end_time, book_copy_id: this.form.book_copy_id, patron_id: this.form.patron_id,
        is_returned: this.form.is_returned, createdAt: this.createdAt, updatedAt: new Date()}
      console.log(obj)
      this.post(obj)

    },
    onReset(event) {
      event.preventDefault()

      this.form.start_time = ''
      this.form.end_time = ''
      this.form.book_copy_id = 0
      this.form.patron_id = 0
      this.form.is_returned = false

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