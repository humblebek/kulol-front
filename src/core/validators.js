export const isEmpty = (v) => !v || !String(v).trim()
export const required = (label) => (v) => !isEmpty(v) || `${label} majburiy`

// Email va telefon tekshirish (E.164: ixtiyoriy +, 8–15 raqam)
export const emailRe = /\S+@\S+\.\S+/
export const phoneRe = /^\+?[1-9]\d{7,14}$/

export const accessRule = (v) => {
  if (isEmpty(v)) return 'Telefon yoki email majburiy'
  return (emailRe.test(v) || phoneRe.test(v)) || 'Telefon (E.164) yoki email kiriting'
}