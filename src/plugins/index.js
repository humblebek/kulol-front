import { i18n } from "./i18n"
import {
  VueSpinnersPlugin,
} from 'vue3-spinners'

import { createHead } from '@unhead/vue/client'

import VueAwesomePaginate from "vue-awesome-paginate";
import { Head } from "@unhead/vue/components";

// import the necessary css file

export const registerPlugins = (app) => {
  const head = createHead()

    app.use(VueSpinnersPlugin);

    app.use(head);
    app.use(i18n);
    app.use(VueAwesomePaginate);
    app.component("Head", Head)
}