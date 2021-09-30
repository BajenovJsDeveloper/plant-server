const Emitter = require("events")
const fs = require("fs")
const { startWatch } = require("./file")
const { Worker } = require("worker_threads")

const worker = new Worker("./src/worker.js", { workerData: "Hello worker!" })
let count = 0

const timerId = setInterval(() => {
  count ++
  console.log(count)
}, 1000)

worker.on("message", (data) => {
  console.log("Response from worker: ", data)
  clearInterval(timerId)
  startWatch("./log.txt")
})

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(
    `Thank you for your valuable feedback: ${answer}`
  );

  rl.close();
});