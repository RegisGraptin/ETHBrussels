
# ETHBrussels - TOKENSTATE

TOKENSTATE aims to harness the power of blockchain technology to construct physical non-fungible tokens (pNFTs), which serve as verifiable proofs of ownership and authenticity. The core benefits include facilitating financial support to real estate assets via effective funding strategies and granting investors the opportunity to broaden their investment portfolio, thereby amplifying their potential for financial growth and stability.

Our purpose is to revolutionize the real estate industry by leveraging blockchain technology for the tokenization of real estate assets. We seek to create a platform that provides financial accessibility, democratizes real estate investment, and promotes economic inclusivity.

> A webiste of this project can be found in the `frontend` folder.

## MultiSig Wallet

When a company wants to buy land and build a new house, it needs funds to finance the project. To manage this money, we decided to create a MultiSig Wallet that allows the control over the transaction possible. Thus, only transactions that have been approved can be transferred. Thus, the company needs to unlock funds to pay for the construction work, they need to present this transaction to the other owner, and they need to approve it.

For this implementation of a multisig wallet is used. This first contract is focused on the liquidity aspect.

An implementation can be seen at `./contract/contracts/MultiSigWallet.sol`. Also, the lifecycle of this contract can be seen at `./contract/scripts/deploy_multisig.ts`. In this first implementation, we want to have the possibility to create a contract with a list of owners and a number of person needed to accept the transaction. Then, anyone in the contract can send fund to it. But when we want to retrieve the fund, we will need to create a new transaction and send it to the contract. Then, the owners of the contract should approve the transaction. Finally, when enough person approuve the transaction, the transaction is execute directly on the contract.


A second implementation of a Multisig can be found here `MultiSigWalletAsset.sol`. This one is mainly focused on the control over the share of the NFT.

TODO :: 

## KYC System

As we are dealing with real asset, a KYC system is mandatory. To implement this system, we though that this one can be implemented in the MultiSigWalletAsset. Thus, all the wallet store in this contract are known. Thus, the contract can approuve or not to buy a contract


KYC system 



### NFT Creation

When a company wants to create a new building on chain, 

the process ?


A first NFT will be created refering to the new building/appartment.
Then, this NFT, will have the possibility to mint other NFT to decomposed the number of token available. 

Those NFT can be tradable. Thus a person can decide to buy/sell those NFT.




