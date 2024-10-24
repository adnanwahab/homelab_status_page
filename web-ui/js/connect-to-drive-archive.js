


process
//use drive UI to upload 
async function uploadAllFoldersInBucket(bucketName) {
    const { Storage } = require('@google-cloud/storage');
    const storage = new Storage();

    try {
        const [files] = await storage.bucket(bucketName).getFiles();
        const folderNames = new Set();

        files.forEach(file => {
            const folderName = file.name.split('/')[0];
            if (folderName) {
                folderNames.add(folderName);
            }
        });

        folderNames.forEach(folderName => {
            console.log(`Uploading folder: ${folderName}`);
            // Here you would implement the logic to upload the folder to Google Drive
            // This could involve using the Google Drive API to create a folder and upload files
        });

        console.log('All folders have been processed.');
    } catch (error) {
        console.error('Error uploading folders:', error);
    }
}

// Example usage
uploadAllFoldersInBucket('your-bucket-name');
