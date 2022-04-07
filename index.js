const express = require('express')
const tracer = require('dd-trace')
const app = express()
const port = 3000
const wrapDatadog = require('./wrapDatadog');

tracer.init({
  enabled: true,
  profiling: true,
  service: 'apm-demo',
});

const some_function_2 = (function some_function_2() {
  
})
|> wrapDatadog

const some_function_1 = (function some_function_1() {
  for (var i = 0; i < 100; i++) {
    some_function_2()
  }
}) 
|> wrapDatadog

function some_function_3() {
  for (var i = 0; i < 100; i++) {
    some_function_2()
  }
}

app.get('/', (req, res) => {
  some_function_1()
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  some_function_3()
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})