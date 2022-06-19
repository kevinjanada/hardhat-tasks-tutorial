import { task, types } from "hardhat/config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

task("airdrop", "Verify deployed contract on Etherscan")
  .addParam("contractAddress", "NFT Contract Address", undefined, types.string)
  .addParam("airdropAddress", "Wallet address to airdrop token to", undefined, types.string)
  .setAction(async (
    { contractAddress, airdropAddress }: { contractAddress: string, airdropAddress: string },
    { ethers }
  ) => {
    try {
      const [deployer] = await ethers.getSigners();
      const nftContract = new ethers.Contract(contractAddress, NFT.abi);
      const nftContractWithSigner = nftContract.connect(deployer);

      const nonce = await deployer.getTransactionCount();

      const tx = await nftContractWithSigner.safeMint(airdropAddress, { nonce });
      await tx.wait();

      console.log('Successfully airdropped to address ', airdropAddress);

      const balanceOfAirdroppedAddress = await nftContractWithSigner.balanceOf(airdropAddress);
      console.log(`Token balance of ${airdropAddress} is now ${balanceOfAirdroppedAddress.toString()}`);

    } catch ({ message }) {
      console.error(message)
    }
  })