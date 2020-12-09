import http from "../http-common";

class clientService {
    getAll() {
        return http.get("/devoluciones");
    }
    get(id) {
        return http.get(`/devoluciones/${id}`);
    }

    update(id, data) {
        return http.put(`/devoluciones/${id}`, data);
    }

}

export default new clientService();