import axios from "lib/axios";
import { useEffect, useState } from "react";


function CheckForRepeat(mint:string) {
    // initialize data state variable as an empty array
    const [data, setData] = useState([]);
  
    // make the fetch the first time your component mounts
    useEffect(() => {
      axios.get(`api/winningLion/${mint}`).then(response => setData(response.data.mint_address));
    }, []);
  
    if (data !== undefined) {
        return true;
      }
  
    return false;
  }
  export default CheckForRepeat;