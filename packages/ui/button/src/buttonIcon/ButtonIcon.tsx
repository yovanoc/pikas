import type {
  BorderRadius,
  PikasColor,
  PikasCSS,
  Shadows,
} from '@pikas-ui/styles'
import { styled, Sizes, useTheme } from '@pikas-ui/styles'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import React, { forwardRef, useCallback } from 'react'
import type {
  ButtonType,
  ButtonEffect,
  ButtonPadding,
  ButtonTarget,
} from '../types.js'

import type { IconProps, IconCSS } from '@pikas-ui/icons'
import { ClipLoader } from '@pikas-ui/loader'
import { getColors, getContentColor } from '../utils.js'

const ButtonIconDOM = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  space: 2,
  borderStyle: 'solid',
  position: 'relative',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  br: 'md',
  borderWidth: 2,
  boxShadow: '$ELEVATION_BOTTOM_1',

  variants: {
    effect: {
      globalScale: {
        transition: 'transform 250ms ease',

        '&:hover': {
          transform: 'scale(1.025)',
          transition: 'transform 250ms ease',
        },
        '&:active': {
          transform: 'scale(0.95)',
          transition: 'transform 250ms ease',
        },
      },
      boxScale: {
        transition: 'transform 250ms ease',

        '&:after': {
          background: 'inherit',
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          transition: 'transform 250ms ease',
          borderRadius: 'inherit',
        },

        '&:hover:after': {
          transform: 'scale(1.1)',
          transition: 'transform 250ms',
        },

        '&:active': {
          transform: 'scale(0.95)',
          transition: 'transform 250ms ease',
        },
      },
      opacity: {
        transition: 'opacity 500ms',

        '&:hover': {
          opacity: 0.8,
        },

        '&:active': {
          opacity: 1,
          transition: 'opacity 0s',
        },
      },
    },
    padding: {
      xs: {
        padding: 2,
      },
      sm: {
        padding: 4,
      },
      md: {
        padding: 8,
      },
      lg: {
        padding: 16,
      },
      xl: {
        padding: 24,
      },
    },

    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  },
})

const Content = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const LoadingContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

export type ButtonIconCSS = {
  button?: PikasCSS
  icon?: IconCSS
}

export interface ButtonIconDefaultProps {
  Icon: React.FC<IconProps>
  css?: ButtonIconCSS
  loading?: boolean
  outlined?: boolean
  effect?: ButtonEffect
  padding?: ButtonPadding
  size?: Sizes
  color?: PikasColor
  colorHex?: string
  contentColor?: PikasColor
  contentColorHex?: string
  disabled?: boolean
  borderRadius?: BorderRadius
  borderWidth?: number
  boxShadow?: Shadows | 'none'
}

export interface ButtonIconProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonIconDefaultProps {
  onClick?: () => void
  color?: PikasColor
  type?: ButtonType
}

export interface ButtonIconLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonIconDefaultProps {
  onClick?: () => void
  color?: PikasColor
  href?: string
  target?: ButtonTarget
}

const getContent = ({
  loading,
  css,
  contentColor,
  size,
  Icon,
}: {
  loading?: boolean
  css?: ButtonIconCSS
  contentColor?: string
  size?: Sizes
  Icon: React.FC<IconProps>
}): React.ReactNode => {
  return (
    <>
      <LoadingContainer>
        <ClipLoader
          size={Sizes[size || 6]}
          colorHex={contentColor}
          loading={loading}
        />
      </LoadingContainer>

      <Content
        css={{
          opacity: loading ? 0 : 1,
        }}
      >
        <Icon size={Sizes[size || 6]} colorHex={contentColor} css={css?.icon} />
      </Content>
    </>
  )
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    {
      color,
      colorHex,
      css,
      loading,
      disabled,
      effect,
      onClick,
      outlined,
      Icon,
      size,
      borderRadius,
      borderWidth,
      boxShadow,
      contentColor,
      contentColorHex,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()

    const handleClick = useCallback((): void => {
      if (disabled || loading) {
        return
      }

      onClick?.()
    }, [disabled, onClick, loading])

    if (!theme) return null

    const colorHexFinal = colorHex || (color && theme.colors[color].value)
    const contentColorHexFinal =
      contentColorHex || (contentColor && theme.colors[contentColor].value)

    return (
      <ButtonIconDOM
        ref={ref}
        onClick={handleClick}
        disabled={loading || disabled}
        effect={disabled ? undefined : effect}
        css={{
          br: borderRadius,
          borderWidth: borderWidth,
          boxShadow: `$${boxShadow}`,

          ...getColors({
            outlined,
            colorHex: colorHexFinal,
            contentColorHex: contentColorHexFinal,
          }),

          ...css?.button,
        }}
        {...props}
      >
        {getContent({
          contentColor: getContentColor({
            outlined,
            contentColorHex: contentColorHex,
            colorHex: colorHex,
          }),
          loading,
          size,
          css,
          Icon,
        })}
      </ButtonIconDOM>
    )
  }
)

ButtonIcon.defaultProps = {
  type: 'button',
  disabled: false,
  loading: false,
  color: 'PRIMARY',
  size: 6,
  effect: 'opacity',
  padding: 'md',
  borderRadius: 'md',
  borderWidth: 2,
  boxShadow: 'ELEVATION_BOTTOM_1',
}

export const ButtonIconLink = forwardRef<
  HTMLAnchorElement,
  ButtonIconLinkProps
>(
  (
    {
      color,
      colorHex,
      css,
      loading,
      effect,
      onClick,
      outlined,
      Icon,
      size,
      disabled,
      borderRadius,
      borderWidth,
      boxShadow,
      contentColor,
      contentColorHex,
      ...props
    },
    ref
  ) => {
    const theme = useTheme()

    const handleClick = useCallback((): void => {
      if (disabled || loading) {
        return
      }

      onClick?.()
    }, [disabled, onClick, loading])

    if (!theme) return null

    const colorHexFinal = colorHex || (color && theme.colors[color].value)
    const contentColorHexFinal =
      contentColorHex || (contentColor && theme.colors[contentColor].value)

    return (
      <ButtonIconDOM
        as="a"
        ref={ref}
        onClick={handleClick}
        disabled={loading || disabled}
        effect={disabled ? undefined : effect}
        css={{
          br: borderRadius,
          borderWidth: borderWidth,
          boxShadow: `$${boxShadow}`,

          ...getColors({
            outlined,
            colorHex: colorHexFinal,
            contentColorHex: contentColorHexFinal,
          }),

          ...css?.button,
        }}
        {...props}
      >
        {getContent({
          contentColor: getContentColor({
            outlined,
            contentColorHex: contentColorHex,
            colorHex: colorHex,
          }),
          loading,
          size,
          css,
          Icon,
        })}
      </ButtonIconDOM>
    )
  }
)

ButtonIconLink.defaultProps = {
  loading: false,
  color: 'PRIMARY',
  size: 6,
  padding: 'md',
  effect: 'opacity',
  borderRadius: 'md',
  borderWidth: 2,
  boxShadow: 'ELEVATION_BOTTOM_1',
}
