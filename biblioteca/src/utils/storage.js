export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromStorage = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro ao carregar dados do localStorage", error);
    return [];
  }
};