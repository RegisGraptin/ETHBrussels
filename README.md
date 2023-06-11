
# ETHBrussels - TOKENSTATE

TOKENSTATE aims to harness the power of blockchain technology to construct physical non-fungible tokens (pNFTs), which serve as verifiable proofs of ownership and authenticity. The core benefits include facilitating financial support to real estate assets via effective funding strategies and granting investors the opportunity to broaden their investment portfolio, thereby amplifying their potential for financial growth and stability.

Our purpose is to revolutionize the real estate industry by leveraging blockchain technology for the tokenization of real estate assets. We seek to create a platform that provides financial accessibility, democratizes real estate investment, and promotes economic inclusivity.

> A website of this project can be found in the `frontend` folder. [See the project in your browser](https://eth-brussels.vercel.app/).

## MultiSig Wallet

When a company intends to purchase land and construct a new house, securing adequate funding for the project becomes crucial. To efficiently manage the financial aspects, we have opted to establish a MultiSig Wallet, which enables control and oversight of transactions. This means that only approved transactions can be executed and funds transferred. Consequently, whenever the company needs to unlock funds for construction expenses, they are required to present the transaction to the other owner(s) for approval before it can be processed. We implemented a MultiSig in Solidity that manage the liquidity aspect. The implementation can be seen at `./contract/contracts/MultiSigWallet.sol`. Also, the lifecycle of this contract can be seen at `./contract/scripts/deploy_multisig.ts`. 

In this first implementation, when deploying the contract, we need to defined the list of owners that will be responsible for approving or rejecting future transactions. Also, we specify the required number of verifications needed, which is configurable when we creating the contract.
In this implementation, anyone can send fund to it. But when we want to retrieve the fund, we will need to create a new transaction and send it to the contract. Then, the owners of the contract should approve the transaction. Finally, when enough person aprove the transaction, the transaction is executed directly within the contract.

A second implementation of a Multisig can be found here `MultiSigWalletAsset.sol`. This one is mainly focused on the real state asset and the creation of the NFT to sell that to potential clients. We also have a KYC system that manage the client.

## KYC System

As we are dealing with real asset, a KYC system is mandatory. To implement this system, we though about using the `MultiSigWalletAsset`. Currently this system is quite simple, a user fill a form saying that he wants to invest in real estate. The user also share his public key and sign his data. Then, the company receives a new application, and decide to approve or not the transaction. 

At the moment, this KYC system is only managed by a list of addresses store in a smart contract. A company have to manually send the address of the user to the smart contract to approve the user. But in the future, we can improve this process to be more fluid and efficient for the company. 

Also, for future version, one idea was to have different level of KYC. For example, based on the trade flow, we can adjust the require information of a person. This can also allow the person to buy different kind of property. 


## New Building - NFT Creation

When a company wants to gather funds, it needs to create a new NFT that will provide all the information about the new building. This main NFT will be owned by the `MultiSigWalletAsset` that will have the control over the information of this contract and have the possibility to mint NFT that can be sell to future potential client. Additionally, this MultiSig will manage the KYC process. Thus, we have a control over the lifecycle of the NFT and can manage if the user has a KYC or not.

Currently, our first working approach is to use `ERC721Collectibles` using the LayerX dappKit framework. This allow us to create a NFT collection having the same price over all of them. This approach is only accessible for the administrator of the website. 

> See `./frontend/pages/create.tsx` for the implementation.




