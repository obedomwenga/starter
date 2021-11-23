// 🌎 Importing Stellar SDK JS library
import StellarSdk from "stellar-sdk";
// 🌎 Importing types
import { AccountData } from "../types/types.d";

export const fetchAccount = async (publicKey: string) => {
  // 🚀 Creating server instance with Stellar test network
  const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
  // 🚀 Fetching account data for the provided public key
  const accountData = await server.accounts().accountId(publicKey).call();

  // 🌎 Destructuring some `accountData` properties for more convenient usage
  const {
    last_modified_time,
    balances,
    num_sponsoring,
    num_sponsored
  } = accountData;

  return {
    last_modified_time,
    // 🌎 Formatting `balances` to match what is needed in UI
    balances: balances.reduce((res: AccountData[], b: any) => {
      let balance;

      // 🚀 If asset type is `native`, we set asset code to XLM
      if (b.asset_type === "native") {
        balance = {
          balance: b.balance,
          asset_code: "XLM"
        };
      } else {
        balance = {
          balance: b.balance,
          asset_code: b.asset_code,
          asset_issuer: b.asset_issuer
        };
      }

      return [...res, balance];
    }, []),
    num_sponsoring,
    num_sponsored
  };
};
