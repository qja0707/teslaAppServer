'use strict'

const express = require('express')
import { Request, Response } from 'express';
import takeAccessToken from './src/Route/takeAccessToken'
import bodyParser from 'body-parser';
import { readAuthInfo } from './src/RealmDB/Schema';

const app = express()
const port = 3000

const jsonParser = bodyParser.json()

// const accessToken = require('./src/Route/takeAccessToken')

app.get('/', (req: Request, res: Response) => {
  res.send('haha yeye oh yes!')
})

app.put('/access_token',jsonParser, takeAccessToken.update)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  readAuthInfo().then(r=>{
    if(!r){
      return;
    }
    const json = r.toJSON();

    console.log("saved token",json)
  })
})