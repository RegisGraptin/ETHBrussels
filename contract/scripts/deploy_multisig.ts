const { ethers, tenderly } = require("hardhat");

require('dotenv').config({ path: __dirname + '/.env' })

async function deploy_multisig(owners: string[], number_of_verification: number) {
  /**
   * owners : list of public key owners
   * number_of_verification: minimum number of people to accept a transaction
   **/  
  console.log("Public keys of the MultiSig Contract:", owners)
  
  const multisigWalletFactory = await ethers.getContractFactory("MultiSigWallet");

  console.log("[*] Deploying MultiSigWallet...");
  
  const multisigWallet = await multisigWalletFactory.deploy(owners, number_of_verification);
  await multisigWallet.deployed();

  console.log("[*] Contract address:", multisigWallet.address);

  return multisigWallet.address;
}

async function fund_multisig(
  wallet: string[], 
  multisig_wallet: string,
  amount: string
) {
  /**
   * Send fund to the multisig contract.
   */

  let private_key = wallet[1];

  const signer = new ethers.Wallet(private_key, ethers.provider);

  console.log("[*] Fund the multisig with", amount, 'ETH');
  const fundingReciept = await signer
    .sendTransaction({
      to: multisig_wallet,
      value: ethers.utils.parseUnits(amount, "ether"),
    });

  await fundingReciept.wait();
  console.log("Funded:", fundingReciept);
}

async function submit_tx_to_multisig(
  wallet_address: string,
  wallet: string[],
  amount: string
) {
  /**
   * Send a transaction to the multisig.
   * Here, we decided to send a transfert fund transcation.
   * We decided here that the creator of the request is the recipient of the 
   * amount of ETH, but it can be parameterized.
   */
  
  let private_key = wallet[1];
  let public_key  = wallet[0];

  const multisigWalletFactory = await ethers.getContractFactory("MultiSigWallet");
  const multisigWallet = multisigWalletFactory.attach(wallet_address);

  const signer = new ethers.Wallet(private_key, ethers.provider);

  console.log("[*] Submitting TX to Multisig");
  // this TX only sends some funds to the multisig
  const submitReceipt = await multisigWallet
    .connect(signer)
    .submitTransaction(
      public_key,
      ethers.utils.parseUnits(amount, "ether"),
      "0x"
    );


  await submitReceipt.wait();
  console.log("[*] Request", amount, "ETH for", public_key);
}

async function fecth_transaction(wallet_address: string) {
  /**
   * Get from the wallet the first transaction in the stack.
   */
  
  const multisigWallet = await ethers.getContractAt("MultiSigWallet", wallet_address);

  console.log("[*] Get last transaction")

  return await multisigWallet.transactions(0);
}

async function confirm_transaction(wallet_address: string, tx_id: number, wallet: string[]) {
  /**
   * Confirm a transaction based on the id used as an index in the contract.
   */

  const multisigWallet = await ethers.getContractAt("MultiSigWallet", wallet_address);

  const signer = new ethers.Wallet(wallet[1], ethers.provider);

  console.log("[*] Approving TX");
  const confirmation = await multisigWallet
    .connect(signer)
    .confirmTransaction(tx_id, { gasLimit: 100000 });

  await confirmation.wait();

  console.log(confirmation);

}

async function execute_transaction(wallet_address: string, tx_id: number, wallet: string[]) {
  /**
   * When a transaction has been accepted by enough owner, it cna be execute.
   * We need to call the contract to execute the specific transaction.
   */
  const multisigWallet = await ethers.getContractAt("MultiSigWallet", wallet_address);

  const signer = new ethers.Wallet(wallet[1], ethers.provider);

  const confirmation = await multisigWallet.connect(signer).executeTransaction(tx_id, {
    gasLimit: 100000,
  });
  await confirmation.wait();

}

async function main() {
  /**
   * For the multisigWallet creation, we take all the pubic key of the owners.
   * When we create the contract, we also specify the number of approvation needed
   * to accept a new transaction.
   * 
   * Regarding the funding part, no verification is required. You can send directly
   * ETH to the contract. However, when you want to access fund, you will need to create
   * a transaction and this transaction need to be accepted by at least the number of people
   * defined on the smartcontract.
   */

  const CHECK_BALANCE_MULTI_SIG = true;

  // For this example, we create wallet account existing on ganache network
  // For real use case, please, do not access private key => this for demo purpose only
  const accounts = [
    ["0xa4c51c75A46Ac20161bBb860d2dAA7F52a4F3569", "0x35a4932c8881f75850344e524706bb95cd798c2961d69c092eb5774c084aae5c"],
    ["0x287531d24d403BA4e611C70a585F5A12BFF013Ff", "0x77d2f872422f120b3b971b9e10018f78e448a2885b30897e09854c179974e234"],
    ["0xbCbbf6bE81923b3Dd3FA1CA3604BE1E50E615E3C", "0x1c5599bc0adf500a7b02be65a94526503dc4939f936ed01f0b7d4288de4027b0"],
  ]
  const number_of_verification: number = 3;


  // Get the public key of the owners
  let owners_public_keys = []
  for (let index = 0; index < accounts.length; index++) {
    owners_public_keys.push(accounts[index][0])
  }

  // Create our MutliSig Wallet
  let multisig_wallet = await deploy_multisig(owners_public_keys, number_of_verification);


  // Check the balance of the smart contract
  if (CHECK_BALANCE_MULTI_SIG) {
    let balance_eth = await ethers.provider.getBalance(multisig_wallet);
    console.log("Contract Balance: " + balance_eth);
  }
  
  // Fund our contract with 2 ETH
  // Notice: no verification required for funding the contract
  await fund_multisig(accounts[0], multisig_wallet, "2");

  // Check the balance of the smart contract
  if (CHECK_BALANCE_MULTI_SIG) {
    let fund_balance_eth = await ethers.provider.getBalance(multisig_wallet);
    console.log("Contract Balance: " + fund_balance_eth);
  }

  // Submit a transaction to request fund
  // Here, the wallet number 2 will create a new transaction to request 1 ETH
  // Notice: the target wallet for the ETH can be different than the signer
  await submit_tx_to_multisig(multisig_wallet, accounts[2], "1")
  

  // Get the transaction from the contract
  let last_tx = await fecth_transaction(multisig_wallet);
  console.log(last_tx);

  // 3 owners of the contract need to approve the transaction
  // Else, the transaction cannot be accepted
  console.log("[*] Confirm tx")
  await confirm_transaction(multisig_wallet, 0, accounts[2])
  await confirm_transaction(multisig_wallet, 0, accounts[1])
  await confirm_transaction(multisig_wallet, 0, accounts[0])

  console.log("[*] Execute tx")
  await execute_transaction(multisig_wallet, 0, accounts[2])

  // Check the balance of the smart contract
  if (CHECK_BALANCE_MULTI_SIG) {
    let new_balance_eth = await ethers.provider.getBalance(multisig_wallet);
    console.log("Contract Balance: " + new_balance_eth);
  }

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
