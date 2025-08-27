import { getCategories } from "@/api/categoryApi";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        isLoading: false,
        categories: null,
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
                        if(res && res.data) {
                            this.categories = res['data'];
                        }
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