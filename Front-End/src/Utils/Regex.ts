export const RegularExpressions = {
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&*?])[A-Za-z\d#$@!%&*?]{8,32}$/,
    Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    AlphabetsOnly: /^[a-zA-Z ]*$/,
    Alphanumeric: /^[a-zA-Z0-9 ]*$/,
    AlphabetsWithSpecialCharacters: /^[ A-Za-z_@./#&+-]*$/,
    MobileNumber: /^[6-9]\d{9}$/gi,
    MM_DD_YYYY: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
}