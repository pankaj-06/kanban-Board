import { IUserDetails } from "../../../Pages/Registration";
import { initialAuthState } from "../../Reducers/AuthReducer";

export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const LOGGED_OUT_USER = "LOGGED_OUT_USER";

export interface ILoggedInUserDetails {
    email: string,
    name: string,
    userName: string,
    profileImg: string,
    tel: string,
}

export const userLoggedIn = (payload: ILoggedInUserDetails) => {
    return {
        type: LOGGED_IN_USER,
        payload
    }
}

export const userLoggedOut = () => {
    return {
        type: LOGGED_OUT_USER,
    }
}