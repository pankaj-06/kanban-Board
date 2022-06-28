const base_url = "http://localhost:3006";

//---------API's--------------------\\

export const reCaptchaVerify = "https://www.google.com/recaptcha/api/siteverify";
export const createUser = `${base_url}/users`;
export const getUsers = `${base_url}/users`;
export const findUser = `${base_url}/users?email=`
export const taskApi = `${base_url}/tasks`;  // This endpoint is used for task create, update and delete. 
export const getTasks = `${base_url}/tasks?_sort=crtdate&_order=asc`;

//------------------------------------\\

export const BACKLOG = 0;
export const TODO = 1;
export const ONGOING = 2;
export const DONE = 3;
export const reCaptchSiteKey = "6Ldl-6kgAAAAAE_pbvZp877vqGxF3qor4lYSMhOp";

