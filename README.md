# web3_app_tutorial


## Ganache:

Start an instance of ganache on your localhost and point it to the truffle-config.js.

## FRPC
Create server on moralis.
In Devchain Proxy Settings, copy the FRPC configuration.

Example:

```txt
[common]
  server_addr = xxxxxx.usemoralis.com
  server_port = 7000
  token = xxxxx
[ganache]
  type = http
  local_port = 7545
  custom_domains = xxxxxx.usemoralis.com
```
Update config frpc.ini.

```bash
./frpc -c frpc.ini 
```
## Truffle migrations

For add contract migrations:
```bash
truffle migrate --reset
```

## Cloud Functions

Use this for example:

```txt
Moralis.Cloud.define("getUserItems", async (request) => {
  const query = new Moralis.Query("EthNFTOwners");
  query.equalTo("contract_type", "ERC721");
  query.containedIn("owner_of", request.user.attributes.accounts);
  const queryResults = await query.find();
  const results = [];
  let sum = 0;
  for (let i = 0; i < queryResults.length; ++i) {
    results.push({
      "id": queryResults[i].attributes.objectId,
      "tokenid": queryResults[i].attributes.token_id,
      "tokenAddress": queryResults[i].attributes.address,
      "symbol": queryResults[i].attributes.symbol,
      "tokenUri": queryResults[i].attributes.token_uri,
    });
  }
  return sum / results;
});
```