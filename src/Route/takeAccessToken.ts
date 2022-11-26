'use strict'

import { Request, Response } from 'express';
import { IAuthData, writeAuthInfo } from '../RealmDB/Schema';

//put /access_token'
const update = (req: Request, res: Response) => {

  console.log("req:", req.body)

  const requestBody: IAuthData = req.body

  writeAuthInfo(requestBody).then(() => {

    res.send()

  }).catch(e => {
    console.log("e:", e)
    res.statusCode = 503
    res.statusMessage = 'server error during save the data'
    res.send()
  })

  //take access token with car id

  //prove access token is right

  //update car id with access token


};

export default { update } 