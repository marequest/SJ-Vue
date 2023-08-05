import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Books from "@/views/routes/Books";
import Authors from "@/views/routes/Authors";
import Users from "@/views/routes/Users";
import Patrons from "@/views/routes/Patrons";
import Checkouts from "@/views/routes/Checkouts";
import Holds from "@/views/routes/Holds";
import Waitlists from "@/views/routes/Waitlists";
import Notifications from "@/views/routes/Notifications";
import Categories from "@/views/routes/Categories";
import Bookcopies from "@/views/routes/Bookcopies";
import Bookauthors from "@/views/routes/Bookauthors";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/patrons',
    name: 'Patrons',
    component: Patrons,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/checkouts',
    name: 'Checkout',
    component: Checkouts,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/holds',
    name: 'Holds',
    component: Holds,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/waitlists',
    name: 'Waitlists',
    component: Waitlists,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/bookcopies',
    name: 'Bookcopies',
    component: Bookcopies,
    meta: {
      authRequired: true
    }
  },
  {
    path: '/bookauthors',
    name: 'Bookauthors',
    component: Bookauthors,
    meta: {
      authRequired: true
    }
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const jwt = localStorage.token;

    if (!jwt) {
      next({name: 'Login'});
      return;
    }

    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const expDate = new Date(payload.exp * 1000);
    if (expDate < new Date()) {
      next({name: 'login'});
      return;
    }
  }

  next();
});

export default router;
