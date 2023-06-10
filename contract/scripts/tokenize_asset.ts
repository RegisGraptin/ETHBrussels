
import { ERC721Collectibles } from '@taikai/dappkit';
import { ERC1155Standard, Web3Connection } from '@taikai/dappkit';


async function createNFTCollection(number_of_collections: number) {
    
}

async function createAssetNFT() {

    let privateKey = process.env.PRIVATE_KEY;

    /* Create your web3Connection */
    const web3Connection = new Web3Connection({ 
        web3Host: 'http://127.0.0.1:7545',
        privateKey: privateKey
    });
    
    await web3Connection.start();
    // await web3Connection.connect(); 

    console.log("User address", await web3Connection.getAddress());
    
    /* Create an ERC1155Standard Deployer */
    const deployer = new ERC1155Standard(web3Connection);
    

    /* Deploy the ERC1155 Contract */
    await deployer.loadAbi();


    // TODO :: Need to use a browser
    const tx = await deployer.deployJsonAbi('http://127.0.0.1:7545/');

    console.log("Here ??")


    /* Instantiate and use your new ERC1155 Token Contract*/
    const erc1155Contract = new ERC1155Standard(web3Connection, tx.contractAddress);
    await erc1155Contract.start();
    
    erc1155Contract.mint('0xa4c51c75A46Ac20161bBb860d2dAA7F52a4F3569', 0, 1000, '0x12345678');



//     const deployer = new Erc721Standard({
//         web3Host: 'http://127.0.0.1:7545/',
//         privateKey: privateKey
//     });
      
//     deployer.connection.start();
//     deployer.loadAbi();

//     const erc721Collectibles = new ERC721Collectibles({
//         web3Host: 'http://127.0.0.1:7545/',
//     });

//     let multi_sig_contract = "0xe76b37BD9E0cE560ae2C00D5C50a5C17466EEF4C"
    
    
//     await erc721Collectibles.loadAbi();

    
//     // Deploy

//     const transactionReceipt = await erc721Collectibles.deployJsonAbi(
//         "Art | BEPRO",
//         "B.E.P.R.O",
//         1000,
//         "0xDAI_ADDRESS",
//         "0xPURCHASE_TOKEN",
//         "0xBASE_FEE_ADDRESS",
//         "0xOTHER_ADDRESS" 
//      );
    
//     console.log(transactionReceipt);
    


//     let contractAddress = transactionReceipt.getAddress();



    

// //     const erc721Collectibles = new ERC721Collectibles({
// //         web3Host: 'LINK_TO_THE_PROPERTY ',
// //     });

// //     await erc721Contract.start();
// //     await erc721Collectibles.loadAbi();

// //     // Deploy
// //     const transactionReceipt = await erc721Collectibles.deployJsonAbi(
// //         "Art | BEPRO",
// //         "B.E.P.R.O",
// //         1000,
// //         "0xDAI_ADDRESS",
// //         "0xPURCHASE_TOKEN",
// //         "0xBASE_FEE_ADDRESS",
// //         "0xOTHER_ADDRESS" 
// //     );

// //     console.log(transactionReceipt);



}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
createAssetNFT().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  