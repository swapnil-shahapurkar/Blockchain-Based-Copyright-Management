const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');



// MongoDB connection
mongoose.connect('mongodb://localhost:27017/imageUpload', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Image schema
const imageSchema = new mongoose.Schema({
    filename: String,
    hash: String,
    data: Buffer, // Store image binary data
    owner: String, // Store the owner's name/address
});

const Image = mongoose.model('Image', imageSchema);

const app = express();
app.use(express.json());
app.use(cors());





const {Web3} = require("web3");
const fs = require("fs");


// Connect to Ganache
const web3 = new Web3("http://127.0.0.1:7545");

// Load contract artifacts
function loadContract(contractName) {
  const artifact = JSON.parse(
    fs.readFileSync(path.join(__dirname, `truffle/build/contracts/${contractName}.json`))
  );
  return {
    abi: artifact.abi,
    address: artifact.networks[Object.keys(artifact.networks)[0]].address,
  };
}

// Load all contracts
const Storage = loadContract("StorageContract");
const Verification = loadContract("VerificationContract");
const Transfer = loadContract("TransferContract");
const Delete = loadContract("DeleteContract");
const Upload = loadContract("UploadContract");

// Instantiate contracts
const storageContract = new web3.eth.Contract(Storage.abi, Storage.address);
const verificationContract = new web3.eth.Contract(Verification.abi, Verification.address);
const transferContract = new web3.eth.Contract(Transfer.abi, Transfer.address);
const deleteContract = new web3.eth.Contract(Delete.abi, Delete.address);
const uploadContract = new web3.eth.Contract(Upload.abi, Upload.address);






// Serve static files
app.use(express.static(path.join(__dirname, 'Frontend')));

// Serve HTML pages
const pages = ['/', '/delete', '/transfer', '/list','/verify'];
pages.forEach(page => {
    app.get(page, (req, res) => {
        res.sendFile(path.join(__dirname, 'Frontend', `${page === '/' ? 'upload' : page.slice(1)}.html`));
    });
});

// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint: Upload image with owner information
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Validate input
        if (!req.file || !req.body.owner) {
            return res.status(400).json({ error: 'Image and owner information are required.' });
        }

        const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
        const sampleHash = Buffer.from(hash, 'hex');

        // Check if the image is already owned
        const ownerAddress2 = await storageContract.methods.getOwner(sampleHash).call();
        if (ownerAddress2 !== '0x0000000000000000000000000000000000000000') {
            // Respond and return early to avoid further code execution
            return res.status(200).json({ message: `This image is already Copyrighted(owned)   by: ${ownerAddress2}!` });
        }

        // Upload the image hash
        await uploadContract.methods
            .uploadHash(sampleHash, req.body.owner)
            .send({ from: req.body.owner, gas: 300000 });

        // Query the updated owner address
        const ownerAddress1 = await storageContract.methods.getOwner(sampleHash).call();

        // Validate ownership
        if (req.body.owner.toLowerCase() === ownerAddress1.toLowerCase()) {
            const newImage = new Image({
                filename: req.file.originalname,
                hash,
                data: req.file.buffer,
                owner: req.body.owner,
            });

            await newImage.save();

            // Final response
            return res.status(200).json({ message: 'Image Copyrighted successfully!', hash });
        } else {
            return res.status(400).json({ error: 'Ownership validation failed after upload.' });
        }
    } catch (err) {
        // Handle unexpected errors
        console.error('Error during upload:', err);
        return res.status(500).json({ error: 'Error uploading image.', details: err.message });
    }
});

// Endpoint: Verify ownership of an uploaded image



// Endpoint: Verify ownership of an uploaded image
app.post('/verify', upload.single('image'), async (req, res) => {
    try {
        if (!req.file || !req.body.owner) {
            return res.status(400).json({ error: 'Image and owner information are required for verification.' });
        }

        // Calculate the hash of the uploaded image
        const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
        const sampleHash =  Buffer.from(hash, 'hex');

        const verificationResult = await verificationContract.methods
        .verifyOwnership(sampleHash, req.body.owner)
        .call();
       console.log(verificationResult)
        // Search for the image in the database
      

        // Check if the owner matches
        if (verificationResult) {
            const image = await Image.findOne({ hash });

            if (!image) {
                return res.status(404).json({ message: 'Image not found in the database.' });
            }
            const imageUrl = `/image/${image.hash}`; // URL to fetch the image from the backend
            return res.json({ message: 'Image ownership verified successfully! You own the  Coyright ', imageUrl });
        } else {
            return res.status(200).json({ message: 'Ownership mismatch. This image is not copyrighted to  You.' });
        }

    } catch (err) {
        res.status(500).json({ error: 'Error verifying ownership.', details: err.message });
    }
});


