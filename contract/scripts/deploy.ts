import { ethers } from "hardhat";

require('dotenv').config({ path: __dirname + '/.env' })


async function main() {


  const accounts = [
    "0xa4c51c75A46Ac20161bBb860d2dAA7F52a4F3569",
    "0x287531d24d403BA4e611C70a585F5A12BFF013Ff",
    "0xbCbbf6bE81923b3Dd3FA1CA3604BE1E50E615E3C",
  ]
  
  const multisigWalletFactory = await ethers.getContractFactory("MultiSigAssetsManagement");

  console.log("[*] Deploying MultiSigWallet...");
  
  const multisigWallet = await multisigWalletFactory.deploy(accounts, 3);
  await multisigWallet.deployed();

  console.log("Address:", multisigWallet.address)
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
