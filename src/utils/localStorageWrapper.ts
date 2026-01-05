// API Key Methods:
// localStorage.setItem('YourItem', response.data)
// localStorage.getItem('YourItem')
// localStorage.removeItem('YourItem')

export const readLocalStorage = (key: string) => {
  const stor_string = localStorage.getItem(key);
  const stor_obj = JSON.parse(stor_string) || {};
  return stor_obj;
};

export const writeLocalStorage = (key: string, value: object) => {
  const stor_string = JSON.stringify(value);
  localStorage.setItem(key, stor_string);
  return;
};
