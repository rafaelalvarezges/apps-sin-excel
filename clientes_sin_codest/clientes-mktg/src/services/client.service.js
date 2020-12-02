import http from "../http-common";

class clientService {
    getAll() {
        console.log("getAll")
        console.log(http.get("/clients"))
        return http.get("/clients");
    }
    get(id) {
        return http.get(`/clients/${id}`);
    }

    update(id, data) {
        console.log(id)
        console.log(data)
        return http.put(`/clients/${id}`, data);
    }

}

export default new clientService();