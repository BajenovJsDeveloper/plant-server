const fs = require("fs")
const path = require("path")

class DataBase {
  _isCreated = false
  _fileName = ""
  constructor() {
    this.data = []
  }
  
  create(fileName) {
    this._fileName = fileName
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(__dirname, fileName), "utf8",async (err, data) => {
        if(err) reject('Error read file')
        else resolve(this._parseData(data))
      })
    })
  }

  init() {
    if(this._isCreated) return this
  }
  _parseData(data){
    const parsedArray = data.split(";\n").map(row => {
      const rowData = {}
      const arrString = row.split(", ")
      arrString.forEach(field => {
        const aperands = field.split("=")
        rowData[aperands[0]] = aperands[1]
      });
      return rowData
    })
    parsedArray.pop()
    this.data = parsedArray
    return this.data
  }
  findData(field, value) {
    return this.data.find(user => user[field] ? user[field] === value : false)
  }
  async addData(data) {
    const id = new Date().valueOf().toString()
    let dataString = `id=${id}, `
    for(let key in data) {
      dataString += `${key}=${data[key].toString()}, `
    }
    dataString = dataString.split("")
    dataString.splice(-2, 2, ";\n")
    dataString = dataString.join("")
    await fs.appendFile(path.resolve(__dirname, this._fileName), dataString, (err) => {
      if(err) throw new Error("Can not append to Database!")
      this.data.push({ ...data, id })
    })
    return true
  }
}

module.exports = new DataBase()