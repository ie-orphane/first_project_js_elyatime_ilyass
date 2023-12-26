//^ classes
class Bank {
    static users = []
}

function today() {
    const now = new Date()
    const formattedDate = `${now.getUTCFullYear()}-${(now.getUTCMonth() + 1)}-${now.getUTCDate()} ${now.getUTCHours()}:${now.getUTCMinutes()}`
    return formattedDate
}

class Investment {
    constructor(user, amount) {
        this.amount = amount
        this.profit = 0
        user.invests.push(this)
    }
}

class Loan {
    constructor(user, amount) {
        this.amount = amount
        this.pay = 0
        user.loans.push(this)
    }
}

class User {
    constructor(full_name, email, age, password, balance) {
        this.fullName = full_name
        this.email = email
        this.age = age
        this.password = password
        this.balance = balance || Math.trunc(Math.random() * (100_000 - 1_000) + 1_000)
        this.loans = []
        this.invests = []
        this.history = [`${today()}   Signup`]

        Bank.users.push(this)
    }
}

class Char {
    static specials = `!"#$%&'()*+,-./:;<=>?@[\]^_` + '`{|}~♂♀'
    static letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    static email = "abcdefghijklmnopqrstuvwxyz@.0123456789"
    static numbers = '0123456789'
}



const better_prompt = (message, defaultInput, option = 'default') => {
    let userInput = prompt(message, defaultInput)
    console.log(userInput)
    return userInput
}


//^ SignUp functions
function signup() {
    function get_full_name() {
        let fullName = prompt('Enter your full name.')

        // - Do not save empty full name
        if (!fullName) {
            alert('your full name is empty')
            return get_full_name()
        }

        // - delete spaces at the begining and the end.
        // - delete duplicate spaces.
        fullName = fullName.split(' ').filter(element => element != '')

        // - Do not save a full name has less than 5 characters (excluding spaces).
        const fullNameLength = fullName.reduce((acc, word) => acc + word.length, 0)
        if (fullNameLength < 5) {
            alert(`the full name should not have less than 5 characters!\nYour full name has ${fullNameLength}.`)
            return get_full_name()
        }


        for (const word of fullName) {
            // - Do not save a full Name contains numbers or special characters
            for (const letter of word) {
                if (!Char.letters.includes(letter)) {
                    alert(`the full name should not contain '${letter}'`)
                    return get_full_name()
                }
            }

            // - capitalized each word.
            fullName[fullName.indexOf(word)] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }

        return fullName.join(' ')
    }

    function get_email() {
        let email = prompt('Enter your e-mail.')

        // - Do not save empty email
        if (!email) {
            alert('your email is empty')
            return get_email()
        }

        // - delete spaces at the begining and the end
        // - Convert all letters to lowercase.
        email = email.trim().toLowerCase()

        // - Do not save the Email if it has spaces in the middle.
        if (email.includes(' ')) {
            alert('the email should not contain spaces!')
            return get_email()
        }

        // - Do not save the Email if it does not contain exactly one "@" symbol.
        if ((email.match(/@/g) || []).length != 1) {
            alert("the email should contain one '@'!")
            return get_email()
        }

        if (email.split('.').length - 1 != 1) {
            alert("the email should contain one '.'!")
            return get_email()
        }

        for (const letter of email) {
            if (!Char.email.includes(letter)) {
                alert(`the email should not contain one '${letter}'!`)
                return get_email()
            }
        }

        // - Do not save the Email if it has fewer than 10 characters (excluding spaces).
        if (email.split('@')[0].length == 0) {
            alert('your email is empty!')
            return get_email()
        }

        for (const user of Bank.users) {
            if (user.email == email) {
                alert(`already registred with the email '${email}'`)
                return get_email()
            }
        }

        return email
    }

    function get_age() {
        console.log('enter')
        let age = prompt('Enter your age.')

        // - Do not save empty age
        if (!age) {
            alert('your age is empty!')
            return get_age()
        }

        // - Check for leading, trailing, or middle spaces.
        age = age.split(' ').filter(element => element != '').join('')

        // - Verify that only digits are entered.
        for (const number of age) {
            if (!Char.numbers.includes(number)) {
                alert('the age must be in digits!')
                return get_age()
            }
        }

        // - delete 0 at the beginen
        age = parseInt(age)
        console.log(age, !(0 < age && age < 100))

        // - Do not save the Age if it has 0 characters, or if it has 3 characters or more.
        if (!(0 < age && age < 100)) {
            alert('the age should between 0 and 100!')
            return get_age()
        }

        return age
    }

    function get_password() {
        let password = prompt('Enter your password.')

        // - Do not save empty password
        if (!password) {
            alert('your password is empty')
            return get_password()
        }

        // - delete spaces at the begining and the end.
        password = password.trim()

        // - Do not save the Password if it has spaces in the middle.
        if (password.includes(' ')) {
            alert('the password should not contain spaces!')
            return get_password()
        }

        // - Require at least one special character from the set: ["@", "#", "-", "+", "*", "/"].
        let containSpecial = false
        for (const special of Char.specials) {
            if (password.includes(special)) {
                console.log('special: ', special)
                containSpecial = true
            }
        }
        if (!containSpecial) {
            alert('the password must contain at least one special character!')
            return get_password()
        }

        // - Require at least 7 characters to confirm the password.
        if (password.length < 7) {
            alert('the password must contain at least 7 characters!')
            return get_password()
        }

        return password
    }

    // Full Name
    const userFullName = get_full_name()
    // Email
    const userEmail = get_email()
    // Age
    const userAge = get_age()
    // Password
    const userPassword = get_password()

    // Confirm Password
    let userConfirmPassword
    while (true) {
        userConfirmPassword = prompt('Confirm your password')
        if (userConfirmPassword == userPassword) {
            break
        }
        alert('invalid password!')
    }

    new User(userFullName, userEmail, userAge, userPassword)
    console.table(Bank.users)
}

