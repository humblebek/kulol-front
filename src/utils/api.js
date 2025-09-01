// import { useCookie } from '@/@core/composable/useCookie'
// import { router } from '@/plugins/1.router'
// import { ability } from '@/plugins/casl/ability'
// import { _i18n } from '@/plugins/i18n'
import { ofetch } from 'ofetch'

import { useGlobalOverlay } from '@/composable/useGlobalOverlay'
import { i18n } from '@/plugins/i18n';
const { show, hide } = useGlobalOverlay()
export const $api = ofetch.create({
  // timeout: 5000,
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  async onRequest({ options }) {
    // const accessToken = useCookie('accessToken').value
    // if (accessToken) {
      options.headers = {
        ...options.headers,
        "Accept-Language": i18n.global.locale.value,
        'Content-Language': i18n.global.locale.value,
        // Authorization: `Bearer ${accessToken}`,
      }
    // }
    show();
  },
  async onRequestError(error) {
    hide();
    // toast.error("Request error")
    //   toast.error(_i18n.global.t("Server Error: An internal server error occurred."))
  },
  async onResponseError(error) {
    hide();
    // if(error.response.status == 500) {
    // } else 
    // if(error.response.status == 401) {
    //   useCookie('accessToken').value = null
    //   useCookie('userData').value = null
    //   useCookie("userAbilityRules").value = null
    //   useLocalStorage("studentData").value = null
    //   ability.update([]);
    //   router.push('/login');
    //   toast.error(error.response?._data.message)
    // }
  },
  async onResponse(response) {
    hide();
    return response;
  }
});