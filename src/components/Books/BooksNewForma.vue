<template>
  <div>
    <b-form @submit="onSubmit"
            @reset="onReset"
            v-if="show" >
      <b-form-group
          id="input-group-1"
          label="Title:"
          label-for="input-1">
        <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            size="lg"
            placeholder="Upisi title"
            required
            :state="validation"
        ></b-form-input>
        <b-form-valid-feedback :state="validation">
          Looks Good ✅
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group id="input-group-3" label="Category Id:" label-for="input-3">
        <b-form-input
            id="input-3"
            v-model="form.categoryId"
            placeholder="Upisi category Id"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!validation">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "NewForma",
  data() {
    return {
      form: {
        title: '',
        categoryId: 0,
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
      let obj = {table: 'books', id: null, title: this.form.title, createdAt: new Date(), updatedAt: new Date(), categoryId: this.form.categoryId}
      this.post(obj)

      this.form.title = ''
      this.form.categoryId = 0
    },
    onReset(event) {
      event.preventDefault()

      this.form.title = ''
      this.form.categoryId = 0

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
    validation() {
      return this.form.title.length > 2;
    }
  }
}
</script>

<style scoped>

</style>