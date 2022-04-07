const tracer = require('dd-trace')

module.exports = (fn) => {
  return () => {
    const requestSpan = tracer.startSpan(fn.name, { childOf: tracer.scope().active() })
    return new Promise((resolve) => {
      tracer.scope().activate(requestSpan, () => {
        const r = fn()
        requestSpan.finish();
        resolve(r)
      })
    })
  }
}