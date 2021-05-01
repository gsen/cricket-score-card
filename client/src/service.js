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

export const getPlayers = async(teamId)=>{
    const url = teamId? `player?teamId=${teamId}`: `player`
    const result = await axios.get(`${SERVER_URL}/${url}`);
   return result.data;
}

export const addPlayer = async(player)=>{
    try{
        const result = await axios.post(`${SERVER_URL}/player`, player);
       return result.data;
    }catch(error){
        console.log('error',error.response);
       throw error.response.data;
    }
}

export const addMatch = async(match)=>{
    try{
        const result = await axios.post(`${SERVER_URL}/match`, match);
       return result.data;
    }catch(error){
        console.log('error',error.response);
       throw error.response.data;
    }
}

export const listMatches = async(teamId)=>{
    const result = await axios.get(`${SERVER_URL}/match?teamId=${teamId}`);
   return result.data;
}

export const getScorecard = async(matchId)=>{
    const result = await axios.get(`${SERVER_URL}/match/${matchId}/scorecard`);
    return result.data;
}

export const saveScoreCard = async(matchId,scoreCard)=>{
    try{
        const result = await axios.post(`${SERVER_URL}/match/${matchId}/scorecard`, scoreCard);
       return result.data;
    }catch(error){
        console.log('error',error.response);
       throw error.response.data;
    }
}