function login() {
    // # Email:
    function get_user() {
        const email = prompt('Enter your email.')
        // search email in Bank
        for (const user of Bank.users) {
            if (email == user.email) {
                return user
            }
        }
        alert(`${email} not found!`)
        return get_user()
    }

    // - Check if the email exists in our Database.
    const user = get_user()

    // # Password:
    // - Check if the entered password is associated with the previously entered email.
    function check_password() {
        const password = prompt('Enter your password')
        if (user.password != password) {
            check_password()
        }
    }

    check_password()

    // const user = Bank.users[0]

    user.history.push(`${today()}   Login`)
    console.table(user.history)

    // user Loans
    const loans = user.loans.slice()
    for (const loan of loans) {
        user.history.push(`${today()}   Pay for ${loan.amount} loan  - ${user.balance * .1}`)
        loan.pay += user.balance * .1
        let msg = `You pay ${user.balance * .1} MAD for the ${loan.amount} MAD`
        user.balance *= .9

        if (loan.pay >= loan.amount) {
            // remove the loan
            user.loans.splice(user.loans.indexOf(loan), 1)
            msg += `\nthe payment for the ${loan.amount} loan completed!`
            user.history.push(`${today()}   Complete ${loan.amount} loan`)
        }
        alert(msg)
    }

    // user Investment
    const invests = user.invests.slice()
    for (const invest of invests) {
        user.history.push(`${today()}   Profit + ${invest.amount * .2} MAD from ${invest.amount} MAD invest`)
        invest.profit += invest.amount * .2
        let msg = `You gain ${invest.amount * .2} MAD from the ${invest.amount} MAD invest`
        user.balance += invest.amount * .2

        if (invest.profit >= invest.amount * 1.2) {
            // remove the invest
            user.invests.splice(user.invests.indexOf(invest), 1)
            msg += `\nthe ${invest.amount} invest ended!`
            user.history.push(`${today()}   End ${invest.amount} invest  + ${invest.profit} MAD profit`)
        }
        alert(msg)
    }

    function service() {
        // Withdraw Money
        function withdraw() {
            const userInput = prompt('Enter the amount to withdraw.')
            const amount = Number(userInput)

            if (!amount) {
                alert(`invalid amount of money '${userInput}'`)
                return withdraw()
            }

            if (amount > user.balance) {
                alert(`invalid amount of money '${amount} MAD'\nYou have only ${user.balance} MAD`)
                return withdraw()
            }

            user.balance -= amount
            user.history.push(`${today()}   Withdraw  - ${amount} MAD`)
            return service()
        }

        // Deposit Money
        function deposit() {
            const userInput = prompt('Enter the amount to deposit.')
            const amount = Number(userInput)

            if (!amount) {
                alert(`invalid amount of money '${userInput}'`)
                return deposit()
            }

            if (amount > 1_000) {
                alert(`you can only deposit 1000 MAD`)
                return deposit()
            }

            user.balance += amount
            user.history.push(`${today()}   Deposit  + ${amount} MAD`)
            return service()
        }

        // Take a Loan
        function loan() {
            user.history.push(`${today()}   Take a Loan  + ${user.balance * .2} MAD`)
            alert(`You take a loan of ${user.balance * .2} MAD`)
            new Loan(user, user.balance * .2)
            user.balance *= 1.2
            return service()
        }

        // Invest:
        // - If the user chooses this option, they can invest any amount in the bank.
        function invest() {
            const userInput = prompt('Enter the amount to invest.')
            const amount = Number(userInput)

            if (!amount) {
                alert(`invalid amount of money '${userInput}'`)
                return invest()
            }

            if (amount > user.balance) {
                alert(`you can't invest ${amount}!\nYou have only ${user.balance}`)
                return invest()
            }

            user.history.push(`${today()}   Invest  ${amount} MAD`)
            alert(`You invest ${amount} MAD`)
            new Investment(user, amount)
            user.balance -= amount
            return service()
        }
        // - Upon the next login, they will receive 20% of their investment each time until reaching 120% (earning 20% on each investment).

        const userInput = prompt(`Current Balance: ${user.balance}\nwanna 'logout', 'withdraw', 'deposit', 'loan', 'invest' or 'history'`, 'logout')
        console.table(user.history)
        switch (userInput) {
            case 'logout':
                user.history.push(`${today()}   Logout`)
                return main()
            case 'withdraw':
                withdraw()
                break
            case 'deposit':
                deposit()
                break
            case 'loan':
                loan()
                break
            case 'invest':
                invest()
                break
            case 'history':
                alert(user.history.join('\n'))
                return service()
            default:
                alert(`invalid option '${userInput}'!`)
                return service()
        }
    }

    service(user)
}

