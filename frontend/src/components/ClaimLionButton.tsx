
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import { useRouter } from 'next/router'
import { SendBackToken } from '../components/AppSendBack'
import axios from 'lib/axios';



export const ClaimLionButton: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const router = useRouter();

        
    const onClick = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
            return;
        }

        try {
            hasWon(publicKey?.toBase58())
            .then(
                
                function(res) {
                    if (res !== undefined) {
                        SendBackToken(res.mint_address, publicKey, connection);
                    }
                    //Update Payout Here
                }
            );

        } catch (error: any) {
            //Display Error HERE
        }

    }, [publicKey, connection]);

    return (
        <div>
            <button
                className="px-8 m-2 btn bg-gradient-to-r from-[#FAD836] to-[#47833C] hover:from-[#47833C] hover:to-[#FAD836] ..."
                onClick={onClick} disabled={!publicKey}
            >
                {publicKey ? <span>Claim Lion</span> : <span>Nothing to Claim</span>}
            </button>
        </div>
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