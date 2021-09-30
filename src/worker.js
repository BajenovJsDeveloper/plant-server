const { workerData, parentPort } = require("worker_threads")

console.log(workerData)

setTimeout(() => {
  parentPort.postMessage("Hello from Worker!")
}, 3000)