function reset_password() {
    // # Email:
    function get_user() {
        const email = prompt('Enter your email.')
        // search email in Bank
        for (const user of Bank.users) {
            if (email == user.email) {
                return user
            }
        }
        alert(`${email} not found!`)
        return get_user()
    }

    // - Check if the email exists in our Database.
    const user = get_user()

    // # Password:
    function get_password() {
        let password = prompt('Enter a new password.')

        // - Do not save empty password
        if (!password) {
            alert('your password is empty')
            return get_password()
        }

        // - delete spaces at the begining and the end.
        password = password.trim()

        // - Do not save the Password if it has spaces in the middle.
        if (password.includes(' ')) {
            alert('the password should not contain spaces!')
            return get_password()
        }

        // - Require at least one special character from the set: ["@", "#", "-", "+", "*", "/"].
        let containSpecial = false
        for (const special of Char.specials) {
            if (password.includes(special)) {
                console.log('special: ', special)
                containSpecial = true
            }
        }
        if (!containSpecial) {
            alert('the password must contain at least one special character!')
            return get_password()
        }

        // - Require at least 7 characters to confirm the password.
        if (password.length < 7) {
            alert('the password must contain at least 7 characters!')
            return get_password()
        }

        return password
    }
    const newPassword = get_password()

    // Confirm Password
    let ConfirmPassword
    while (true) {
        ConfirmPassword = prompt('Confirm your new password')
        if (ConfirmPassword == newPassword) {
            break
        }
        alert('invalid password!')
    }

    user.password = newPassword
    console.table(Bank.users)
    user.history.push(`${today()}  Reset password`)
    alert('password reseted successfully!')
}

function main() {
    let userInput = prompt("wanna 'signup', 'login' or 'reset password'", 'login')

    switch (userInput) {
        case 'login':
            login()
            break
        case 'signup':
            signup()
            return main()
        case 'resetpassword':
            reset_password()
            return main()
        default:
            alert(`invalid option '${userInput}'!`)
            return main()
    }
}

new User("Ilyass Elyatime", "ie0@gmail.com", 19, "012345@", 7350)
console.table(Bank.users)
main()