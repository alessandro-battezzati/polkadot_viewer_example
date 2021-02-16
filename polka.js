
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {              

  const provider = new WsProvider('wss://rpc.polkadot.io');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  
  // The actual address that we will use
  const ADDR = '12LjfKQQiSo3rjneE7H3JVhXCDxBs5adj1DGX8fxwNGGkr1X';

// Retrieve the last timestamp
const now = await api.query.timestamp.now();

// Retrieve the account balance & nonce via the system module
const { nonce, data: balance } = await api.query.system.account(ADDR);
console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

  
}

main().catch(console.error).finally(() => process.exit());
