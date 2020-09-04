import Vue from "nativescript-vue";

import Home from "./components/Home";

import store from './store';

new Vue({
    store,
    render: h => h('frame', [h(Home)]),
}).$start();
