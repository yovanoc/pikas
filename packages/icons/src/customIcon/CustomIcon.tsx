import { styled } from '@pikas-ui/styles'
import React from 'react'
import type { IconProps } from '../types'

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export interface CustomIconProps extends IconProps {
  children?: React.ReactNode
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  children,
  className,
  color,
  colorHex,
  onClick,
  size,
  styles,
}) => {
  return (
    <Container
      onClick={onClick}
      className={className}
      css={{
        ...styles?.container,
        svg: {
          width: size,
          height: size,
          color: (color ? `$${color}` : undefined) || colorHex,
          ...styles?.svg,
        },
      }}
    >
      {children}
    </Container>
  )
}
