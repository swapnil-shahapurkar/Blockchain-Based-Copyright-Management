
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

### Blockchain Development
| ![Truffle](https://trufflesuite.com/img/truffle-logo-dark.svg) | ![image](https://github.com/user-attachments/assets/f834f1cc-bc0d-40f1-a021-30d61242dc65)| ![MetaMask](https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg) | ![Web3.js](https://seeklogo.com/images/W/web3js-logo-62DEE79B50-seeklogo.com.png) |
| :------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------: | :-------------------------------------------------------: |
| **Truffle**: Smart contract development framework.             | **Ganache**: Local Ethereum blockchain.                                                                              | **MetaMask**: Wallet for Ethereum interaction.            | **Web3.js**: Library for blockchain interaction.          |

### Frontend Development
| <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" width="200" height="200"> | <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" width="200" height="200"> | <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" width="200" height="200"> |
| :-------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| **HTML**: Markup language for structure.                                               | **CSS**: Styling language.                                                           | **JavaScript**: For interactive functionality.                                        |



### Backend and Database
| ![Express.js](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png) | ![MongoDB](https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg) | ![Node.js](https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg) | ![Mongoose](https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png) |
| :------------------------------------------------------------------------------: | :----------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| **Express.js**: Backend framework.                                              | **MongoDB**: Database for storing data.                                  | **Node.js**: Server environment.                                               | **Mongoose**: ODM for MongoDB.                                                 |

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

## 🌟 Why Blockchain for Copyright Management?
- **Immutability**: Once registered, content details cannot be tampered with.
- **Transparency**: Ownership is verifiable by anyone at any time.
- **Decentralization**: No central authority; records are stored on a blockchain.

---

## 📄 License
This project is licensed under the **Swapnil Shahapurkar Exclusive License (SSEL)**.  
View the full license [here](LICENSE).

---


Feel free to contribute and enhance this project! 😊
```

