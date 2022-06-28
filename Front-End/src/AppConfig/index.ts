const base_url = "http://localhost:3006";

export const createUser = `${base_url}/users`;
export const getUsers = `${base_url}/users`;
export const findUser = `${base_url}/users?email=`

export const taskApi = `${base_url}/tasks`;  // This endpoint is used for task create, update and delete. 
export const getTasks = `${base_url}/tasks?_sort=deadline&_order=asc`;








export const BACKLOG = 0;
export const TODO = 1;
export const ONGOING = 2;
export const DONE = 3;


