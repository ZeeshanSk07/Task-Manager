import axios from 'axios';

const Backend_url = 'http://localhost:4000/user'

const register = async (name, email, password) =>{
    try{
        const response = await axios.post(`${Backend_url}/signup`, {name, email, password});
        console.log(response);
        const { token } = response.data;
        localStorage.setItem("token", token);
        return response;
    } catch(error){
        console.log(error);
        if (error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
          } else {
            console.error(error);
            throw new Error("An error occurred while registering.");
        }
    }
}

const login = async (email, password) =>{
    try{
        const response = await axios.post(`${Backend_url}/login`, {email, password});
        const { token } = response.data;
        localStorage.setItem("token", token);
        return response;
    }catch(err){
        if(err.response && err.response.status === 400){
            throw new Error(err.response.data.message);
        } else {
            console.error(err);
            throw new Error("An error occurred while logging in.");
        }
    }
}

const updUser = async(user, updemail, updpassword, token) =>{
    try{
        console.log(user, updemail, updpassword, token);
        const response = await axios.put(`${Backend_url}/update/${user}`, {updemail, updpassword}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
}

export {register, login, updUser};