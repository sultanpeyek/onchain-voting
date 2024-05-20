// Here we export some useful types and functions for interacting with the Anchor program.
import { PublicKey } from "@solana/web3.js";
import type { OnchainVoting } from "../target/types/onchain_voting";
import { IDL as OnchainVotingIDL } from "../target/types/onchain_voting";

// Re-export the generated IDL and type
export { type OnchainVoting, OnchainVotingIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const programId = new PublicKey(
	"7kM5Cj29XTvAFMcysW6USK7J61Ljar7T2nkiGjLUi8Yj",
);
