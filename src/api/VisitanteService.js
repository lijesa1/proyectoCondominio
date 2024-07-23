import axios from "axios";
const API_URL = 'http://localhost:8083/visitantes';

export async function saveVisitante(visitante) {
    return await axios.post(API_URL, visitante);
}

export async function getVisitantes(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getVisitante(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateVisitante(visitante) {
    return await axios.post(API_URL, visitante);
}
export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteVisitante(id) {
    return await axios.delete(`${API_URL}/${id}`);
}