import { ethers } from 'ethers';
import { getMultiSigContract } from './getMultiSigContract';

const estate = "";
let full:boolean = true;

const contract = getMultiSigContract();

if (full) {
    const options = {value: ethers.utils.parseEther("100")};
    contract.buyFull(estate, options);
}
else {
    const options = {value: ethers.utils.parseEther("0.1")};
    contract.buyPart(estate, options);
}