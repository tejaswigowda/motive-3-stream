const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});

const readline = require('readline')
const TailFile = require('@logdna/tail-file')

async function startTail() {
  const tail = new TailFile('../Client-outputs.pts')
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
        ws.send(line);
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
