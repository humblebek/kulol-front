import { getAbouts } from "@/api/aboutApi";
import { defineStore } from "pinia";

export const useAboutStore = defineStore("about", {
    state: () => ({
        abouts: null,
        pagination: {
            current_page: 1,
            per_page: 10,
            total: 0
        }
    }),
    actions: {
        getAbouts(queries) {
            return new Promise((resolve, reject) => {
                getAbouts(queries).then((res) => {
                    this.abouts = res['data'];
                    this.pagination = res['meta'];
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        getAbout(queries) {
            return new Promise((resolve, reject) => {
                getAbouts(queries).then((res) => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })

        }
    }
})