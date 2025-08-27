import { getProduct, getProducts } from "@/api/productApi";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
    state: () => ({
        products: null,
        pagination: {
            current_page: 1,
            per_page: 0,
            total: 0
        },
        isLoading: false
    }),
    actions: {
        getProducts(queries) {
            this.isLoading = true;
            return new Promise((resolve, reject) => {
                getProducts(queries)
                    .then(res => {
                        this.products = res['data'];
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    }).finally(() => {
                        this.isLoading = false;
                    });
            });
        },
        getProduct(id) {
            this.isLoading = true;
            return new Promise((resolve, reject) => {
                getProduct(id)
                    .then(res => {

                        resolve(res['data']);
                    }).catch(error => {
                        reject(error);
                    }).finally(() => {
                        this.isLoading = false;
                    });
            })
        }
    }
})