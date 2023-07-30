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
  name: "CategoriesUpdateForma",
  props: ['clicked'],

  mounted() {
    this.id = this.clicked.id
    this.createdAt = this.clicked.createdAt

    this.form.name = this.clicked.name
  },

  data() {
    return {
      id: 0,
      createdAt: '',
      form: {
        name: '',
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
      let obj = {table: 'categories', id: this.id, name: this.form.name, createdAt: this.createdAt, updatedAt: new Date()}
      this.put(obj)
    },
    onReset(event) {
      event.preventDefault()

      this.form.name = this.clicked.name

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