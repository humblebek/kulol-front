import { $api } from "@/utils/api";

export function getMedias(queries) {
    return $api(
        "/media",
        {
            query: queries
        }
    );
}