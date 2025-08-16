import { $api } from "@/utils/api";

const endPoint = "/categories"
export function getCategories() {
    return $api(
        endPoint
    )
}