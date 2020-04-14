import axios from 'axios';

const covid19api = 'https://api.covid19api.com';
const mathdro = 'https://covid19.mathdro.id/api/daily';

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

export const fetchDailyData = async(country) => {
  try {
    const response = country === 'global' ?
      await axios.get(mathdro) :
      await axios.get(`${covid19api}/total/country/${country}`);

    return response.data;
  } catch (error) {

  }
}

export const fetchDailyDataFromFile = async(country) => {
  try {
    const response = country === 'global' ?
      await axios.get('./staticDailyDataGlobal.json') :
      await axios.get('./staticDailyDataPoland.json');

    return response.data;
  } catch (error) {

  }
}