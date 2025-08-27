import { ref } from "vue";

export const LANG_STORAGE_KEY = "lang";
export const DOCUMENT_DIRECTION = "document_direction";

export const navItems = ref([
    {
        to: '/',
        text: 'Home',

    },
     {
        to: '/products',
        text: 'Products',

    },
    {
        to: '/about-us',
        text: 'About us',
    },
    {
        to: '/media',
        text: 'Media',
    },
    {
        to: '/contact',
        text: 'Contact',

    },
])