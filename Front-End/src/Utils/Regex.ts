export const RegularExpressions = {
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&*?])[A-Za-z\d#$@!%&*?]{8,32}$/,
    Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    AlphabetsOnly: /^[a-zA-Z ]*$/,
    Alphanumeric: /^[a-zA-Z0-9 ]*$/,
    AlphabetsWithSpecialCharacters: /^[ A-Za-z_@./#&+-]*$/,
    MobileNumber: /^[6-9]\d{9}$/gi
}