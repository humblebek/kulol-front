import { getArticle, getArticles } from "@/api/articleApi";
import { defineStore } from "pinia";

export const useArticleStore = defineStore("store", {
    state: () => ({
        articles: []
    }),
    actions: {
        getArticles() {
            return new Promise((resolve, reject) => {
                getArticles()
                    .then(res => {
                        if(res['data']) {
                            this.articles = res['data'];
                        }

                        resolve(res['data']);
                    }).catch(error => {
                        reject(error);
                    });
            });
        },
        getArticle(id) {
            return new Promise((resolve, reject) => {
                getArticle(id)
                    .then(res => {
                        resolve(res['data']);
                    }).catch(error => {
                        reject(error);
                    });
            });
        }
    }
})