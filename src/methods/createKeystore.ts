// ๐ Import library weโre using to encrypt keystore
import sjcl from "@tinyanvil/sjcl";
// ๐ Importing types
import { AccountKeys } from "../types/types.d";

export const createKeystore = (keypair: any, pincode: string): AccountKeys => {
  // ๐ Get public key and secret from accountโs keypair
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();

  return {
    publicKey,
    // ๐ Encrypt secret key (using pincode provided) in keystore
    keystore: sjcl.encrypt(pincode, secretKey, {
      adata: JSON.stringify({
        publicKey
      })
    })
  };
};
