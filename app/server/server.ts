import { app } from './app'

const port = 7000

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})
