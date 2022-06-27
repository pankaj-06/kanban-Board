import { ILoggedInUserDetails, LOGGED_IN_USER, LOGGED_OUT_USER } from "../../Actions/AuthActions";


export const initialAuthState: ILoggedInUserDetails = {
    email: "",
    name: '',
    userName: "",
    profileImg: "",
    tel: "",
}

export const authenticationReducer = (state: ILoggedInUserDetails = initialAuthState, action: any): ILoggedInUserDetails => {
    switch (action.type) {
        case LOGGED_IN_USER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}