app.get('/images', async (req, res) => {
    try {
        const ethereumAddress = req.headers['ethereum-address'];

        if (!ethereumAddress) {
            return res.status(400).json({ error: "Ethereum address is required." });
        }

        console.log(`Request from Ethereum address: ${ethereumAddress}`);
        // Fetch and filter images if needed
        const images = await Image.find({owner:ethereumAddress});
        res.json(images);
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ error: "Error fetching images." });
    }
});

// Endpoint: Serve image by hash
app.get('/image/:hash', async (req, res) => {
    try {
        const image = await Image.findOne({ hash: req.params.hash });

        if (!image) {
            return res.status(404).json({ error: 'Image not found.' });
        }

        res.contentType('image/jpeg');
        res.send(image.data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching image.', details: err.message });
    }
});

// Endpoint: Delete image by hash
app.delete('/image/:hash/delete', async (req, res) => {
    const { currentOwner } = req.body;
    const imageHash = req.params.hash;

    if (!currentOwner) {
        return res.status(400).json({ error: 'Current owner address is required.' });
    }

    try {
        // Normalize the current owner address for case-insensitive comparison
        const normalizedCurrentOwner = currentOwner.toLowerCase();

        // Find the image by hash in the database
        const image = await Image.findOne({ hash: imageHash });

        if (!image) {
            return res.status(404).json({ error: 'Image not found.' });
        }

        // Check if the current owner matches the image owner
        if (image.owner.toLowerCase() !== normalizedCurrentOwner) {
            return res.status(200).json({ error: 'You are not authorized to delete this image.' });
        }

        // Call the smart contract to delete the image entry on the blockchain

        const sampleHash = Buffer.from(imageHash, 'hex');
        const deleteResult = await deleteContract.methods
            .deleteHashEntry(sampleHash)
            .send({ from: normalizedCurrentOwner, gas: 300000 });

        if (deleteResult) {
            // If successful, delete the image from the database
            await Image.deleteOne({ hash: imageHash });

            // Respond with a success message
            res.json({ message: 'Image deleted successfully.' });
        } else {
            res.status(400).json({ error: 'Failed to delete image on the blockchain.' });
        }

    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ error: 'Error deleting image.', details: err.message });
    }
});


// Endpoint: Transfer ownership of an image
app.put('/image/transfer/:hash', async (req, res) => {
    const { currentOwner, newOwner } = req.body;

    if (!currentOwner || !newOwner) {
        return res.status(400).json({ error: 'Both current and new owner addresses are required.' });
    }

    try {
        // Normalize addresses to lowercase (case-insensitive comparison)
        const normalizedCurrentOwner = currentOwner.toLowerCase();
        const normalizedNewOwner = newOwner.toLowerCase();

        // Find the image by hash
        const image = await Image.findOne({ hash: req.params.hash });

        if (!image) {
            return res.status(404).json({ error: 'Image not found.' });
        }
        console.log("image found")

        // Check if the current owner matches the image owner (case-insensitive comparison)
        if (image.owner.toLowerCase() !== normalizedCurrentOwner) {
            return res.status(200).json({ error: 'You are not authorized to transfer ownership of this image.' });
        }

        // Call the smart contract to transfer ownership
        const uploader = normalizedCurrentOwner;

        const sampleHash = Buffer.from(req.params.hash, 'hex');
        
        const transferResult = await transferContract.methods
            .transferOwnership(sampleHash, normalizedNewOwner)
            .send({ from: uploader, gas: 300000 });

        if (transferResult) {
            // Update the database with the new owner
            image.owner = normalizedNewOwner;
            await image.save();

            // Respond with a success message
            res.json({ message: 'Ownership transferred successfully.', newOwner: image.owner });
        } else {
            res.status(400).json({ error: 'Failed to transfer ownership on the blockchain.' });
        }

    } catch (err) {
        console.error('Error transferring ownership:', err);
        res.status(500).json({ error: 'Error transferring ownership.', details: err.message });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
