import { createStitches } from '@stitches/react'

import { BR } from './borderRadius.js'
import { BorderStyles } from './borderStyles.js'
import { BorderWidths } from './borderWidths.js'
import { Colors } from './colors.js'
import { FontSizes } from './fontSizes.js'
import { FontWeights } from './fontWeights.js'
import { gap } from './gap.js'
import { LetterSpacings } from './letterSpacings.js'
import { LineHeights } from './lineHeights.js'
import { Radii } from './radii.js'
import { Shadows } from './shadows.js'
import { Sizes } from './sizes.js'
import { Space } from './space.js'
import { Transitions } from './transitions.js'
import { ZIndices } from './zIndices.js'
import type * as Stitches from '@stitches/react'

export const stitchesConfig = createStitches({
  prefix: '',
  theme: {
    colors: Colors,
    fonts: {
      roboto: 'Roboto',
    },
    shadows: Shadows,
    fontSizes: FontSizes,
    space: Space,
    sizes: Sizes,
    fontWeights: FontWeights,
    lineHeights: LineHeights,
    letterSpacings: LetterSpacings,
    borderWidths: BorderWidths,
    borderStyles: BorderStyles,
    radii: Radii,
    zIndices: ZIndices,
    transitions: Transitions,
  },
  media: {
    xs: '(min-width: 480px)',
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  },
  utils: {
    ...gap,
    ...BR,
    linearGradient: (value: number | string) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    gridCols: (value: number | string) => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${value}, minmax(0, 1fr))`,
      width: '100%',
      height: 'auto',
    }),
    col: (value: number | string) => {
      if (!value) {
        return {}
      }

      const split = value.toString().split(' ')

      return {
        gridColumn: `${split[1] || 'auto'} / span ${split[0]}`,
      }
    },
  },
})

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  config,
  createTheme,
  prefix,
  reset,
  theme,
} = stitchesConfig

export type CSS = Stitches.CSS<typeof config>