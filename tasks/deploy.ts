import { task } from "hardhat/config";

task("deploy", "Deploys NFT Smart contract").setAction(
  async (_args, { ethers, run }) => {
    await run("compile");

    // const network = await ethers.provider.getNetwork();
    const [deployer] = await ethers.getSigners();

    const nonce = await deployer.getTransactionCount();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy({ nonce: nonce });

    await nft.deployed();

    console.log("NFT Deployed to :", nft.address);

    return nft.address
  }
);
