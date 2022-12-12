'use strict'

const express = require('express')
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import showVehicleData from './src/Route/showVehicleData';
import takeAccessToken from './src/Route/takeAccessToken';
import { getVehicleSateDatas } from './src/Utils';

const app = express()
const port = 3000

const jsonParser = bodyParser.json()

// const accessToken = require('./src/Route/takeAccessToken')

app.get('/', (req: Request, res: Response) => {
  res.send('haha yeye oh yes!')
})

app.get('/vehicle_data/:id', showVehicleData.read)

app.put('/access_token', jsonParser, takeAccessToken.update)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  getVehicleSateDatas()

  setInterval(() => {
    getVehicleSateDatas()
  }, 1000 * 60 * 60)
})