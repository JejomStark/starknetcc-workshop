const path = require("path");
const basePath = process.cwd()
const fs = require("fs");
const directory = path.join(basePath, "/generateur/art-engine/build/json")
console.log(directory);

fs.readdir(directory, (error, files) => {
  if (error) {
    throw error
  }

  for (let file of files) {
    const newName = file.split('.')
    
    fs.rename(
        directory + '/' + file, 
        directory + '/' + newName[0], 
        function (error) {
            if (error) {
                console.log('ERROR: ' + error)
            }

            console.log(newName[0] + ' : File name successfully changed.')
        }
    )
  }
})