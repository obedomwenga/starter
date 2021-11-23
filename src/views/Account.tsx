// 🌎 Imports in the file
import React from "react";
import StellarSdk from "stellar-sdk";
import sjcl from "@tinyanvil/sjcl";
// UI elements
import { TextLink, Identicon, Heading3 } from "@stellar/design-system";
// Modals
import { EnterPincodeModal } from "../components/EnterPincodeModal";
// Methods
import { copyToClipboard } from "../methods/copyToClipboard";
// Types
import { AccountKeys, AccountData } from "../types/types.d";

interface AccountProps {
  accountKeys: AccountKeys;
  accountData: AccountData | null;
}

export const Account = ({ accountKeys, accountData }: AccountProps) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [pinModalVisible, setPinModalVisible] = React.useState(false);

  const copyAddress = () => {
    // 🌎 Copy public key to clipboard
    copyToClipboard(accountKeys?.publicKey);
  };

  const copySecret = (pincode: string) => {
    // 🌎 Making sure there is a keystore
    if (accountKeys?.keystore) {
      try {
        // 🚀 Create keypair from secret key
        const keypair = StellarSdk.Keypair.fromSecret(
          // 🌎 Decrypt secret key from keystore
          sjcl.decrypt(pincode, accountKeys.keystore)
        );
        // 🌎 Copy secret key to clipboard
        copyToClipboard(keypair.secret());
      } catch (e) {
        // 🌎 Handle wrong pincode error
      }
    }
  };

  // 🌎 Render Account view UI
  return (
    <div className="Account">
      <Heading3>Your account address</Heading3>
      {/* 🚀 Display identicon which is a unique icon, generated based on the
      wallet public key */}
      <Identicon publicAddress={accountKeys.publicKey} />

      <div className="Account__copyLinks">
        {/* 🌎 Trigger copy public key action */}
        <TextLink onClick={copyAddress}>Copy Address</TextLink>
        {/* 🌎 Trigger copy secret key action */}
        <TextLink onClick={() => setPinModalVisible(true)}>
          Copy Secret
        </TextLink>
      </div>

      <Heading3>Balances</Heading3>
      <table className="Balances">
        <tbody>
          {/* 🚀 Render account balances */}
          {accountData?.balances.map((b) => (
            <tr key={`${b.asset_code}-${b.asset_issuer || "native"}`}>
              <td>{b.asset_code}</td>
              <td>{b.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <EnterPincodeModal
        visible={pinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onDone={copySecret}
      />
    </div>
  );
};
