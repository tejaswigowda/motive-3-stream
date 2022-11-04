const readline = require('readline')
const TailFile = require('@logdna/tail-file')

async function startTail() {
  const tail = new TailFile('./somelog.txt')
    .on('tail_error', (err) => {
      console.error('TailFile had an error!', err)
    })

  try {
    await tail.start()
    const linesplitter = readline.createInterface({
      input: tail
    })

    linesplitter.on('line', (line) => {
      console.log(line)
    })
  } catch (err) {
    console.error('Cannot start.  Does the file exist?', err)
  }
}

startTail().catch((err) => {
  process.nextTick(() => {
    throw err
  })
})
