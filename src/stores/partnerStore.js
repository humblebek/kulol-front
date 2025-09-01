import { getBrands } from "@/api/partnerApi";
import { defineStore } from "pinia";

export const usePartnerStore = defineStore("partner", {
    state: () => ({
        brands: []
    }),
    actions: {
        getBrands() {
            return new Promise((resolve, reject) => {
                getBrands()
                    .then(res => {
                        if(res['data']) {
                            this.brands = res['data'];
                            resolve(res['data']);
                        }
                    }).catch(error => {
                        reject(error);
                    });
            });
        }
    }
})