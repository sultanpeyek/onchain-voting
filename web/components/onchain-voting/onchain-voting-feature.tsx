"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { ExplorerLink } from "../cluster/cluster-ui";
import { WalletButton } from "../solana/solana-provider";
import { AppHero, ellipsify } from "../ui/ui-layout";
import { useOnchainVotingProgram } from "./onchain-voting-data-access";
import {
	OnchainVotingCreate,
	OnchainVotingGibVote,
	OnchainVotingProgram,
} from "./onchain-voting-ui";

export default function OnchainVotingFeature() {
	const { publicKey } = useWallet();
	const { programId } = useOnchainVotingProgram();

	return publicKey ? (
		<div>
			<AppHero
				title="OnchainVoting"
				subtitle={'Run the program by clicking the "Run program" button.'}
			>
				<p className="mb-6">
					<ExplorerLink
						path={`account/${programId}`}
						label={ellipsify(programId.toString())}
					/>
				</p>
				<OnchainVotingCreate />
				<OnchainVotingGibVote />
			</AppHero>
			<OnchainVotingProgram />
		</div>
	) : (
		<div className="max-w-4xl mx-auto">
			<div className="hero py-[64px]">
				<div className="hero-content text-center">
					<WalletButton className="btn btn-primary" />
				</div>
			</div>
		</div>
	);
}
