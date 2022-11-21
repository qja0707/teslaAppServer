const express = require('express')
const app = express()
const port = 3000

app.get('/', (req: any, res: any) => {
  res.send('haha yeye oh yes!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})