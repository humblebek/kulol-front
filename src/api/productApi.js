import { $api } from "@/utils/api";

const endPoint = "/products"
export function getProducts(queries) {
    return $api(
        endPoint,
        {
            query: queries
    });
}

export function getProduct(id) {
    return $api(
        `${endPoint}/${id}`
    );
}
