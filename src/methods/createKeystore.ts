// 🌎 Import library we’re using to encrypt keystore
import sjcl from "@tinyanvil/sjcl";
// 🌎 Importing types
import { AccountKeys } from "../types/types.d";

export const createKeystore = (keypair: any, pincode: string): AccountKeys => {
  // 🚀 Get public key and secret from account’s keypair
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();

  return {
    publicKey,
    // 🌎 Encrypt secret key (using pincode provided) in keystore
    keystore: sjcl.encrypt(pincode, secretKey, {
      adata: JSON.stringify({
        publicKey
      })
    })
  };
};
