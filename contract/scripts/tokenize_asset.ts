
import { Web3Connection } from '@taikai/dappkit';
import { ERC721Collectibles } from '@taikai/dappkit';


async function createNFTCollection(number_of_collections: number) {
    
}

async function createAssetNFT() {

    let privateKey = process.env.PRIVATE_KEY;

    const web3Connection = new Web3Connection({ 
     web3Host: 'WEB3_LINK',
     privateKey: privateKey
    });
    
    await web3Connection.start();
    await web3Connection.connect();
    
    console.log("User address", await web3Connection.getAddress());

    

    // let deployer = new Erc721Standard({
    //     web3Host: "http://127.0.0.1:7545",
    //     privateKey: privateKey
    // });



    // Need to see this link
    // https://docs.dappkit.dev/start-building/how-to-guides/create-an-nft



    

//     const erc721Collectibles = new ERC721Collectibles({
//         web3Host: 'LINK_TO_THE_PROPERTY ',
//     });

//     await erc721Contract.start();
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
//     );

//     console.log(transactionReceipt);



}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
createAssetNFT().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  