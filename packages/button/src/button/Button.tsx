import type {
  ColorsType,
  CSS,
  FontsWeightsType,
  BorderRadiusType,
  FontsSizesType,
  ShadowsType,
} from '@pikas-ui/styles'
import { styled, theme } from '@pikas-ui/styles'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import React, { forwardRef, useCallback } from 'react'

import type { IconProps, IconStyleType } from '@pikas-ui/icons'
import { BeatLoader } from '@pikas-ui/loader'
import type {
  ButtonTypeType,
  ButtonEffectType,
  ButtonGapType,
  ButtonPaddingType,
  ButtonTextTransformType,
  ButtonTargetType,
} from '../types.js'
import { getColors, getContentColor } from '../utils.js'

const ButtonDOM = styled('button', {
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
        padding: '4px 16px',
      },
      sm: {
        padding: '4px 24px',
      },
      md: {
        padding: '8px 32px',
      },
      lg: {
        padding: '16px 40px',
      },
      xl: {
        padding: '16px 48px',
      },
    },

    state: {
      true: {
        cursor: 'initial',
        opacity: 0.5,
      },
    },
  },
})

const Content = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    textTransform: {
      capitalize: {
        textTransform: 'capitalize',
      },
      uppercase: {
        textTransform: 'uppercase',
      },
      default: {
        'span::first-letter': {
          textTransform: 'uppercase',
        },
      },
      none: {},
    },

    gap: {
      sm: {
        customGap: 4,
      },
      md: {
        customGap: 8,
      },
      lg: {
        customGap: 16,
      },
    },
  },
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

export type ButtonStylesType = {
  button?: CSS
  icon?: IconStyleType
}

export interface ButtonDefaultProps {
  children?: React.ReactNode
  styles?: ButtonStylesType
  loading?: boolean
  padding?: ButtonPaddingType
  fontSize?: FontsSizesType
  gap?: ButtonGapType
  color?: ColorsType
  colorHex?: string
  contentColor?: ColorsType
  contentColorHex?: string
  textTransform?: ButtonTextTransformType
  fontWeight?: FontsWeightsType
  outlined?: boolean
  effect?: ButtonEffectType
  LeftIcon?: React.FC<IconProps>
  RightIcon?: React.FC<IconProps>
  disabled?: boolean
  width?: string | number
  maxWidth?: string | number
  minWidth?: string | number
  borderRadius?: BorderRadiusType
  borderWidth?: number
  boxShadow?: ShadowsType | 'none'
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonDefaultProps {
  onClick?: () => void
  color?: ColorsType
  type?: ButtonTypeType
}

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonDefaultProps {
  onClick?: () => void
  color?: ColorsType
  href?: string
  target?: ButtonTargetType
}

const getContent = ({
  LeftIcon,
  RightIcon,
  loading,
  children,
  styles,
  outlined,
  colorHex,
  contentColorHex,
  textTransform,
  gap,
}: {
  LeftIcon?: React.FC<IconProps>
  RightIcon?: React.FC<IconProps>
  loading?: boolean
  children?: React.ReactNode
  styles?: ButtonStylesType
  outlined?: boolean
  colorHex?: string
  contentColorHex?: string
  textTransform?: ButtonTextTransformType
  gap?: ButtonGapType
}): React.ReactNode => {
  return (
    <>
      <LoadingContainer>
        <BeatLoader
          size={theme.fontSizes['EM-XX-SMALL'].value}
          colorHex={getContentColor({
            outlined,
            contentColorHex: contentColorHex,
            colorHex: colorHex,
          })}
          loading={loading}
        />
      </LoadingContainer>

      <Content
        textTransform={textTransform}
        gap={gap}
        css={{
          opacity: loading ? 0 : 1,
        }}
      >
        {LeftIcon ? (
          <LeftIcon
            size="1em"
            colorHex={getContentColor({
              outlined,
              contentColorHex: contentColorHex,
              colorHex: colorHex,
            })}
            styles={styles?.icon}
          />
        ) : null}
        <span>{children}</span>
        {RightIcon ? (
          <RightIcon
            size="1em"
            colorHex={getContentColor({
              outlined,
              contentColorHex: contentColorHex,
              colorHex: colorHex,
            })}
            styles={styles?.icon}
          />
        ) : null}
      </Content>
    </>
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color,
      colorHex,
      styles,
      loading,
      disabled,
      effect,
      onClick,
      children,
      gap,
      LeftIcon,
      RightIcon,
      outlined,
      width,
      maxWidth,
      minWidth,
      fontSize,
      textTransform,
      fontWeight,
      borderRadius,
      borderWidth,
      boxShadow,
      contentColor,
      contentColorHex,
      ...props
    },
    ref
  ) => {
    const handleClick = useCallback((): void => {
      if (disabled || loading) {
        return
      }

      onClick?.()
    }, [disabled, onClick, loading])

    return (
      <ButtonDOM
        ref={ref}
        onClick={handleClick}
        state={disabled}
        effect={disabled ? undefined : effect}
        css={{
          br: borderRadius,
          fontWeight: `$${fontWeight}`,
          borderWidth: borderWidth,
          fontSize: `$${fontSize}`,
          width: width,
          maxWidth: maxWidth,
          minWidth: minWidth,
          boxShadow: boxShadow,

          ...getColors({
            outlined,
            colorHex: colorHex || (color && theme.colors[color].value),
            contentColorHex:
              contentColorHex ||
              (contentColor && theme.colors[contentColor].value),
          }),

          ...styles?.button,
        }}
        {...props}
      >
        {getContent({
          LeftIcon,
          RightIcon,
          children,
          gap,
          loading,
          outlined,
          styles,
          textTransform,
          colorHex: colorHex || (color && theme.colors[color].value),
          contentColorHex:
            contentColorHex ||
            (contentColor && theme.colors[contentColor].value),
        })}
      </ButtonDOM>
    )
  }
)

