import { $api } from "@/utils/api"

export function getBrands() {
    return $api(
        "/brands"
    );
}