const express = require('express')
const tracer = require('dd-trace')
const app = express()
const port = 3000

tracer.init({
  enabled: true,
  profiling: true,
  service: 'apm-demo',
});

const some_function = () => {
  const parentSpan = tracer.scope().active()
  for (var i = 0; i < 100; i++) {
    const span = tracer.startSpan(i, { childOf: parentSpan })
    span.finish()
  }
}

app.get('/', (req, res) => {
  some_function()
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})