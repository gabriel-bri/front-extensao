import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Ajuste conforme necessário
});

export const getColmeias = async () => {
  const response = await api.get("/colmeias");
  return response.data;
};

export const createColmeia = async (data) => {
  const response = await api.post("/colmeias", data);
  return response.data;
};

export const getColmeiaById = async (id) => {
  if (!id) return null; // Evita chamadas com ID indefinido
  
  const response = await axios.get(`/colmeias/${id}`);
  return response.data;
};

export const updateColmeia = async (id, data) => {
  const response = await api.put(`/colmeias/${id}`, data);
  return response.data;
};

export const deleteColmeia = async (id) => {
  await api.delete(`/colmeias/${id}`);
};

export default api;
