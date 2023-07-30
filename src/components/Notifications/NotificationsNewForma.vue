<template>
  <div>
    <b-form @submit="onSubmit"
            @reset="onReset"
            v-if="show" >
      <b-form-group
          id="input-group-1"
          label="Sent  at:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.sent_at"
            type="text"
            size="lg"
            placeholder="Upisi sent at time"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Contents:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.contents"
            type="text"
            size="lg"
            placeholder="Upisi content"
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
  name: "NotificationsNewForma",

  mounted() {
    this.form.sent_at = new Date()
    this.form.contents = ''
    this.form.patron_id = 0
  },

  data() {
    return {
      form: {
        sent_at: '',
        contents: '',
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
      let obj = {table: 'notifications', 
        id: this.id, sent_at: this.form.sent_at, contents: this.form.contents, patron_id: this.form.patron_id,
        createdAt: this.createdAt, updatedAt: new Date()}
      console.log(obj)
      this.post(obj)

    },
    onReset(event) {
      event.preventDefault()

      this.form.sent_at = new Date()
      this.form.contents = ''
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