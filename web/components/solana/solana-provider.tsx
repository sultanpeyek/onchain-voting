"use client";

import { AnchorProvider } from "@coral-xyz/anchor";
import type { WalletError } from "@solana/wallet-adapter-base";
import {
	type AnchorWallet,
	ConnectionProvider,
	WalletProvider,
	useConnection,
	useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";
import { type ReactNode, useCallback, useMemo } from "react";
import { useCluster } from "../cluster/cluster-data-access";

require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletButton = dynamic(
	async () =>
		(await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
	{ ssr: false },
);

export function SolanaProvider({ children }: { children: ReactNode }) {
	const { cluster } = useCluster();
	const endpoint = useMemo(() => cluster.endpoint, [cluster]);
	const onError = useCallback((error: WalletError) => {
		console.error(error);
	}, []);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={[]} onError={onError} autoConnect={true}>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}

export function useAnchorProvider() {
	const { connection } = useConnection();
	const wallet = useWallet();

	return new AnchorProvider(connection, wallet as AnchorWallet, {
		commitment: "confirmed",
	});
}
