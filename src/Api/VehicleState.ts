import fetch from "node-fetch";
import { IVehicleAll } from "../Types";
import { entryUrl } from "./Common";

export const requsetVehicleState = async (
  accessToken: string,
  id: number,
): Promise<IVehicleAll | undefined> => {
  console.log('***********requsetVehicleState************');
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
      console.log('httpResponse : ', httpResponse);
      return;
    }
    const result:any = await httpResponse.json();

    console.log('result : ', result);

    const vehicle_status_all: IVehicleAll = result.response;

    console.log('vehicle_status_all : ', vehicle_status_all);

    return vehicle_status_all;
  } catch (e) {
    console.log('requsetVehicleState error');
    console.log('e : ', e);
    throw e;
  }
};
