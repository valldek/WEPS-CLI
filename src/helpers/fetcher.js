import axios from 'axios';

const covid19api = 'https://api.covid19api.com';

export const fetchSummary = async () => {
  try {
    const response = await axios.get(`${covid19api}/summary`)
    return response.data;
  } catch (error) {
    return 'API Error';
  }
}

export const fetchSummaryFromFile = async () => {
  try {
    const response = await axios.get('./staticDataTotal.json');
    return response.data;
  } catch (error) {
    return 'API Error';
  }
}