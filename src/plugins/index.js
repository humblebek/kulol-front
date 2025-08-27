import { i18n } from "./i18n"
import {
  VueSpinnersPlugin,
} from 'vue3-spinners'


import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file

export const registerPlugins = (app) => {
    app.use(VueSpinnersPlugin);

    app.use(i18n);
    app.use(VueAwesomePaginate);
}