import { getCategories } from "@/api/categoryApi";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        isLoading: false,
        products: null,
        pagination: {
            current_page: 1,
            per_page: 0,
            total: 0
        }
    }),
    actions: {
        getCategories(queries) {
            this.isLoading = true;
            return new Promise((resolve, reject) => {
                getCategories(queries)
                    .then(res => {
                        console.log(res);
                        resolve(res['data'])
                    }).catch(err => {
                        reject(err);
                    }).finally(() => {
                        this.isLoading = false;
                    });
            });
        },

     }
}) 