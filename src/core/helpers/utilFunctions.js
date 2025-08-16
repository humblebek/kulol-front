export function safeGet(object, keys, defaultVal) {
  keys = Array.isArray(keys) ? keys : String(keys).split('.');

  if (object == null) return defaultVal;         

  const value = object[keys[0]];

  if (keys.length > 1) {
    return safeGet(value, keys.slice(1), defaultVal); 
  }

  return value === undefined ? defaultVal : value;
}


