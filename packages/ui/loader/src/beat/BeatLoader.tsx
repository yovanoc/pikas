import type {
  ColorsRecord,
  Color as ColorByPikas,
  PikasColor,
} from '@pikas-ui/styles'
import { useTheme } from '@pikas-ui/styles'
import { BeatLoader as BeatLoaderDefault } from 'react-spinners'

export interface BeatLoaderProps<Color extends ColorByPikas<ColorsRecord>> {
  size?: number | string
  margin?: number
  colorName?: Color
  colorHex?: string
  loading?: boolean
  speedMultiplier?: number
}

export const BeatLoader = <
  Color extends ColorByPikas<ColorsRecord> = PikasColor
>({
  size,
  margin,
  colorName = 'PRIMARY' as Color,
  colorHex,
  loading = true,
  speedMultiplier,
}: BeatLoaderProps<Color>): JSX.Element => {
  const theme = useTheme()

  return (
    <BeatLoaderDefault
      size={size}
      margin={margin}
      color={
        colorHex ||
        (colorName ? theme?.colors[colorName as PikasColor].value : undefined)
      }
      loading={loading}
      speedMultiplier={speedMultiplier}
    />
  )
}