Button.defaultProps = {
  type: 'button',
  disabled: false,
  loading: false,
  padding: 'md',
  color: 'PRIMARY',
  gap: 'md',
  effect: 'opacity',
  outlined: false,
  width: '100%',
  maxWidth: '100%',
  fontSize: 'EM-MEDIUM',
  textTransform: 'default',
  fontWeight: 'NORMAL',
  borderRadius: 'md',
  borderWidth: 2,
  boxShadow: 'ELEVATION_BOTTOM_1',
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      color,
      colorHex,
      styles,
      loading,
      disabled,
      fontSize,
      effect,
      onClick,
      children,
      gap,
      LeftIcon,
      RightIcon,
      outlined,
      width,
      maxWidth,
      minWidth,
      textTransform,
      fontWeight,
      borderRadius,
      borderWidth,
      boxShadow,
      contentColor,
      contentColorHex,
      ...props
    },
    ref
  ) => {
    const handleClick = useCallback((): void => {
      if (disabled || loading) {
        return
      }

      onClick?.()
    }, [disabled, onClick, loading])

    return (
      <ButtonDOM
        as="a"
        ref={ref}
        onClick={handleClick}
        state={disabled}
        effect={disabled ? undefined : effect}
        css={{
          br: borderRadius,
          fontWeight: `$${fontWeight}`,
          borderWidth: borderWidth,
          fontSize: `$${fontSize}`,
          width: width,
          maxWidth: maxWidth,
          minWidth: minWidth,
          boxShadow: boxShadow,

          ...getColors({
            outlined,
            colorHex: colorHex || (color && theme.colors[color].value),
            contentColorHex:
              contentColorHex ||
              (contentColor && theme.colors[contentColor].value),
          }),
          ...styles?.button,
        }}
        {...props}
      >
        {getContent({
          LeftIcon,
          RightIcon,
          children,
          gap,
          loading,
          outlined,
          styles,
          textTransform,
          colorHex: colorHex || (color && theme.colors[color].value),
          contentColorHex:
            contentColorHex ||
            (contentColor && theme.colors[contentColor].value),
        })}
      </ButtonDOM>
    )
  }
)

ButtonLink.defaultProps = {
  disabled: false,
  loading: false,
  padding: 'md',
  color: 'PRIMARY',
  gap: 'md',
  effect: 'opacity',
  outlined: false,
  width: '100%',
  maxWidth: '100%',
  fontSize: 'EM-MEDIUM',
  textTransform: 'default',
  fontWeight: 'NORMAL',
  borderRadius: 'md',
  borderWidth: 2,
  boxShadow: 'ELEVATION_BOTTOM_1',
}
