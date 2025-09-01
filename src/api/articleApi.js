import { $api } from "@/utils/api";

export function getArticles() {
    return $api(
        "/articles"
    );
}
export function getArticle(id) {
    return $api(
        "/articles/" + id
    );
}