import { entryUrl } from './Common';

const fetch = require('node-fetch')

const Wake = async (accessToken: string, id: number): Promise<boolean> => {
  const wakeUrl = `${entryUrl}/api/1/vehicles/${id}/wake_up`;

  try {
    const httpResponse = await fetch(wakeUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await sleep(5000)

    return httpResponse.ok

  } catch (e) {
    throw e;
  }
};


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Wake