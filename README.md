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

Update cloud functions on the server.



## Plugins

to servers-->Wiew Details-->Sync-->Sync And Watch Contracts events

### ItemsForSale

When an items is added to the marketplace

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

### SoldItems

When an items is sold

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


moralis server: https://admin.moralis.io/
Youtube lesson: https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw