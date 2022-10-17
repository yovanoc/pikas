import { PropagateLoader as PropagateLoaderDefault } from 'react-spinners'
import type {
  ColorsRecord,
  Color as ColorByPikas,
  PikasColor,
} from '@pikas-ui/styles'
import { useTheme } from '@pikas-ui/styles'

export interface PropagateLoaderProps<
  Color extends ColorByPikas<ColorsRecord>
> {
  size?: number
  colorName?: Color
  colorHex?: string
  loading?: boolean
  speedMultiplier?: number
}

export const PropagateLoader = <
  Color extends ColorByPikas<ColorsRecord> = PikasColor
>({
  size,
  colorName = 'PRIMARY' as Color,
  colorHex,
  loading = true,
  speedMultiplier,
}: PropagateLoaderProps<Color>): JSX.Element => {
  const theme = useTheme()

  return (
    <PropagateLoaderDefault
      size={size}
      speedMultiplier={speedMultiplier}
      color={
        colorHex ||
        (colorName ? theme?.colors[colorName as PikasColor].value : undefined)
      }
      loading={loading}
    />
  )
}
