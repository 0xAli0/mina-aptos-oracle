const express = require('express');
const bodyParser = require('body-parser');
const aptos = require('aptos');

require("dotenv").config();

const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const MODULE_ADDRESS = "0x40076a978340f643e27455a9d75c2e5adc7216a94ba45dfa6c556243efcad259";

async function pushData(data, privateKey) {
  const client = new aptos.AptosClient(NODE_URL);

  if (!privateKey.startsWith('0x')) {
    privateKey = '0x' + privateKey;
  }

  const privateKeyBytes = aptos.HexString.ensure(privateKey).toUint8Array();
  const adminWallet = new aptos.AptosAccount(privateKeyBytes);
  const walletData = adminWallet.toPrivateKeyObject();

  try {
    const rawTx = await client.generateTransaction(walletData.address, {
      type: 'entry_function_payload',
      function: `${MODULE_ADDRESS}::oracle::push_oracle_data`,
      type_arguments: [],
      arguments: [data],
    });

    const submittedTx = await client.signAndSubmitTransaction(
      adminWallet,
      rawTx
    );

    const result = await client.waitForTransactionWithResult(submittedTx);

    if (result.success === false) {
      console.log('Transaction Failed');
      console.log(result.vm_status);
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log('Error ocurred');
    console.log(error);
    return {
      success: false,
    };
  }
}

const app = express();
const PORT = 3001;

// Body parser middleware
app.use(bodyParser.json());

// Oracle endpoint
app.post('/submit', (req, res) => {
  console.log('Data received from smart contract:', req.body);
  let dataValue = req.body.number;
  pushData(dataValue,process.env.APTOS_PRIVATE_KEY)

  res.json({ status: 'success', message: 'Data received successfully' });
});

app.listen(PORT, () => {
  console.log(`Oracle server is running on http://localhost:${PORT}`);
});
