import axios from "axios"

class GetUserInformation {
    getUser() {
        return axios.get('http://127.0.0.1:8000/api/user-information');
    }
}