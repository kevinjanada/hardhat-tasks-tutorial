import { task } from "hardhat/config";

task("deploy-verify-airdrop", "Deploys NFT, Verify on etherscan, and send airdrop")
  .addParam("airdropAddress", "The address that the airdrop will be transferred to")
  .setAction(async ({ airdropAddress}: { airdropAddress: string }, { run }) => {
    const contractAddress = await run("deploy")
    await run("verify-etherscan", { contractAddress })
    await run("airdrop", {contractAddress, airdropAddress })
  });