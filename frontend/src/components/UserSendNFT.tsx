import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { web3 } from "@project-serum/anchor";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";


const doNFTTransfer = async function (mint: string, from: Wallet, to: string) {
  let connection = new Connection("https://api.devnet.solana.com");

  const mintPublicKey = new web3.PublicKey(mint);// Mint is the Mint address found in the NFT metadata
  const ownerPublicKey = from.publicKey;
  const destPublicKey = new web3.PublicKey("MY_APPS_WALLET_ADDRESS");

  const mintToken = new Token(
    connection,
    mintPublicKey,
    TOKEN_PROGRAM_ID,
    from.payer
  );

  // GET SOURCE ASSOCIATED ACCOUNT
  const associatedSourceTokenAddr = await Token.getAssociatedTokenAddress(
    mintToken.associatedProgramId,
    mintToken.programId,
    mintPublicKey,
    ownerPublicKey
  );

  // GET DESTINATION ASSOCIATED ACCOUNT
  const associatedDestinationTokenAddr = await Token.getAssociatedTokenAddress(
    mintToken.associatedProgramId,
    mintToken.programId,
    mintPublicKey,
    destPublicKey
  );

  const receiverAccount = await connection.getAccountInfo(
    associatedDestinationTokenAddr
  );

  const instructions = [];

  if (receiverAccount === null) {
    console.log("receiver account is null!");
    instructions.push(
      Token.createAssociatedTokenAccountInstruction(
        mintToken.associatedProgramId,
        mintToken.programId,
        mintPublicKey,
        associatedDestinationTokenAddr,
        destPublicKey,
        ownerPublicKey
      )
    );
  }

  instructions.push(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      associatedSourceTokenAddr,
      associatedDestinationTokenAddr,
      ownerPublicKey,
      [],
      1
    )
  );

  // This transaction is sending the tokens
  let transaction = new web3.Transaction();
  for (let i = 0; i < instructions.length; i++) {
    transaction.add(instructions[i]);
  }
  if (transaction) {
    let response = await from.sendTransaction(transaction, connection);

    console.log("response: ", response);
  } else {
    console.log("Transaction error: transaction data is null");
  }
};

export default doNFTTransfer;