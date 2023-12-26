function today() {
    const now = new Date()
    const formattedDate = `${now.getUTCFullYear()}-${(now.getUTCMonth() + 1)}-${now.getUTCDate()} ${now.getUTCHours()}:${now.getUTCMinutes()}`
    return formattedDate
}

today()