import { n } from '@haaxor1689/nil';
import { M2Array, M2String } from './utils';
import { C3Vector, CAaBox, M2CompQuat } from './common';

export const M2Track = <T extends n.NilTypeAny>(schema: T) =>
  n.object({
    interpolation: n.uint16(),
    globSequenceId: n.int16(),
    timestamps: M2Array(M2Array(n.uint32())),
    values: M2Array(M2Array(schema))
  });

export const M2Sequence = n.object({
  id: n.uint16(),
  variationIndex: n.uint16(),
  duration: n.uint32(),
  moveSpeed: n.float(),
  flags: n.uint32(),
  frequency: n.uint16(),
  _unused: n.uint16(),
  minRepetitions: n.uint32(),
  maxRepetitions: n.uint32(),
  blendTimeIn: n.uint32(),

  bounds: CAaBox,
  boundsRadius: n.float(),

  nextAnimation: n.uint16(),
  aliasNext: n.uint16()
});

export const M2Bone = n.object({
  keyBoneId: n.int32(),
  flags: n.uint32(),
  parentBone: n.int16(),
  subMeshId: n.uint16(),
  _unused: n.uint32(),
  translation: M2Track(C3Vector),
  rotation: M2Track(M2CompQuat),
  scale: M2Track(C3Vector),
  pivot: C3Vector
});

export const M2Vertex = n.object({});

export const M2Color = n.object({});

export const M2Texture = n.object({});

export const M2TextureWeight = n.object({});

export const M2TextureTransform = n.object({});

export const M2Material = n.object({});

export const M2Attachment = n.object({});

export const M2Event = n.object({});

export const M2Light = n.object({});

export const M2Camera = n.object({});

export const M2Ribbon = n.object({});

export const M2Particle = n.object({});

export const M2 = n.object({
  magic: n.string(4),
  version: n.uint32(),
  name: M2String,

  flags: n.uint32(),
  globalSequences: M2Array(n.uint32()),

  sequences: M2Array(M2Sequence),
  _sequence_idx_hash_by_id: M2Array(n.uint16()),

  bones: M2Array(M2Bone),
  _bonesLookupTable: M2Array(n.uint16()),

  vertices: M2Array(M2Vertex),
  skinProfilesCount: n.uint32(),

  colors: M2Array(M2Color),
  textures: M2Array(M2Texture),
  textureWeights: M2Array(M2TextureWeight),
  textureTransforms: M2Array(M2TextureTransform),
  _texturesLookupTable: M2Array(n.uint16()),

  materials: M2Array(M2Material),

  boneCombinations: M2Array(n.uint16()),
  textureCombinations: M2Array(n.uint16()),
  textureCoordCombinations: M2Array(n.uint16()),
  textureWeightCombinations: M2Array(n.uint16()),
  textureTransformCombinations: M2Array(n.uint16()),

  boundingBox: CAaBox,
  boundingRadius: n.float(),
  collisionBox: CAaBox,
  collisionRadius: n.float(),

  collisionIndices: M2Array(n.uint16()),
  collisionVertices: M2Array(C3Vector),
  collisionNormals: M2Array(C3Vector),

  attachments: M2Array(M2Attachment),
  _attachmentsLookupTable: M2Array(n.uint16()),

  events: M2Array(M2Event),
  lights: M2Array(M2Light),

  cameras: M2Array(M2Camera),
  _camerasLookupTable: M2Array(n.uint16()),

  ribbonEmitters: M2Array(M2Ribbon),
  particleEmitters: M2Array(M2Particle)

  // textureCombinerCombos: M2Array(n.uint16())
});
