import axios from '../lib/axios';
import {JsonTable} from 'react-json-to-html';

export default async function axiosTest() {
    try {
      const {data:response} = await axios.get('api/result') //use data destructuring to get data from the promise object
      return response
    }

    catch (error) {
      console.log(error);
    }
  }