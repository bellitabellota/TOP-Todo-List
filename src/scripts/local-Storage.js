export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key) => {
  const jsonData = localStorage.getItem(key);
  return jsonData ? JSON.parse(jsonData) : null;
};