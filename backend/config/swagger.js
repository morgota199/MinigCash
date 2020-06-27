const swagger = {
    "swagger": "2.0",
    "info": {
        "version": "1.3.0",
        "title": "Users",
        "description": "User management API",
        "termsOfService": "http://api_url/terms/",
        "contact": {
            "name": "Wolox Team",
            "email": "hello@wolox.co",
            "url": "https://www.wolox.com.ar/"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "paths": {
        "/api/user/all": {
            "get": {
                "tags": [
                    "User Operation"
                ],
                "description": "List all user",
                "operationId": "listAllUsers",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": [
                            {
                                "_id": {
                                    "$oid": "5eb68adebaacf5044a6e7e29"
                                },
                                "ref": {
                                    "ref_register": [],
                                    "ref_show": 0
                                },
                                "userName": "Apache2",
                                "email": "ahache2@gmail.com",
                                "password": "$2a$12$XGNhxb8ehxsYbYvw4vjIP.CocqD7FJHcGM1Erc.1xZ1knZdnDjuqK",
                                "passwordRecoveryCode": null,
                                "isAdmin": false,
                                "forRef": null,
                                "block": false,
                                "power": {
                                    "litecoin": 0,
                                    "usd": 0,
                                    "ethereum": 0,
                                    "bitcoin": 0
                                },
                                "money": {
                                    "ghs": 1,
                                    "litecoin": 0,
                                    "usd": 0,
                                    "ethereum": 0,
                                    "bitcoin": 0,
                                    "ref_money": 0
                                },
                                "__v": 0
                            }
                        ]
                    }
                }
            }
        },
        "/api/user/remove": {
            "delete": {
                "tags": [
                    "User Operation"
                ],
                "description": "Delete user",
                "operationId": "deleteUsers",
                "parameters": ["removeUser"],
                "headers": {
                    "Content-Type": "application/json",
                    "token": "string"
                },
                "responses": {
                    "200": {
                        "description": []
                    }
                }
            }
        }
    }
}

module.exports = swagger