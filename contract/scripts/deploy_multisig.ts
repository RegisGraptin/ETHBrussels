const { ethers, tenderly } = require("hardhat");

async function deploy_multisig(owners: string[]) {
  /**
   * owners : list of public key owners
   **/  
  console.log("Keys:", owners)
  console.log("Before contract...");

  const multisigWalletFactory = await ethers.getContractFactory("MultiSigWallet");

  console.log("Deploying MultiSigWallet...");
  
  const multisigWallet = await multisigWalletFactory.deploy(owners, owners.length);
  await multisigWallet.deployed();


  console.log("Contract address:", multisigWallet.address);
}


async function main() {

  const accounts = [
    ["0x991eBbEC9015233B986c29A14503Cf29c01DE48A", "0xa5049841459638796bb9880fb24d0039bf15bcb1843ff24d68b85132b6b01591"],
    ["0x461A3E1A9c1834F52833928a002578b8b7c062F7", "0xc0ed45d40a9f4c11653616df0c0a85cea9db88eb780323f328a18724b10b47e6"],
    ["0x32b23ad19CF47666AB9F88A097b802c1afD42f34", "0xde327df89b674cb2f52e8d1d2f1bdc9b11182697cd3cd22a48ce9dcaa26bb09f"],
  ]

  // Define the private keys of the owner
  let owners = []
  for (let index = 0; index < accounts.length; index++) {
    owners.push(accounts[index][0])
  }

  deploy_multisig(owners);
  
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
