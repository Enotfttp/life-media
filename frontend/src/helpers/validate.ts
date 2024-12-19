export const emailRegexp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);

export const required = (value?: string | number) => {
  if (typeof value !== 'number' && !value) {
    return 'Данное поле обязательное';
  }
  if (Array.isArray(value) && !value.length) {
    return 'Данное поле обязательное';
  }
  return undefined;
};
