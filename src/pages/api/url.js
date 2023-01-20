import axios from 'axios';

export  default async function postUrl(endpoint,options) {
  try {
    const response = await axios.post(endpoint,options)
    
    return response.data
  } catch (error) {
    console.error(error);
    return null;
  }
}