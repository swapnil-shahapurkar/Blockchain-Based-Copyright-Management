
# Blockchain-Based Copyright Management System

## 📜 Project Overview
The **Copyright Management System** is a blockchain-based web application designed to manage and verify the ownership of digital content. This system ensures copyright protection by leveraging blockchain's immutability, providing features like getting copyrights, transferring ownership, deleting copyrights, viewing all copyrights, and verifying ownership. 

Our project is built with **five smart contracts** that handle various operations, a robust **backend** to interact with the blockchain, and a user-friendly **frontend** for seamless interaction.

---

## ⚙️ Features
1. **Get Copyright**: Users can register their content to obtain a copyright.
2. **Transfer Ownership**: Ownership of a copyright can be transferred to another user.
3. **Delete Copyright**: Remove an existing copyright from the blockchain.
4. **View Copyrights**: View all copyrights registered by a user.
5. **Verify Copyright**: Check the ownership and authenticity of a copyright.

---

## 🛠️ Technologies Used
![Truffle](https://trufflesuite.com/img/truffle-logo-dark.svg)  
**Truffle**: Development framework for Ethereum.  
![Ganache](https://trufflesuite.com/img/ganache-logo.svg)  
**Ganache**: Local Ethereum blockchain for testing and development.  
![Metamask](https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg)  
**Metamask**: Browser extension for managing Ethereum wallets and interacting with dApps.  
![MongoDB](https://www.mongodb.com/assets/images/global/leaf.svg)  
**MongoDB**: Database for storing non-sensitive project data.  
**Mongoose**: ODM library for MongoDB.  
**Web3.js**: Interfacing with Ethereum blockchain.  
**HTML**, **CSS**, **JavaScript**, **Express.js**: For creating the frontend and backend of the application.

---

## 🏗️ Project Structure
### Smart Contracts
1. **Copyright.sol**: Main contract for copyright registration and verification.  
2. **Transfer.sol**: Handles the transfer of ownership.  
3. **Delete.sol**: Enables deletion of existing copyrights.  
4. **View.sol**: Allows users to view their registered copyrights.  
5. **Verify.sol**: Verifies ownership of a given content.

### Frontend
- **User-friendly web interface** for interacting with the blockchain.
- Built using **HTML, CSS, and JavaScript**.

### Backend
- **Express.js** server to manage API calls and interact with blockchain smart contracts.
- Uses **Mongoose** to interface with **MongoDB**.

---

## 🚀 How to Run the Project
Follow these steps to set up and run the project:

### Prerequisites
1. Install **Truffle** and **Ganache**:
   ```bash
   npm install -g truffle ganache
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Deployment
1. Start a local blockchain using Ganache. Copy two addresses from Ganache into Metamask.
2. Modify the `config.js` file to map to your Ganache network.
3. Compile and migrate the smart contracts to the network:
   ```bash
   truffle compile
   truffle migrate
   ```

### Testing
- To test the smart contracts, run:
  ```bash
  node testing.js
  ```

### Running the Server
1. Start the Express.js server:
   ```bash
   node server.js
   ```
2. Open the application in your browser.

---

## 🖼️ User Interface
The web interface features a **navigation menu** that allows users to:
- Register copyrights.
- Transfer ownership.
- Delete copyrights.
- View registered copyrights.
- Verify the authenticity of a copyright.

---

## 🌟 Why Blockchain for Copyright Management?
- **Immutability**: Once registered, content details cannot be tampered with.
- **Transparency**: Ownership is verifiable by anyone at any time.
- **Decentralization**: No central authority; records are stored on a blockchain.

---

## 🛡️ Testing and Security
The system includes a `testing.js` script to validate the smart contract functionalities. Transactions are secured via Metamask integration.

---

## 📄 License
This project is licensed under the **Swapnil Shahapurkar Exclusive License (SSEL)**.  
View the full license [here](LICENSE).

---

## 🖼️ Technology Stack Logos
### Truffle
![Truffle Logo](https://trufflesuite.com/img/truffle-logo-dark.svg)

### Ganache
![Ganache Logo](https://trufflesuite.com/img/ganache-logo.svg)

### Metamask
![Metamask Logo](https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg)

---

Feel free to contribute and enhance this project! 😊
```

This README includes everything about your project with links, technology logos, and structured information for developers and users. You can customize the images' URLs if you want to use local files or different logos. Let me know if you'd like any further modifications!
