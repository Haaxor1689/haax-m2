import { n } from '@haaxor1689/nil';
import { M2Array, M2String } from './utils';
import {
  C2Vector,
  C3Vector,
  C4Quaternion,
  CAaBox,
  CRange,
  FixedPoint,
  M2CompQuat
} from './common';

export const M2TrackBase = n.object({
  interpolation: n.uint16(),
  globSequenceId: n.int16(),
  timestamps: M2Array(M2Array(n.uint32()))
});

export const M2Track = <T extends n.NilTypeAny>(schema: T) =>
  n.object({
    interpolation: n.uint16(),
    globSequenceId: n.int16(),
    timestamps: M2Array(M2Array(n.uint32())),
    values: M2Array(M2Array(schema))
  });

export const M2FakeTrack = <T extends n.NilTypeAny>(schema: T) =>
  n.object({
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

export const M2Vertex = n.object({
  position: C3Vector,
  boneWeights: n.array(n.uint8(), 4),
  boneIndices: n.array(n.uint8(), 4),
  normal: C3Vector,
  textureCoords: n.array(C3Vector, 2)
});

export const M2Color = n.object({
  color: M2Track(C3Vector),
  alpha: M2Track(FixedPoint(0, 15))
});

export const M2Texture = n.object({
  type: n.enum(n.uint32(), [
    'NONE',
    'TEX_COMPONENT_SKIN',
    'TEX_COMPONENT_OBJECT_SKIN',
    'TEX_COMPONENT_WEAPON_BLADE',
    'TEX_COMPONENT_WEAPON_HANDLE',
    'TEX_COMPONENT_ENVIRONMENT',
    'TEX_COMPONENT_CHAR_HAIR',
    'TEX_COMPONENT_CHAR_FACIAL_HAIR',
    'TEX_COMPONENT_SKIN_EXTRA',
    'TEX_COMPONENT_UI_SKIN',
    'TEX_COMPONENT_TAUREN_MANE',
    'TEX_COMPONENT_MONSTER_1',
    'TEX_COMPONENT_MONSTER_2',
    'TEX_COMPONENT_MONSTER_3',
    'TEX_COMPONENT_ITEM_ICON'
  ]),
  flags: n.uint32(), // TODO: n.flags(n.uint32(), ['NONE', 'WRAP_X', 'WRAP_Y']),
  filename: M2String
});

export const M2TextureWeight = n.object({
  weight: M2Track(FixedPoint(0, 15))
});

export const M2TextureTransform = n.object({
  translation: M2Track(C3Vector),
  rotation: M2Track(C4Quaternion),
  scaling: M2Track(C3Vector)
});

export const M2Material = n.object({
  flags: n.uint16(),
  // TODO: n.flags(n.uint16(), [
  //   'NONE',
  //   'NO_LIGHT',
  //   'NO_FOG',
  //   'NO_BACKFACE_CULLING',
  //   'DEPTH_TEST',
  //   'DEPTH_WRITE',
  //   'UNK_SHADOW_BATCH_1',
  //   'UNK_SHADOW_BATCH_2',
  //   'UNK_FOG_BLEND'
  // ]),
  blendMode: n.enum(n.uint16(), [
    'OPAQUE',
    'ALPHA_KEY',
    'ALPHA',
    'NO_ALPHA_ADD',
    'ADD',
    'MOD',
    'MOD2X',
    'BLEND_ADD'
  ])
});

export const M2Attachment = n.object({
  id: n.uint32(),
  bone: n.uint16(),
  _: n.uint16(),
  position: C3Vector,
  animateAttached: M2Track(n.bool())
});

export const M2Event = n.object({
  identifier: n.uint32(),
  data: n.uint32(),
  bone: n.uint32(),
  position: C3Vector,
  enabled: M2TrackBase
});

export const M2Light = n.object({
  type: n.enum(n.uint16(), ['DIRECTIONAL', 'POINT']),
  bone: n.uint16(),
  ambientColor: M2Track(C3Vector),
  ambientIntensity: M2Track(n.float()),
  diffuseColor: M2Track(C3Vector),
  diffuseIntensity: M2Track(n.float()),
  attenuationStart: M2Track(n.float()),
  attenuationEnd: M2Track(n.float()),
  visibility: M2Track(n.bool())
});

export const M2SplineKey = <T extends n.NilTypeAny>(schema: T) =>
  n.object({
    value: schema,
    inTangent: schema,
    outTangent: schema
  });

export const M2Camera = n.object({
  // type: n.enum(n.uint16(), ['PORTRAIT', 'CHARACTER_INFO']),
  // fov: n.float(),
  // farClip: n.float(),
  // nearClip: n.float(),
  // positions: M2Track(M2SplineKey(C3Vector)),
  // positionsBase: C3Vector,
  // targetPositions: M2Track(M2SplineKey(C3Vector)),
  // targetPositionsBase: C3Vector,
  // roll: M2Track(M2SplineKey(n.float()))
});

export const M2Ribbon = n.object({
  // ribbonId: n.uint32(),
  // boneIndex: n.uint32(),
  // position: C3Vector,
  // textureIndices: M2Array(n.uint16()),
  // materialIndices: M2Array(n.uint16()),
  // colorTrack: M2Track(C3Vector),
  // alphaTrack: M2Track(FixedPoint(0, 15)),
  // heightAboveTrack: M2Track(n.float()),
  // heightBelowTrack: M2Track(n.float()),
  // edgesPerSecond: n.float(),
  // edgeLifetime: n.float(),
  // gravity: n.float(),
  // textureRows: n.uint16(),
  // textureCols: n.uint16(),
  // textSlotTrack: M2Track(n.uint16()),
  // visibilityTrack: M2Track(n.bool()),
  // priorityPlane: n.int16(),
  // ribbonColorIndex: n.int8(),
  // textureTransformLookupIndex: n.int8()
});

export const M2Particle = n.object({
  // _: n.uint32(),
  // flags: n.uint32(),
  // position: C3Vector,
  // bone: n.uint16(),
  // blendingType: n.uint8(),
  // emitterType: n.uint8(),
  // particleType: n.uint8(),
  // headOrTail: n.uint8(),
  // textureTileRotation: n.uint16(),
  // textureDimensions: n.object({
  //   width: n.uint16(),
  //   height: n.uint16()
  // }),
  // emissionSpeed: M2Track(n.float()),
  // speedVariation: M2Track(n.float()),
  // verticalRange: M2Track(n.float()),
  // horizontalRange: M2Track(n.float()),
  // gravity: M2Track(n.float()),
  // lifespan: M2Track(n.float()),
  // lifespanVary: n.float(),
  // emissionRate: M2Track(n.float()),
  // emissionRateVary: n.float(),
  // emissionAreaLength: M2Track(n.float()),
  // emissionAreaWidth: M2Track(n.float()),
  // colorTrack: M2FakeTrack(C3Vector),
  // alphaTrack: M2FakeTrack(FixedPoint(0, 15)),
  // scaleTrack: M2FakeTrack(C2Vector),
  // scaleVary: C2Vector,
  // headCellTrack: M2FakeTrack(n.uint8()),
  // tailCellTrack: M2FakeTrack(n.uint8()),
  // tailLength: n.float(),
  // spread: C2Vector,
  // twinkleScale: CRange,
  // _unk1: n.float(),
  // drag: n.float(),
  // baseSpin: n.float(),
  // baseSpinVary: n.float(),
  // spin: n.float(),
  // spinVary: n.float(),
  // _unk2: n.float(),
  // tumbleMin: C3Vector,
  // tumbleMax: C3Vector,
  // windVector: C3Vector,
  // follow: n.array(n.object({ speed: n.float(), scale: n.float() }), 2),
  // splinePoints: M2Array(C3Vector),
  // enabledIn: M2Track(n.bool())
});

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
