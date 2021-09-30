class Validator {
  constructor() {}

  validate(data, fields) {
    try {
      fields.forEach(field => {
        if (!data[field]) throw Error
      })
    } catch {
      return false
    }
    return true
  }
}

const validator = new Validator()
module.exports = validator