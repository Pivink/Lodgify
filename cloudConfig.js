const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

let forListingStorage;

try {
    forListingStorage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'Room_Connect/Listings',
            allowed_formats: ['png', 'jpg', 'jpeg'], // Fixed "allowFormat" -> "allowed_formats"
        }
    });
} catch (err) {
    console.error("Cloudinary storage error:", err);
}

module.exports = {
    cloudinary,
    forListingStorage
};
