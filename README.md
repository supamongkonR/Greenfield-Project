# BNB Greenfield Decentralize Storage Project

Dapp Project that using Greenfield blockchain as decentralize could storage to allow user can upload their own data

# Agenda
- Project Description
- Architecture and Design
- Dapp Example 
- Strat Project

  
# Project Description
This project is allow user upload file in front-end and store user file in greenfield blockchain such as we need to hosting HTML web profile
to greenfield blockchain and display it in browser 

by using React.js to implement front-end adn Express.js implement back-end

user can manage theire own data in bucket by connect their wallet to 
https://testnet.dcellar.io
it's will show all data in user bucket and easy to manage after upload. 

# Architecture and Design

- ``Back-end`` using for receive file from front-end via API and store that file in ``fileKeeper`` and excecute ``upload.sh`` in ``fileKeeper`` by using file in ``fileKeeper``.
- ``Contract-sdk`` using for implement smartcontract that will be use in greenfield blockchain with lib. 
- ``fileKeeper`` using for store file from back-end and store ``upload.sh`` for exceute command to upload file in folder to bucket
- ``front-end`` using for userinter fact that allow user drag and drop file and return TxHash back to user to verify 
- ``greenfield-cmd`` using for excecutue greenfield blockchain command to create bucket and storte file 

<div align="center">
  <img width="403" alt="image" src="https://github.com/supamongkonR/Greenfield-Project/assets/73258014/5e3a72d8-7a76-4a60-9f21-93dbe37a0d5e">
</div>


# Dapp Example 

Hosting HTML File to Greenfield blockchain by using my Dapp
<div align="center">
  <img width="742" alt="image" src="https://github.com/supamongkonR/Greenfield-Project/assets/73258014/5f7b4644-48cc-4ab5-8e31-ac477e9480b4">
</div>

<div align="center"> Result </div>
<div align="center">
  <img width="764" alt="image" src="https://github.com/supamongkonR/Greenfield-Project/assets/73258014/d2a1724a-19e3-42dc-8e80-1c86b4106091">
</div>

## Start Project

### Back-end
install dependency
```sh
npm i
```
Start back-end server 
```sh
nodemon server.js
```

### Front-end
install dependency
```sh
npm i
```
Start front-end server
```sh
npm start
```

### Contract-sdk
depoly contract
```sh
forge create contracts/Register/Register.sol:Register --rpc-url=https://data-seed-prebsc-1-s1.binance.org:8545/ --private-key=<YOU_PRIVATE_KEY>
```
interact with contract 
```sh
cast call <CONTRACT_ADDRESS> "registerFile("test_index.html",1)"  --rpc-url=https://data-seed-prebsc-1-s1.binance.org:8545/ --private-key=<YOU_PRIVATE_KEY>
```

### Greenfield
Set Account 

create key.txt file in /build folder and following command
```sh
 ./gnfd-cmd account import key.txt 
```
after that enter you password for account 
```sh
Please enter the passphrase now: 12345
```
and then set account as defult account 
```sh
./gnfd-cmd account set-default <ADDRESS>
```
Put object
```sh
./gnfd-cmd object put --contentType "text/xml" message.txt gnfd://test-bucket-1/testobject
```
