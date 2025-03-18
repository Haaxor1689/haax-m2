import { n } from '@haaxor1689/nil';

export const C3Vector = n.object({
  x: n.float(),
  y: n.float(),
  z: n.float()
});

export const CAaBox = n.object({
  min: C3Vector,
  max: C3Vector
});

export const C4Quaternion = n.object({
  x: n.float(),
  y: n.float(),
  z: n.float(),
  w: n.float()
});

export const M2CompQuat = n
  .object({
    x: n.int16(),
    y: n.int16(),
    z: n.int16(),
    w: n.int16()
  })
  .transform(
    ctx => {
      const { x, y, z, w } = ctx.value;
      const convert = (v: number) => v / 32767;
      return {
        x: convert(x),
        y: convert(y),
        z: convert(z),
        w: convert(w)
      };
    },
    () => {
      throw new Error('Not implemented');
    }
  );
