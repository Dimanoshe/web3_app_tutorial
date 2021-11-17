# web3_app_tutorial


## Ganache:

Start an instance of ganache on your localhost and point it to the truffle-config.js.

## FRPC
Download FRPC.
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
  return results;
});

Moralis.Cloud.beforeSave("ItemsForSale", async (request) => {
  
  const query = new Moralis.Query("EthNFTOwners");
  query.equalTo("token_address", request.object.get('tokenAddress'));
  query.equalTo("token_id", request.object.get('tokenId'));
  const object = await query.first();
  if (object){
  	const owner = object.attributes.owner_of;
    const userQuery = new Moralis.Query(Moralis.User);
    userQuery.equalTo("account", owner)
    const userObject = await userQuery.first({useMasterKey:true});
    if (userObject){
      request.object.set('user', userObject);
    }
    request.object.set('token', object)
  }
});

Moralis.Cloud.beforeSave("SoldItems", async (request) => {
  
  const query = new Moralis.Query("ItemsForeSale");
  query.equalTo("uid", request.object.get('uid'));
  const item = await query.first();
  if (item){
    request.object.set('item', item)
    item.set('isSold', true);
    await item.save();
    
    
    const userQuery = new Moralis.Query(Moralis.User);
    userQuery.equalTo("account", request.object.get('buyer'))
    const userObject = await userQuery.first({useMasterKey:true});
    if (userObject){
      request.object.set('user', userObject);
    }
  }
});
```

## Plugins

to servers-->Wiew Details-->Sync-->Sync And Watch Contracts events

Add itemAdded(uint256, uint256, address, uint256)
abi:
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "tokenAddress",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "askingPrice",
      "type": "uint256"
    }
  ],
  "name": "itemAdded",
  "type": "event"
}

and itemSold(uint256, address, uint256)
abi:
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "buyer",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "askingPrice",
      "type": "uint256"
    }
  ],
  "name": "itemSold",
  "type": "event"
}


