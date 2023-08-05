import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myTruncatePlugin = store => {
  store.refreshTable = function({ commit }, table) {
    fetch('https://biblioteka-rest.onrender.com/' + table)
        .then( obj => obj.json() )
        .then( res => {
          switch (table) {
            case 'books':
              commit('addBooks', res)
              break;
            case 'authors':
              commit('addAuthors', res)
              break;
            case 'users':
              commit('addUsers', res)
              break;
            case 'patrons':
              commit('addPatrons', res)
              break;
            case 'checkouts':
              commit('addCheckouts', res)
              break;
            case 'holds':
              commit('addHolds', res)
              break;
            case 'waitlists':
              commit('addWaitlists', res)
              break;
            case 'notifications':
              commit('addNotifications', res)
              break;
            case 'categories':
              commit('addCategories', res)
              break;
            case 'bookcopies':
              commit('addBookcopies', res)
              break;
            case 'bookauthors':
              commit('addBookauthors', res)
              break;
            default:
              console.log("Wrong table name passed to fetch.")
              break;
          }
        });
  }
}

export default new Vuex.Store({
  state: {
    tables: [],
    token: '',
    books: [],
    authors: [],
    users: [],
    patrons: [],
    checkouts: [],
    holds: [],
    waitlists: [],
    notifications: [],
    categories: [],
    bookcopies: [],
    bookauthors: [],
  },

  plugins: [myTruncatePlugin],

  mutations: {
    addTables(state, items) {
      state.tables = (items);
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },


    addBooks(state, items) {
      state.books = (items);
    },
    addBook(state, item) {
      state.books.push(item);
    },

    addAuthors(state, items) {
      state.authors = (items);
    },
    addAuthor(state, item) {
      state.authors.push(item);
    },

    addUsers(state, items) {
      state.users = (items);
    },
    addUser(state, item) {
      state.users.push(item);
    },

    addPatrons(state, items) {
      state.patrons = (items);
    },
    addPatron(state, item) {
      state.patrons.push(item);
    },

    addCheckouts(state, items) {
      state.checkouts = (items);
    },
    addCheckout(state, item) {
      state.checkouts.push(item);
    },

    addHolds(state, items) {
      state.holds = (items);
    },
    addHold(state, item) {
      state.holds.push(item);
    },

    addWaitlists(state, items) {
      state.waitlists = (items);
    },
    addWaitlist(state, item) {
      state.waitlists.push(item);
    },

    addNotifications(state, items) {
      state.notifications = (items);
    },
    addNotification(state, item) {
      state.notifications.push(item);
    },

    addCategories(state, items) {
      state.categories = (items);
    },
    addCategorie(state, item) {
      state.categories.push(item);
    },

    addBookcopies(state, items) {
      state.bookcopies = (items);
    },
    addBookcopie(state, item) {
      state.bookcopies.push(item);
    },

    addBookauthors(state, items) {
      state.bookauthors = (items);
    },
    addBookauthor(state, item) {
      state.bookauthors.push(item);
    },
  },

  actions: {
    fetchTables({ commit }) {
      commit('addTables', ['users', 'authors', 'books', 'patrons', 'checkouts', 'holds', 'waitlists', 'notifications',
        'categories', 'bookcopies', 'bookauthors'])
    },

    fetch({ commit }, table) {
      this.refreshTable({commit}, table)
    },

    delete({ commit }, obj) {
      let table = obj.table

      fetch('https://biblioteka-rest.onrender.com/' + table + '/obrisi/' + obj.id,
          { method: 'DELETE' })
          .then( obj => obj.json())
          .then( res => {
            this.refreshTable({commit}, table)
          });
    },

    put({ commit }, obj) {
      let table = obj.table
      delete obj.table

      fetch('https://biblioteka-rest.onrender.com/' + table + '/' + obj.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })  .then( res => res.json() )
          .then( res => {
            this.refreshTable({commit}, table)
          });
    },

    post({ commit }, obj) {
      let table = obj.table
      delete obj.table

      fetch('https://biblioteka-rest.onrender.com/' + table + '/dodaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( res => {
            commit('addBook', res)
            console.log(res)
            this.refreshTable({commit}, table)
          });
    },

    register({ commit }, obj) {
      fetch('https://biblioteka-auth.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch('https://biblioteka-auth.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
          .then( tkn => {
            if (tkn.msg) {
              alert(tkn.msg);
            } else {
              commit('setToken', tkn.token)
            }
          });
    },
  }
})
