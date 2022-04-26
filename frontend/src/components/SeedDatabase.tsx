import { FC, useCallback } from 'react';
import axios from '../lib/axios';
import { useAuth } from '../hooks/auth'

export const SeedDatabase: FC = () => {

    const lst = [];  
    const populateData = (data) => {lst.push(data)} 

    
    function axiosTest (populateData) {
        axios.get(url)
       .then(function(response){
               populateData(response.data);
        })
        .catch(function(error){
               console.log(error);
         });
        }   
    axiosTest()
    console.log(players)


    const onClick = useCallback(async () => {

        var e;
        axios.get('api/result')
        .then(function (response) {
            e = response.data.length;
            if ( e > 0 ) {
                console.log('error', `Database Already Seeded. Delete manually.`);
                return;
            }
            else {
                axios.get('api/v1/seeds')
                .then(function (response) {
                    console.log(response);
                  });
            }
          })

    },[]);
    
    return (
        <div>
            <button
                className="btn m-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick}
            >
                <span> WARNING SEED DATABASE </span>
            </button>
        </div>
    );
};