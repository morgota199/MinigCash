const BASE_URL = "http://localhost:2390"
const API = "/api"

const path = {
    register: "/auth/register",
    login: "/auth/login",
    news: "/news",
    checker: "/checker",
    power: "/balance/power",
    money: "/balance/money",
    ticket: "/tickets",
    ticket_user: "/tickets/user"
}

for(const data in path) {
    path[data] = BASE_URL + API + path[data]
}

export default path
