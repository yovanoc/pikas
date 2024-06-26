export const pikasMedias = {
  xs: `(min-width: 480px)`,
  sm: `(min-width: 640px)`,
  md: `(min-width: 768px)`,
  lg: `(min-width: 1024px)`,
  xl: `(min-width: 1280px)`,
  '2xl': `(min-width: 1536px)`,
};

export type PikasMedias = typeof pikasMedias;
export type PikasMedia = keyof PikasMedias;

export type MediasRecordValue = string;
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type MediasRecordKey = PikasMedia | number | string;
export type MediasRecord = Record<MediasRecordKey, MediasRecordValue>;

export const loadMedias = <T extends MediasRecord>(
  values:
    | T
    | {
        [key in keyof PikasMedias]?: MediasRecordValue;
      }
): PikasMedias & T =>
  ({
    ...pikasMedias,
    ...values,
  }) as PikasMedias & T;
