"use client";

import { Keypair } from "@solana/web3.js";
import { useOnchainVotingProgram } from "./onchain-voting-data-access";

export function OnchainVotingCreate() {
	const { initVoteBank } = useOnchainVotingProgram();

	return (
		<button
			type="button"
			className="btn btn-xs lg:btn-md btn-primary"
			onClick={() => initVoteBank.mutateAsync(Keypair.generate())}
			disabled={initVoteBank.isPending}
		>
			Run program{initVoteBank.isPending && "..."}
		</button>
	);
}

export function OnchainVotingGibVote() {
	const { gibVote, getVoteBankData } = useOnchainVotingProgram();

	return (
		<div className="space-y-4 w-full mx-auto my-4">
			<div className="flex gap-4 w-full justify-center">
				<div>GM: {getVoteBankData.data?.gm?.toString() ?? "-"}</div>
				<div>GN: {getVoteBankData.data?.gn?.toString() ?? "-"}</div>
			</div>
			<div className="flex gap-4 w-full justify-center">
				<button
					type="button"
					className="btn btn-xs lg:btn-md btn-primary"
					onClick={() => gibVote.mutateAsync({ gm: {} })}
					disabled={gibVote.isPending}
				>
					GM{gibVote.isPending && "..."}
				</button>
				<button
					type="button"
					className="btn btn-xs lg:btn-md btn-primary"
					onClick={() => gibVote.mutateAsync({ gn: {} })}
					disabled={gibVote.isPending}
				>
					GN{gibVote.isPending && "..."}
				</button>
			</div>
		</div>
	);
}

export function OnchainVotingProgram() {
	const { getProgramAccount } = useOnchainVotingProgram();

	if (getProgramAccount.isLoading) {
		return <span className="loading loading-spinner loading-lg" />;
	}
	if (!getProgramAccount.data?.value) {
		return (
			<div className="alert alert-info flex justify-center">
				<span>
					Program account not found. Make sure you have deployed the program and
					are on the correct cluster.
				</span>
			</div>
		);
	}
	return (
		<div className={"space-y-6"}>
			<pre>{JSON.stringify(getProgramAccount.data.value, null, 2)}</pre>
		</div>
	);
}
