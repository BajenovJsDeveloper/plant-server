const fs = require("fs")

const getFileData = (fileName) => new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, readedData) => {
      if(!err) resolve(readedData)
      reject()
    })
  })

const startWatch = async(fileName) => {
  try {
    let buffer = await getFileData(fileName)

    fs.watchFile(fileName, { interval: 1000 }, async (cur, prev) => {
      console.log("Was: ", prev.mtime, buffer)
      const data = await getFileData(fileName)
      console.log("To be: ", cur.mtime, data)
      buffer = data
    })
  } catch(e) {
    console.log("File read error...")
  }
}

module.exports = { startWatch }