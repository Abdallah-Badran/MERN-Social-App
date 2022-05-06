const getErrMsg = (err) => {
    let errMessage = []
    // for "unique" errors
    if (err.code === 11000) {
        errMessage.push(`${Object.keys(err.keyValue)[0].toUpperCase()} already exists`)
    }
    // for displaying database error messages
    if (err.errors) {
        for (let field in err.errors) {
            errMessage.push(err.errors[field].message)
        }
    }
    return errMessage
}

export default getErrMsg