"use client";

import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { SystemProgram, Transaction as TransactionWeb3 } from "@solana/web3.js";
import { useCallback, useState } from "react";

import Button from "../components/Button";
import Select from "../components/Input/Select";
import Text from "../components/Input/Text";
import { useNotification } from "../context/NotificationProvider";
import { useSolflareWallet } from "../context/SolflareWalletProvider";
import connection from "../web3";

const Transaction = () => {
  /*
   * useSolflareWallet hook from SolanaWalletProvider context
   * provides access to the Solflare provider and Solflare public key
   */
  const { solflareProvider, solFlarePublicKey } = useSolflareWallet();

  /*
   * State to control the visibility of the Notification component
   * and the loading state of the submitTransaction function
   */
  const { setShowNotification } = useNotification();
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  /*
   * State to store the sender and recipient public keys, as well as the transaction amount
   */
  const [senderPublicKey, setSenderPublicKey] = useState(solFlarePublicKey);
  const [recipientPublicKey, setRecipientPublicKey] = useState(
    solFlarePublicKey.toString()
  );
  const [amount, setAmount] = useState("0");

  /*
   * Data for the Select component, containing the available public keys
   */
  const accountPublicKey = [
    {
      label: solFlarePublicKey.toString(),
      value: solFlarePublicKey,
      id: 0,
    },
  ];

  /*
   * Callback function to submit a transaction
   * - creates a new TransactionWeb3 object and adds a transfer instruction to it
   * - signs the transaction with the Solflare provider
   * - sends the signed transaction to the Solana network via the Solana connection
   * - confirms the transaction was processed and updates the component state to display a notification
   */
  const submitTransaction = useCallback(async () => {
    try {
      setIsTransactionLoading(true);

      let transaction = new TransactionWeb3().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPublicKey,
          lamports: parseInt(amount),
        })
      );

      let { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderPublicKey;

      let signed = await solflareProvider.signTransaction(transaction);
      let txid = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(txid);
      setAmount("0");
      setShowNotification(true);
    } catch (error) {
      console.log("🚀 ~ error", error);
    } finally {
      setIsTransactionLoading(false);
    }
  }, [
    amount,
    recipientPublicKey,
    senderPublicKey,
    setShowNotification,
    solflareProvider,
  ]);

  return (
    <div>
      <div className="space-y-4">
        <Select
          items={accountPublicKey}
          label="From account"
          onChange={setSenderPublicKey}
        />
        <Text
          label="To account"
          value={recipientPublicKey}
          onChange={setRecipientPublicKey}
        />
        <Text
          className="sm:h-16 sm:text-2xl"
          label="Amount"
          placeholder={"0 SOL"}
          value={amount}
          onChange={setAmount}
        />
        <Button
          icon={<PaperAirplaneIcon className="ml-3 -mr-1 h-5 w-5" />}
          isLoading={isTransactionLoading}
          onClick={submitTransaction}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
