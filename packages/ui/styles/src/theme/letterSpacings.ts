export const pikasLetterSpacings = {
  'XX-SMALL': '0.2px',
  'X-SMALL': '0.3px',
  SMALL: '0.5px',
  MEDIUM: '1px',
  LARGE: '1.5px',
  'X-LARGE': '2px',
  'XX-LARGE': '3px',
}

export type PikasLetterSpacings = typeof pikasLetterSpacings
export type PikasLetterSpacing = keyof PikasLetterSpacings

export type LetterSpacingsRecordValue = string | number
export type LetterSpacingsRecordKey = string | number | PikasLetterSpacing
export type LetterSpacingsRecord = Record<
  LetterSpacingsRecordKey,
  LetterSpacingsRecordValue
>

export const loadLetterSpacings = <T extends LetterSpacingsRecord>(
  values:
    | {
        [key in keyof PikasLetterSpacings]?: LetterSpacingsRecordValue
      }
    | T
): PikasLetterSpacings & T =>
  ({
    ...pikasLetterSpacings,
    ...values,
  } as PikasLetterSpacings & T)
