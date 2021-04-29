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

export const createTeam = async(teamName)=>{
    try{
        const result = await axios.post(`${SERVER_URL}/team`, {teamName});
       return result.data;
    }catch(error){
        console.log('error',error.response);
       throw error.response.data;
    }
}

export const updateTeam = async(teamName, teamId)=>{
    try{
        const result = await axios.put(`${SERVER_URL}/team`, {teamName, teamId});
       return result.data;
    }catch(error){
        console.log('error',error.response);
       throw error.response.data;
    }
}

export const listTeams = async()=>{
        const result = await axios.get(`${SERVER_URL}/team/all`);
       return result.data;
}