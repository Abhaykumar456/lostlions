// sendTransaction.tsx
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { getOrCreateAssociatedTokenAccount } from './getOrCreateAssociatedTokenAccount'
import { createTransferInstruction } from './createTransferInstructions'
import { notify } from "../../utils/notifications";
import { FC } from 'react'
import { useRouter } from 'next/router'
import axios from '../../lib/axios';



// Docs: https://github.com/solana-labs/solana-program-library/pull/2539/files
// https://github.com/solana-labs/wallet-adapter/issues/189
// repo: https://github.com/solana-labs/example-token/blob/v1.1/src/client/token.js
// creating a token for testing: https://learn.figment.io/tutorials/sol-mint-token

type Props = {
    mintaddress: string;
    toPubkey: string;
  };

  export const SendTransaction: FC<Props> = ({
    toPubkey,
    mintaddress
    }) => {    
            if (!toPubkey ) return
            const toastId = toast.loading('Processing transaction...')

            const { connection } = useConnection()
            const { publicKey, signTransaction, sendTransaction } = useWallet()
            const router = useRouter();


            const onClick = useCallback(async () => {
            try {
                if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
                const toPublicKey = new PublicKey(toPubkey)
                const mint = new PublicKey(mintaddress)

                const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mint,
                    publicKey,
                    signTransaction
                )

                const toTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mint,
                    toPublicKey,
                    signTransaction
                )

                const transaction = new Transaction().add(
                    createTransferInstruction(
                        fromTokenAccount.address, // source
                        toTokenAccount.address, // dest
                        publicKey,
                        1,
                        [],
                        TOKEN_PROGRAM_ID
                    )
                )

                const blockHash = await connection.getRecentBlockhash()
                transaction.feePayer = await publicKey
                transaction.recentBlockhash = await blockHash.blockhash
                const signed = await signTransaction(transaction)

                await connection.sendRawTransaction(signed.serialize())

                toast.success('Transaction sent', {
                    id: toastId,
                })

                //get random result from database
                const result_row = async ({ setErrors, ...props }) => {
                    setErrors([])
            
                    axios
                        .get('api/v1/getRandomResult', props)
                        .then(function (response) {
                            // handle success
                            console.log(response);
                          })
                        .catch(error => {
                            if (error.response.status !== 422) throw error
            
                            setErrors(Object.values(error.response.data.errors).flat())
                        })
                        .then(function () {
                            // always executed
                          });
                        
                }

                //Update Player Wallet to database... They're essentially proclaimed a winner or a loser at this point
                const updateTable = async ({ setErrors }) => {
                    setErrors([])
                    axios
                        .put('/api/result/', {wallet_id: fromTokenAccount.publicKey, active: '0'})
                        .then(function (response) {
                            // handle success
                            console.log(response);
                            router.push('/play');
                          })
                        .catch(error => {
                            if (error.response.status !== 422) throw error
            
                            setErrors(Object.values(error.response.data.errors).flat())
                        })
                        .then(function () {
                            // always executed
                          });
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(`Transaction failed: ${error.message}`, {
                    id: toastId,
                })
            }
        }, [publicKey, connection]);
    

        return (
            <div>
            <button
                className="btn m-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick} disabled={!publicKey}
            >
                <span> Send Lion and Play </span>
            </button>
        </div>
        );
}