import { getMedias } from "@/api/mediaApi";
import { defineStore } from "pinia";

export const useMediaStore = defineStore("media", {
    state: () => ({
        medias: [],
        pagination: {
             current_page: 1,
            per_page: 0,
            total: 0
        }
    }),
    actions: {
        getMedias(queries) {
            return new Promise((resolve, reject) => {
                getMedias({
                    ...queries
                }).then((res) => {
                    this.medias = [...this.medias, ...res['data']];
                    this.pagination = res['meta'];
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
})