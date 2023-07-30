<template>
  <div>
    <Header subtitle="Notifications"/>

    <b-modal v-model="newModal">
      <NotificationsNewForma/>
    </b-modal>
    <b-modal v-model="updateModal">
      <NotificationsUpdateForma :clicked="selectedUpdate"/>
    </b-modal>

    <hr>

    <b-row id="searchBar">
      <b-col lg="6" class="my-1">
        <b-button
            class="btn btn-primary"
            variant="primary"
            @click="newForm()"
        >New Notification</b-button>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-groups
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-groups>
      </b-col>
    </b-row>

    <b-pagination
      v-model="currentPage"
      :total-rows="notifications.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
    <b-table
      id="image-table"
      hover
      fixed
      :filter="filter"
      :items="notifications"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(sent_at)="data">
        {{ new Date(data.item.sent_at) | formatDate}}
      </template>

      <template #cell(createdAt)="data">
        {{ new Date(data.item.createdAt) | formatDate}}
      </template>
      <template #cell(updatedAt)="data">
        {{ new Date(data.item.updatedAt) | formatDate}}
      </template>


      <template
          v-slot:cell(actions)="{item}">
        <b-button-group>
          <b-button
              class="btn btn-primary"
              variant="secondary"
              @click="updateForm(item)">Update</b-button>
          <b-button
              class="btn btn-danger"
              variant="danger"
              @click="deleteRow(item)">Delete</b-button>
        </b-button-group>
      </template>
    </b-table>
    <b-pagination
        v-model="currentPage"
        :total-rows="notifications.length"
        :per-page="perPage"
        aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';
  import NewForma from "@/components/Books/BooksNewForma";
  import UpdateForma from "@/components/Books/BooksUpdateForma";
  import Header from "@/components/Header";
  import CheckoutsUpdateForma from "@/components/Checkouts/CheckoutsUpdateForma";
  import CheckoutsNewForma from "@/components/Checkouts/CheckoutsNewForma";
  import HoldsUpdateForma from "@/components/Holds/HoldsUpdateForma";
  import HoldsNewForma from "@/components/Holds/HoldsNewForma";
  import NotificationsUpdateForma from "@/components/Notifications/NotificationsUpdateForma";
  import NotificationsNewForma from "@/components/Notifications/NotificationsNewForma";

  export default {
    name: 'Notifications',
    components: {
      NotificationsNewForma,
      NotificationsUpdateForma,
      HoldsNewForma, HoldsUpdateForma, CheckoutsNewForma, CheckoutsUpdateForma, Header, UpdateForma, NewForma},

    data() {
      return {
        fields: ['id', 'sent_at', 'contents', 'patron_id', 'createdAt', 'updatedAt', { key: "actions" }],
        items: [],
        currentPage: 1,
        perPage: 4,

        filter: null,

        selectedUpdate: {},
        updateModal: false,
        newModal: false,
      }
    },

    computed: {
      ...mapState([
        'notifications'
      ]),
    },

    mounted() {
      this.fetch('notifications');
    },

    methods: {
      ...mapActions([
        "fetch",
        'delete'
      ]),

      newForm() {
        this.newModal = !this.newModal
      },

      updateForm(record){
        this.updateModal = !this.updateModal
        this.selectedUpdate = record
      },

      deleteRow(record){
        let table = 'notifications'
        let id = record.id
        this.delete({table, id})
      }
    }
  }

</script>

<style scoped>
  #searchBar {
    padding-bottom: 1em;
  }

</style>