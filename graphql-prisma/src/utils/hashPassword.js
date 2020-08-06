import bcrypt from 'bcrypt'


const hashPassword = () => {
    if(hashPassword.length < 6) {
        throw new Error("password must be more then 6 char")
    }
    return bcrypt.hash(password, 10)
}

export {hashPassword as default}