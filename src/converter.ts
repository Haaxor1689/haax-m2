import { Wotlk } from './m2';

export const m2ToJson = async (filePath: string) => {
  const buffer = await Bun.file(filePath).arrayBuffer();
  const m2 = await Wotlk.M2.fromBuffer(new Uint8Array(buffer));

  const rot = m2.bones[0].rotation;

  return JSON.stringify(m2, null, 2);
};
