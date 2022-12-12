import dayjs from "dayjs";
import { requsetVehicleState } from "./Api/VehicleState";
import Wake from "./Api/Wake";
import { IAuthData, IStoredState, readAuthInfo, writeVehicleData } from "./RealmDB/Schema";

export const getVehicleSateDatas = async (): Promise<void> => {
  try {
    const authInfoFromDb = await readAuthInfo()

    const authInfo = authInfoFromDb?.toJSON() as any as IAuthData[]
    console.log("authInfo:", authInfo)
    if (!authInfo) {
      return;
    }   

    authInfo.forEach((async info => {
      await Wake(info.access_token, info.id)
      console.log("after wake")
      
      requsetVehicleState(info.access_token, info.id).then(data => {
        if (!data) {
          return
        }

        const storedState: IStoredState = {
          _id: 0,
          id: data.id,
          date: dayjs(data.drive_state.timestamp).toISOString(),
          battery_level: data.charge_state.battery_level,
          battery_range: data.charge_state.battery_range,
          odometer: data.vehicle_state.odometer,
          heading: data.drive_state.heading,
          latitude: data.drive_state.latitude,
          longitude: data.drive_state.longitude,
        }

        writeVehicleData(storedState)
      }).catch(e => {
        console.log(`error in auth id: ${info.id}, message: ${e}`)
      })
    }))
  } catch (e) {
    console.log("requestVehicleState error")
  }

  return
}