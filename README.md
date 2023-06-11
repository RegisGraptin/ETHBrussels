
# ETHBrussels - TOKENSTATE

TOKENSTATE aims to harness the power of blockchain technology to construct physical non-fungible tokens (pNFTs), which serve as verifiable proofs of ownership and authenticity. The core benefits include facilitating financial support to real estate assets via effective funding strategies and granting investors the opportunity to broaden their investment portfolio, thereby amplifying their potential for financial growth and stability.

Our purpose is to revolutionize the real estate industry by leveraging blockchain technology for the tokenization of real estate assets. We seek to create a platform that provides financial accessibility, democratizes real estate investment, and promotes economic inclusivity.

> A webiste of this project can be found in the `frontend` folder.

## MultiSig Wallet

When a company wants to buy land and build a new house, it needs funds to finance the project. To manage this money, we decided to create a MultiSig Wallet that allows the control over the transaction possible. Thus, only transactions that have been approved can be transferred. Thus, the company needs to unlock funds to pay for the construction work, they need to present this transaction to the other owner, and they need to approve it.

For this implementation of a multisig wallet is used. This first contract is focused on the liquidity aspect.

An implementation can be seen at `./contract/contracts/MultiSigWallet.sol`. Also, the lifecycle of this contract can be seen at `./contract/scripts/deploy_multisig.ts`. In this first implementation, we want to have the possibility to create a contract with a list of owners and a number of person needed to accept the transaction. Then, anyone in the contract can send fund to it. But when we want to retrieve the fund, we will need to create a new transaction and send it to the contract. Then, the owners of the contract should approve the transaction. Finally, when enough person approuve the transaction, the transaction is execute directly on the contract.


A second implementation of a Multisig can be found here `MultiSigWalletAsset.sol`. This one is mainly focused on the control over the share of the NFT.

## KYC System

As we are dealing with real asset, a KYC system is mandatory. To implement this system, we though about using the `MultiSigWalletAsset`. Currently this system is quite simple, a user fill a form saying that he wants to invest in real estate. The user also share his public key and sign his data. Then, the company receives a new application, and decide to approve or not the transaction. 

At the moment, this KYC system is only managed by a list of addresses store in a smart contract. But in the future, we can improve this services. Also, one idea was to have different level of KYC. For example, based on the trade flow, we can adjust the require information of the person. This can also allow the person to buy different kind of property. 


## New Building 

When a company wants to gather funds, it needs to create a new NFT that will provide all the information about the new building. This main NFT will be owned by the `MultiSigWalletAsset` allowing approval about the information send. Once the NFT is created, this one can create a list of NFT that can be tradable. At the moment, we want to have control over the lifecycle of the NFT. Indeed, only a KYC user can interact with the NFT. That's the reason why all exchange should be made by the main NFT, to be sure that the address of the sender and recipient are allowed by our KYC system.


Currently, our first working approach is to use `ERC721Collectibles`. This allow us to create a NFT collection having the same price over all of them. Regarding the implementation, we are using the `dappkit.dev` library allowing us to mint NFT in a simple way.  

> See `./frontend/pages/create.tsx` for the implementation.




