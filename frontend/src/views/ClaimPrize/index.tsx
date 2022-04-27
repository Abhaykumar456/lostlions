// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { ClaimLionButton } from '../../components/ClaimLionButton';
import axios from 'lib/axios';



export const ClaimPrize: FC = ({ }) => {
  
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {

    hasWon(publicKey?.toBase58())
            .then(
                
                function(res) {
                    if (res !== undefined) {
                        
                    }
                }
            );

  })

  return (
    

    <>
    <div className="py-12 overflow-y-hidden">
            {/* Code block starts */} 
                <div>
                    <div className="relative rounded-lg container mx-auto flex flex-col items-center z-50">
                    <h4 className="w-full max-w-md mx-auto text-center text-slate-300">
                      Claim your new breedable Lion
                    </h4>
                    <div className='pt-12'>
                      <ClaimLionButton />

                    </div>
                      
                    </div>
                </div>
            {/* Code block ends */}
        </div>
        </>
  );
};
async function hasWon(id: string) {
    try {
      const res = await axios.get(`api/claimPrize/${id}`);
  
      return res.data; 
        // Don't forget to return something   
    }
    catch (err) {
        console.error(err);
    }
  }