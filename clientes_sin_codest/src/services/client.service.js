import http from "../http-common";

class clientService {
    getAll() {
        return http.get("/clients");
    }
    get(id) {
        return http.get(`/clients/${id}`);
    }

    update(id, data) {
        return http.put(`/clients/${id}`, data);
    }

}

export default new clientService();