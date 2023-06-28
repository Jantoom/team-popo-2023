import * as FileSystem from 'expo-file-system';

export default class FileService {
    static getCacheFiles = async () => {
        var images = []
        // Get the cache directory URI
        const cacheDir = FileSystem.cacheDirectory + "Camera/";
    
        // Read the directory contents
        const files = await FileSystem.readDirectoryAsync(cacheDir);
        let id = 0;
        // Loop through each file
        for (let file of files) {
          // Get the file URI
          const fileUri = cacheDir + file;  
          images.push({id: id, fileURI: fileUri})
          id++;
        }

        return images
    }

    static deleteFile = async (fileURI) => {
      await FileSystem.deleteAsync(fileURI)
    }

    static readFile = async (fileURI) => {
      return await FileSystem.readAsStringAsync(fileURI)
    }
}