
import { IVehicleAll } from "../Types";
import { entryUrl } from "./Common";
const fetch = require('node-fetch')

export const requsetVehicleState = async (
  accessToken: string,
  id: number,
): Promise<IVehicleAll | undefined> => {
  try {
    const auth = 'Bearer ' + accessToken;

    const vehicle_data_URL =
      entryUrl + '/api/1/vehicles/' + id + '/vehicle_data';

    const httpResponse = await fetch(vehicle_data_URL, {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
    });

    if (!httpResponse.ok) {
      console.log('httpResponse not ok');      
      return;
    }
    const result:any = await httpResponse.json();

    const vehicle_status_all: IVehicleAll = result.response;

    return vehicle_status_all;
  } catch (e) {
    console.log('requsetVehicleState error');
    console.log('e : ', e);
    throw e;
  }
};
