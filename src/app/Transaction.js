"use client";

import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { SystemProgram, Transaction as TransactionWeb3 } from "@solana/web3.js";
import { useCallback, useState } from "react";

import Button from "../components/Button";
import Select from "../components/Input/Select";
import Text from "../components/Input/Text";
import Notification from "../components/Notification";
import { useWallet } from "../context/SolanaWalletProvider";
import connection from "../web3";

const Transaction = () => {
  const { solflareProvider, solFlarePublicKey } = useWallet();

  const [showNotif, setShowNotif] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [senderPublicKey, setSenderPublicKey] = useState(
    solFlarePublicKey.toString()
  );
  const [recipientPublicKey, setRecipientPublicKey] = useState(
    solFlarePublicKey.toString()
  );
  const [amount, setAmount] = useState("0");

  const defaultItems = [
    {
      label: solFlarePublicKey.toString(),
      value: solFlarePublicKey.toString(),
      id: 0,
    },
  ];

  const submitTransaction = useCallback(async () => {
    try {
      setIsTransactionLoading(true);
      console.log(isTransactionLoading);
      let transaction = new TransactionWeb3().add(
        SystemProgram.transfer({
          fromPubkey: solFlarePublicKey,
          toPubkey: senderPublicKey,
          lamports: parseInt(amount),
        })
      );

      let { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = solFlarePublicKey;

      let signed = await solflareProvider.signTransaction(transaction);
      let txid = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(txid);
      setAmount("0");
      setShowNotif(true);
    } catch (error) {
      console.log("🚀 ~ error", error);
    } finally {
      setIsTransactionLoading(false);
    }
  }, [
    amount,
    isTransactionLoading,
    senderPublicKey,
    solFlarePublicKey,
    solflareProvider,
  ]);

  return (
    <div>
      <div className="space-y-4">
        <Select
          items={defaultItems}
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
      <Notification setShow={setShowNotif} show={showNotif} />
    </div>
  );
};

export default Transaction;
