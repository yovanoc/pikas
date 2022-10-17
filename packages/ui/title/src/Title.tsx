import type { PikasCSS } from '@pikas-ui/styles'
import { styled } from '@pikas-ui/styles'
import type { HTMLAttributes } from 'react'

const TitleStyle = styled('h1', {
  whiteSpace: 'pre-line',
  color: '$BLACK',

  '&:first-letter': {
    textTransform: 'uppercase',
  },

  variants: {
    variant: {
      h1: {
        fontSize: '$EM-XXX-LARGE',
        fontWeight: '$MEDIUM',
        letterSpacing: '$MEDIUM',
      },
      h2: {
        fontSize: '$EM-XX-LARGE',
        fontWeight: '$BOLD',
        letterSpacing: '$MEDIUM',
      },
      h3: {
        fontSize: '$EM-X-LARGE',
        fontWeight: '$BOLD',
        letterSpacing: '$SMALL',
      },
      h4: {
        fontSize: '$EM-LARGE',
        fontWeight: '$BOLD',
        letterSpacing: '$SMALL',
      },
      h5: {
        fontSize: '$EM-MEDIUM',
        fontWeight: '$BOLD',
        letterSpacing: '$SMALL',
      },
      h6: {
        fontSize: '$EM-MEDIUM',
        fontWeight: '$MEDIUM',
        letterSpacing: '$SMALL',
      },
    },
  },
})

export const TitleComponent = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
}
export type TitleAs = keyof typeof TitleComponent

export const TextTransformComponent = {
  uppercase: true,
  lowercase: true,
  capitalize: true,
  none: true,
}
export type TitleTextTransform = keyof typeof TextTransformComponent

export const TitleVariant = TitleComponent
export type TitleVariant = keyof typeof TitleVariant

export interface TitleCSS<CSS extends PikasCSS> {
  global?: CSS
  h1?: CSS
  h2?: CSS
  h3?: CSS
  h4?: CSS
  h5?: CSS
  h6?: CSS
}

export interface TitleProps<CSS extends PikasCSS>
  extends HTMLAttributes<HTMLHeadingElement> {
  as: TitleAs
  variant?: TitleVariant
  textTransform?: TitleTextTransform
  css?: TitleCSS<CSS>
  children?: React.ReactNode
}

export const Title = <CSS extends PikasCSS = PikasCSS>({
  children,
  as,
  variant,
  textTransform,
  css,
}: TitleProps<CSS>): JSX.Element => {
  return (
    <TitleStyle
      as={as}
      variant={variant || as}
      css={{
        textTransform,
        ...css?.global,
        ...css?.[as],
      }}
    >
      {children}
    </TitleStyle>
  )
}
