import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import reverseGeocoding from './reverseGeocoding.js'
import {transporter, buildEmail, buildEmailTemplate} from './mailer.js'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()

const port = process.env.PORT



const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '50mb' }))

app.use(express.static(__dirname + '/public'))



app.post('/send-screenshot', async (req, res) => {

  const { currentPositionUser, screenshot } = req.body

  const cunrrentDate = new Date().toLocaleString()

  transporter.sendMail(
    buildEmail(process.env.MAIL_TO,'Reporte de trabajo', 
    buildEmailTemplate({
    screenshot,
    position : currentPositionUser,
    date : cunrrentDate
  })), 
  function (err, info) {
    if(err)
      console.log(err)
    else
      res.json({'status' : 'ok'})
 });

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})