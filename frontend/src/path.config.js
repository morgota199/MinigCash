const BASE_URL = "http://localhost:2390"
const API = "/api"

const path = {
    register: "/auth/register",
    login: "/auth/login"
}

for(const data in path) {
    path[data] = BASE_URL + API + path[data]
}

export default path
