import axios from 'axios';

const SERVER_URL = 'http://localhost:3001'

export const authenticate = async(username,password)=>{
    const encodedString = btoa(`${username}:${password}`);
   const result = await axios.post(`${SERVER_URL}/auth`, {info: encodedString});
   return result.data;
}

export const createUser = async(signUpDetails)=>{
    const result = await axios.post(`${SERVER_URL}/user/create`, signUpDetails);
   return result.data;
}