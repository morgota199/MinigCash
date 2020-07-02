const BASE_URL = "http://localhost:2390"
const API = "/api"

const path = {
    register: "/auth/register",
    login: "/auth/login",
    user_for_id: "/users",
    user_search: "/users/search",
    user_add_admin: "/users/{id}/add_admin",
    user_remove_admin: "/users/{id}/remove_admin",
    user_block: "/users/{id}/block",
    user_unblock: "/users/{id}/unblock",
    user_remove: "/users/{id}",
    user_select_password: "/users/select_password",
    reference: "/reference/create",
    reference_me: "/reference/me/users",
    reference_ref: "/reference/me",
    reference_pay: "/reference/pay",
    reference_refer: "/reference/refer",
    news: "/news",
    checker: "/checker",
    power: "/balance/power",
    money: "/balance/money",
    ticket: "/tickets",
    ticket_user: "/tickets/user",
    payout: "/pay/payouts",
    payout_approve: "/pay/{id}/approve",
    payout_reject: "/pay/{id}/reject",
    payment: "/pay/payment",
    payment_user: "/pay/user",
    payment_all_users: "/pay",
    transaction: "/pay/transaction"
}

for(const data in path) {
    path[data] = BASE_URL + API + path[data]
}

export default path
