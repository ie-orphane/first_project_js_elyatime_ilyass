class Bank {
    static users = []
}

class User {
    constructor(full_name, email, age, password) {
        this.fullName = full_name
        this.email = email
        this.age = age
        this.password = password
        this.balance = Math.trunc(Math.random() * 1000 + 10)
        this.loan
        this.invest
        this.history
    }
}