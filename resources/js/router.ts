import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "js/chunks/home" */ '@/js/pages/Home'),
            meta: {
                auth: undefined,
            }
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import(/* webpackChunkName: "js/chunks/contact" */ '@/js/pages/Contact'),
            meta: {
                title: 'Contact',
                auth: undefined,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunkName: "js/chunks/register" */ '@/js/pages/Register'),
            meta: {
                title: 'Registreren',
                auth: false,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "js/chunks/login" */ '@/js/pages/Login'),
            meta: {
                title: 'Log in',
                auth: false,
            }
        },
        {
            path: '/app/dashboard',
            name: 'dashboard',
            component: () => import(/* webpackChunkName: "js/chunks/dashboard" */ '@/js/pages/Dashboard'),
            meta: {
                title: 'Dashboard',
                auth: true,
            }
        },
        {
            path: '/app',
            redirect: { name: 'dashboard'},
        },
        {
            path: '*',
            name: 'error404',
            component: () => import(/* webpackChunkName: "js/chunks/error404" */ '@/js/pages/Error404'),
            meta: {
                title: 'Error 404',
                auth: undefined,
            }
        }
    ],
});

router.beforeEach((to: any, from: any, next: any) => {
    document.title = to.meta.title ? to.meta.title + ' - Broussel' : 'Broussel';
    next();
});

router.afterEach((to: any, from: any) => {
    document.getElementsByTagName('header')[0].className = '';
    document.body.className = '';
    let whiteBackgroundPages = ['contact'];

    if (to.name == 'home') {
        document.body.className = 'bg-svg';
    }
    else if (whiteBackgroundPages.indexOf(to.name) == -1) {
        document.body.className = 'bg-gradient';
    }
    else {
        document.getElementsByTagName('header')[0].className = 'bg-gradient header-border';
    }
});

export default router;
