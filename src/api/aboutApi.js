import { $api } from "@/utils/api";

export function getAbouts(queries) {
    return $api(
        "/abouts",
        {
            query: queries
        }
    );
}