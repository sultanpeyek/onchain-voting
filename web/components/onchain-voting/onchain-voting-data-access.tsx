"use client";

import { type IdlTypes, Program } from "@coral-xyz/anchor";
import {
	type OnchainVoting,
	OnchainVotingIDL,
	programId,
} from "@onchain-voting/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { type Keypair, PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCluster } from "../cluster/cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";
import { useTransactionToast } from "../ui/ui-layout";

export function useOnchainVotingProgram() {
	const { connection } = useConnection();
	const { cluster } = useCluster();
	const transactionToast = useTransactionToast();
	const provider = useAnchorProvider();
	const program = new Program(OnchainVotingIDL, programId, provider);

	const getProgramAccount = useQuery({
		queryKey: ["get-program-account", { cluster }],
		queryFn: () => connection.getParsedAccountInfo(programId),
	});

	const initVoteBank = useMutation({
		mutationKey: ["onchainVoting", "initVoteBank", { cluster }],
		mutationFn: async (keypair: Keypair) => {
			return await program.methods
				.initVoteBank()
				.accounts({
					voteAccount: keypair.publicKey,
				})
				.signers([keypair])
				.rpc();
		},
		onSuccess: (signature) => {
			transactionToast(signature);
		},
		onError: () => toast.error("Failed to run program"),
	});

	const VOTE_BANK_ACCOUNT = new PublicKey(
		"BERWqbcMW2romrsEuLq6WH3apZj3kpFJQLFSwTzVFHxg",
	);

	const getVoteBankData = useQuery({
		queryKey: ["onchainVoting", "getVoteBankData", { cluster }],
		queryFn: async () => {
			return await program.account.voteBank.fetch(VOTE_BANK_ACCOUNT);
		},
	});

	const gibVote = useMutation({
		mutationKey: ["onchainVoting", "gibVote", { cluster }],
		mutationFn: async (type: IdlTypes<OnchainVoting>["VoteType"]) => {
			const tx = await program.methods
				.gibVote({ ...type })
				.accounts({
					voteAccount: VOTE_BANK_ACCOUNT,
				})
				.rpc();

			await getVoteBankData.refetch();

			return tx;
		},
	});

	return {
		program,
		programId,
		getProgramAccount,
		initVoteBank,
		getVoteBankData,
		gibVote,
	};
}
