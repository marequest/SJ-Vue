<template>
  <div>
    <b-form @submit="onSubmit"
            @reset="onReset"
            v-if="show" >

      <b-form-group id="input-group-1" label="Book Id:" label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.book_id"
            placeholder="Upisi book Id"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Author Id:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="form.author_id"
            placeholder="Upisi author Id"
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
  name: "BookauthorsNewForma",

  mounted() {

    this.form.book_id = 0
    this.form.author_id = 0
  },

  data() {
    return {
      id: 0,
      createdAt: '',
      form: {
        book_id: 0,
        author_id: 0
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
      let obj = {table: 'bookauthors', id: 0, book_id: this.form.book_id, author_id: this.form.author_id, createdAt: new Date(), updatedAt: new Date()}
      this.post(obj)
    },
    onReset(event) {
      event.preventDefault()

      this.form.book_id = 0
      this.form.author_id = 0

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