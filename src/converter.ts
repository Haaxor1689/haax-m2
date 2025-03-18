import { Wotlk } from './m2';

export const m2ToJson = async (filePath: string) => {
  try {
    const buffer = await Bun.file(filePath).arrayBuffer();
    const m2 = await Wotlk.M2.fromBuffer(new Uint8Array(buffer));
    return JSON.stringify(m2, null, 2);
  } catch (error) {
    if (error instanceof Error) {
      'ctx' in error && console.error(error.ctx);
    }
    throw error;
  }
};
