export const getItem = (key)=>{
    const item = localStorage.getItem(key);
   return item? JSON.parse(item): null;
}

export const saveItem = (key,value)=>{
    localStorage.setItem(key, JSON.stringify(value));
}