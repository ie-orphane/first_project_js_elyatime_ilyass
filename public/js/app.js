//^ classes
class Bank {
    static users = []
}

class User {
    constructor(full_name, email, age, password, balance) {
        this.fullName = full_name
        this.email = email
        this.age = age
        this.password = password
        this.balance = balance || Math.trunc(Math.random() * (100_000 - 1_000) + 1_000)
        this.loan
        this.invest
        this.history
        
        Bank.users.push(this)
    }
}

class Char {
    static specials = `!"#$%&'()*+,-./:;<=>?@[\]^_` + '`{|}~♂♀'
    static letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    static email = "abcdefghijklmnopqrstuvwxyz@.0123456789"
    static numbers = '0123456789'
}

function today() {
    const now = new Date()
    const formattedDate = `${now.getUTCFullYear()}-${(now.getUTCMonth() + 1)}-${now.getUTCDate()} ${now.getUTCHours()}:${now.getUTCMinutes()}`
    return formattedDate
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

        //TODO - Ensure the email is unique.

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
    console.log('function')
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

    alert(`Current Balance: ${user.balance}`)

    let userInput

    // userInput = better_prompt("wanna 'signup', 'login' or 'reset password'", 'signup')
    userInput = 'login'
    switch (userInput) {
        case 'logout':
            main()
            break
        case 'withdrawmoney':

            break
        case 'depositmoney':

            break
        case 'takealoan':

            break
        case 'invest':

            break
        case 'history':

            break

        default:
            alert(`The option '${userInput}' not found!`)
            break
    }
}

function main() {
    let userInput

    // userInput = better_prompt("wanna 'signup', 'login' or 'reset password'", 'signup')
    userInput = 'login'
    switch (userInput) {
        case 'login':
            login()
            break
        case 'signup':
            // signup()
            break
        case 'resetpassword':

            break;

        default:
            alert(`The option '${userInput}' not found!`)
            break;
    }
}

new User("Ilyass Elyatime", "ie0@gmail.com", 19, "azerty@", 7350)
console.table(Bank.users)
main()