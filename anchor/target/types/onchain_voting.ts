export type OnchainVoting = {
	version: "0.1.0";
	name: "onchain_voting";
	instructions: [
		{
			name: "initVoteBank";
			accounts: [
				{
					name: "voteAccount";
					isMut: true;
					isSigner: true;
				},
				{
					name: "signer";
					isMut: true;
					isSigner: true;
				},
				{
					name: "systemProgram";
					isMut: false;
					isSigner: false;
				},
			];
			args: [];
		},
		{
			name: "gibVote";
			accounts: [
				{
					name: "voteAccount";
					isMut: true;
					isSigner: false;
				},
				{
					name: "signer";
					isMut: false;
					isSigner: true;
				},
			];
			args: [
				{
					name: "voteType";
					type: {
						defined: "VoteType";
					};
				},
			];
		},
	];
	accounts: [
		{
			name: "voteBank";
			type: {
				kind: "struct";
				fields: [
					{
						name: "isOpenToVote";
						type: "bool";
					},
					{
						name: "gm";
						type: "u64";
					},
					{
						name: "gn";
						type: "u64";
					},
				];
			};
		},
	];
	types: [
		{
			name: "VoteType";
			type: {
				kind: "enum";
				variants: [
					{
						name: "Gm";
					},
					{
						name: "Gn";
					},
				];
			};
		},
	];
};

export const IDL: OnchainVoting = {
	version: "0.1.0",
	name: "onchain_voting",
	instructions: [
		{
			name: "initVoteBank",
			accounts: [
				{
					name: "voteAccount",
					isMut: true,
					isSigner: true,
				},
				{
					name: "signer",
					isMut: true,
					isSigner: true,
				},
				{
					name: "systemProgram",
					isMut: false,
					isSigner: false,
				},
			],
			args: [],
		},
		{
			name: "gibVote",
			accounts: [
				{
					name: "voteAccount",
					isMut: true,
					isSigner: false,
				},
				{
					name: "signer",
					isMut: false,
					isSigner: true,
				},
			],
			args: [
				{
					name: "voteType",
					type: {
						defined: "VoteType",
					},
				},
			],
		},
	],
	accounts: [
		{
			name: "voteBank",
			type: {
				kind: "struct",
				fields: [
					{
						name: "isOpenToVote",
						type: "bool",
					},
					{
						name: "gm",
						type: "u64",
					},
					{
						name: "gn",
						type: "u64",
					},
				],
			},
		},
	],
	types: [
		{
			name: "VoteType",
			type: {
				kind: "enum",
				variants: [
					{
						name: "Gm",
					},
					{
						name: "Gn",
					},
				],
			},
		},
	],
};
