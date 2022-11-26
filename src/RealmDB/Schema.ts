'use strict'

import Realm, { Results } from 'realm';

export interface IAuthData {
  access_token: string;
  id: number;
}

export interface IStoredState {
  id: number;
  date: string;
  battery_level: number,
  battery_range: number,
  odometer: number,
  heading: number;
  latitude: number;
  longitude: number;
}

const AUTH_INFO = 'AuthInfo';
const VEHICLE_STATE = 'VehicleState'

const authSchema = {
  name: AUTH_INFO,
  properties: {
    id: 'int',
    access_token: 'string',
  },
  primaryKey: 'id',
};

const vehicleStateSchema = {
  name: VEHICLE_STATE,
  properties: {
    _id: 'int',
    id: 'int',
    date: "string",
    battery_level: 'int',
    battery_range: 'int',
    odometer: 'int',
    heading: 'int',
    latitude: 'int',
    longitude: 'int',
  },
  primaryKey: '_id',
};



let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (!realmInstance) {
    realmInstance = await Realm.open({
      schema: [authSchema, vehicleStateSchema],
    });
  }

  return realmInstance;
};

export const writeAuthInfo = async (userInfo: IAuthData): Promise<void> => {
  try {
    const realm = await getRealm();

    realm.write(() => {
      realm.create(AUTH_INFO, { id: userInfo.id, access_token: userInfo.access_token }, Realm.UpdateMode.Modified);
    });
  } catch (e) {
    throw e
  }
};

export const readAuthInfo = async () => {
  try {
    const realm = await getRealm();

    const userData: Realm.Results<IAuthData> = realm
      .objects<IAuthData>(AUTH_INFO)


    return userData ? userData : undefined;
  } catch (e) {
    throw e
  }
};

export const writeVehicleData = async (vehicleData: IStoredState): Promise<void> => {
  try {
    const realm = await getRealm();

    realm.write(() => {
      realm.create(VEHICLE_STATE, vehicleData)
    })
  } catch (e) {
    throw e
  }
}

export const readVehicleData = async (id: number, from: string, to?: string) => {
  try {
    const realm = await getRealm()

    const vehicleData: Results<IStoredState> = realm
      .objects<IStoredState>(VEHICLE_STATE)
      .filtered('id == $0 && date >= $1 && date < $2', id, from, to)

    return vehicleData
  } catch (e) {
    throw e
  }
}


