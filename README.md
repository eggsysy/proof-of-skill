CreatorEndowment is a Web3 platform that allows fans to back their favorite creators in exchange for a share of their future revenue. Built on Superfluid’s Instant Distribution Agreement (IDA), it enables real-time, scalable revenue sharing on the Ethereum Sepolia network.

The Vision:

In the traditional creator economy, revenue is locked behind platforms. CreatorEndowment decentralizes this by:

Backing Creators: Users buy "Units" in a creator’s pool using testnet tokens.

Instant Distribution: When a creator earns revenue, they can distribute it to all backers instantly with a single transaction.

Dynamic UI: A modern dashboard that tracks backing goals and portfolio growth.

Tech Stack:

Frontend: Next.js 14 (App Router), TailwindCSS, Shadcn/UI

Blockchain: Solidity, Superfluid Protocol (IDA)

Tools: Hardhat, Ethers.js v6, Lucide React

Network: Ethereum Sepolia Testnet

Getting Started:

1. Prerequisites

Node.js (v18+)

MetaMask Extension

Some Sepolia ETH (Get it from the Alchemy Faucet)

2. Installation

Clone the repo:


git clone https://github.com/your-username/creator-endowment.git
cd creator-endowment

Setup Contracts:

cd contracts
npm install
cp .env.example .env # Add your Private Key and RPC URL
npx hardhat compile

Setup Frontend:

cd ../web
npm install
npm run dev
Smart Contract Logic:

The core logic resides in CreatorEndowment.sol. It utilizes the Superfluid IDA to manage "Units."

addBacker(address backer, uint128 units): Registers a user as a shareholder.

initializePool(): Sets up the Superfluid Index for the creator.

distribute(uint256 amount): (Planned) Splits revenue proportionally among all unit holders.