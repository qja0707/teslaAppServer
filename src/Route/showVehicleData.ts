'use strict'

import { Request, Response } from 'express';
import { IAuthData, readVehicleData, writeAuthInfo } from '../RealmDB/Schema';

//get /vehicle_data/:id'
const read = (req: Request, res: Response) => {

  console.log("req:", req.params)
  console.log("query:", req.query)

  if (!(req.params.id && req.query.from && req.query.to)) {
    console.log('why here?')
    res.status(400)
    res.send()

    return;
  }

  const vehicleId = Number(req.params.id)
  const from = req.query.from.toString()
  const to = req.query.to.toString()

  readVehicleData(vehicleId, from, to).then(r => {

    res.status(200).json(r)
    res.send()

  }).catch(e => {
    console.log('readVehicleData error:', e)
    res.status(400)
    res.send()
  })
};

export default { read } 