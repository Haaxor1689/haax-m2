import { n } from '@haaxor1689/nil';

export const M2String = n
  .object({
    size: n.uint32(),
    offset: n.uint32()
  })
  .transform(
    async ctx => {
      let current: any = ctx;
      while (current.parent) current = current.parent;

      const buffer = current.buffer as Uint8Array;
      if (!buffer) throw Error('Buffer not found');

      return n.string('null-terminated').fromBuffer(buffer, ctx.value.offset);
    },
    () => {
      throw new Error('Not implemented');
    }
  );

export const M2Array = <T extends n.NilTypeAny>(_schema: T) =>
  n
    .object({
      size: n.uint32(),
      offset: n.uint32()
    })
    .transform(
      async ctx => {
        let current: any = ctx;
        while (current.parent) current = current.parent;

        const buffer = current.buffer as Uint8Array;
        if (!buffer) throw Error('Buffer not found');

        return n
          .array(_schema, ctx.value.size)
          .fromBuffer(buffer, ctx.value.offset);
      },
      () => {
        throw new Error('Not implemented');
      }
    );
