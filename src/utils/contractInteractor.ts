import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();
import { abi as ABI_picademy } from '../constants/abis/picademyErc20.json';
import { abi as ABI_stakingManager } from '../constants/abis/stakingManager.json';
import contractAddress from '../constants/address_test.json';
// import contractAddress from '../constants/address_local.json';
const ADDRESS_picademy = contractAddress.picademy;
const ADDRESS_stakingManager = contractAddress.stakingManager;
let PROVIDER_URL;
if (process.env.CHAIN_NAME == 'astar')
  PROVIDER_URL = 'https://rpc.startale.com/zkatana';
else if (process.env.CHAIN_NAME == 'neon')
  PROVIDER_URL = 'https://devnet.neonevm.org';
else throw new Error('chain not found');

// 스테이킹 MIN = 10e18개로 임시 설정
const MIN_STAKE_AMOUNT = 10e18;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const picademyContract = new ethers.Contract(
  ADDRESS_picademy,
  ABI_picademy,
  signer,
);
const stakingManagerContract = new ethers.Contract(
  ADDRESS_stakingManager,
  ABI_stakingManager,
  signer,
);

const stake = async (userAddress: string) => {
  picademyContract
    .approve(ADDRESS_stakingManager, MIN_STAKE_AMOUNT)
    .catch((err) => {
      throw new Error(`approve error: ${err}`);
    });
  stakingManagerContract.stake(userAddress, MIN_STAKE_AMOUNT).catch((err) => {
    throw new Error(`stake error: ${err}`);
  });
  return true;
};

const unstake = async (userAddress: string) => {
  stakingManagerContract.unstake(userAddress).catch((err) => {
    throw new Error(`unstake error: ${err}`);
  });
  return true;
};

const claim = async (userAddress: string, rewardAmount: number) => {
  picademyContract.mint(userAddress, rewardAmount).catch((err) => {
    throw new Error(`claim(mint) error: ${err}`);
  });
  return true;
};

const slash = async (userAddress: string) => {
  stakingManagerContract.slash(userAddress).catch((err) => {
    throw new Error(`slash error: ${err}`);
  });
  return true;
};

export const contractInteractor = {
  stake,
  unstake,
  claim,
  slash,
};

(async () => {
  const a = Object.keys(picademyContract);
  const b = Object.keys(stakingManagerContract);
  console.log(a,b);
  console.log(
    await picademyContract.balanceOf(
      '0x457C3bedC0BC83f794eFFB0F6A6A11F03257F894',
    ),
  );
})();
