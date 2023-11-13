// ****************************************************************************************
// *** Based on https://github.com/douglascrockford/JSON-js/blob/master/cycle.js **********
// *** Open the link to find more information and an explanation of the implementation. ***
// ****************************************************************************************

export function decycle(
  value: any,
  replacer?: (obj: any) => void,
  objects = new WeakMap(),
  path = "$"
) {
  let old_path;
  let nu: any;

  if (replacer !== undefined) {
    value = replacer(value);
  }

  if (
    typeof value === "object" &&
    value !== null &&
    !(value instanceof Boolean) &&
    !(value instanceof Date) &&
    !(value instanceof Number) &&
    !(value instanceof RegExp) &&
    !(value instanceof String)
  ) {
    old_path = objects.get(value);
    if (old_path !== undefined) {
      return { $ref: old_path };
    }

    objects.set(value, path);

    if (Array.isArray(value)) {
      nu = [];
      value.forEach(
        (element, i) =>
          (nu[i] = decycle(element, replacer, objects, path + "[" + i + "]"))
      );
    } else {
      nu = {};
      Object.keys(value).forEach((name) => {
        nu[name] = decycle(
          value[name],
          replacer,
          objects,
          path + "[" + JSON.stringify(name) + "]"
        );
      });
    }
    return nu;
  }
  return value;
}

const px =
  /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\(?:[\\"/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;

export function retrocycle(value: any, $?: any) {
  if ($ === undefined) $ = value;

  if (value && typeof value === "object") {
    if (Array.isArray(value)) {
      value.forEach(function (element, i) {
        if (typeof element === "object" && element !== null) {
          const path = element.$ref;
          if (typeof path === "string" && px.test(path)) {
            value[i] = eval(path);
          } else {
            retrocycle(element, $);
          }
        }
      });
    } else {
      Object.keys(value).forEach(function (name) {
        const item = value[name];
        if (typeof item === "object" && item !== null) {
          const path = item.$ref;
          if (typeof path === "string" && px.test(path)) {
            value[name] = eval(path);
          } else {
            retrocycle(item, $);
          }
        }
      });
    }
  }
  return value;
}
