import { i18n } from "@/plugins/i18n";

export function Rules(filterRules: any = []) {
  const map: any = {};
  for (let item of filterRules) {
    map[item] = { required: true, message: i18n.global.t("required") };
  }
  return map;
}

export function toValidateLang(rule: any, value: any): Promise<string> {
  return new Promise((resolve, reject): void => {
    if (
      value.uz?.trim() === "" ||
      value.ru?.trim() === "" ||
      value.oz?.trim() === "" ||
      value.en?.trim() === "" ||
      value.kz?.trim() === "" ||
      value.tj?.trim() === ""
    ) {
      reject(rule.message);
    } else {
      resolve(rule.message);
    }
  });
}

export function toSetFormData(
  obj: any,
  formData: FormData = new FormData(),
  parentKey: string | null = null
): FormData {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key]) && typeof obj[key][0] != "object") {
        obj[key] = obj[key].map((value: any) => {
          return { id: value };
        });
      }
      const value: any = obj[key];
      const prefixedKey: string = parentKey
        ? `${parentKey}${typeof key == "number" ? [{ key }] : key}`
        : key;

      if (Array.isArray(value)) {
        value.forEach((element: any, index: number): void => {
          if (typeof element === "object" && !(element instanceof File)) {
            toSetFormData(element, formData, `${prefixedKey}[${index}]`);
          } else {
            formData.append(`${prefixedKey}[${index}]`, element.id);
          }
        });
      } else if (
        (typeof value === "object" && value?.["uz"]) ||
        value?.["en"]
      ) {
        formData.append(key, JSON.stringify(obj[key]));
      } else if (typeof value === "object" && !(value instanceof File)) {
        toSetFormData(value, formData, prefixedKey);
      } else if (value) {
        formData.append(prefixedKey, value);
      }
    }
  }
  return formData;
}

export const toGetFormData = (form): FormData => {
  const formData = new FormData();

  Object.keys(form).forEach((_key) => {
    if (form[_key] != undefined) {
      if (typeof form[_key] == "object" && "uz" in form[_key]) {
        formData.append(_key, JSON.stringify(form[_key]));
      } else {
        formData.append(_key, form[_key]);
      }
    }
  });
  return formData;
};
export function generateRandomColors(length) {
  return Array.from({ length }, () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  });
}
