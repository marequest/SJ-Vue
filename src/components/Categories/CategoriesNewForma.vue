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
            :state="validation"
        ></b-form-input>
        <b-form-valid-feedback :state="validation">
          Looks Good ✅
        </b-form-valid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!validation">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "CategoriesNewForma",

  mounted() {
    this.form.name = ''
  },

  data() {
    return {
      form: {
        name: '',
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
      let obj = {table: 'categories', id: null, name: this.form.name, createdAt: new Date(), updatedAt: new Date()}
      this.post(obj)
    },
    onReset(event) {
      event.preventDefault()

      this.form.name = ''

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
      return this.form.name.length > 2;
    }
  }
}
</script>

<style scoped>

</style>