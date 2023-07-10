import * as FileSystem from 'expo-file-system';

export default class FileService {
    static getCacheFiles = async () => {
        await this.ensureDirectories(FileSystem.cacheDirectory + "Camera/")
        var images = []
        // Get the cache directory URI
        const cacheDir = FileSystem.cacheDirectory + "Camera/";
    
        // Read the directory contents
        const files = await this.readDir(cacheDir)
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

    static readDir = async (dir) => {
      return await FileSystem.readDirectoryAsync(dir);
    }

    static deleteFile = async (fileURI) => {
      await FileSystem.deleteAsync(fileURI)
    }

    static readFile = async (fileURI) => {
      return await FileSystem.readAsStringAsync(fileURI)
    }

    static checkPathExists = async (dir) => {
      dirInfo = await FileSystem.getInfoAsync(dir);
      return dirInfo.exists
    }

    static checkCacheFileExists = async (fileName) => {
      this.ensureDirectories(FileSystem.cacheDirectory + "CachedImages/")
      dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + "CachedImages/" + fileName);
      console.log(dirInfo)
      return dirInfo["exists"]
    }

    static ensureDirectories = async (dir) => {
      dirInfo = await FileSystem.getInfoAsync(dir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dir).catch((err) => {})
      }
    }

    static saveFile = async (downloadURI, savePathDir, fileName) => {
      this.ensureDirectories(savePathDir)
      res = await FileSystem.downloadAsync(downloadURI, savePathDir + fileName)
      console.log(res)
      if (res["status"] === 400) {
        FileSystem.deleteAsync(res["uri"])
        return ""
      } else {
        return res["uri"]
      }
    }

    static saveReportHistoryImage = async (imageLink, imageID) => {
      console.log("DOWNLOADING IMAGE")
      uri = await this.saveFile(imageLink, FileSystem.cacheDirectory+ "CachedImages/", imageID + ".png")
      return uri
    }

    static getCacheDir = () => {
      return FileSystem.cacheDirectory + "CachedImages/"
    }
}