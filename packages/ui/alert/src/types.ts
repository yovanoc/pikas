import type { IconCSSType } from '@pikas-ui/icons'
import type {
  BorderRadiusType,
  CSS,
  FontsSizesType,
  FontsWeightsType,
} from '@pikas-ui/styles'

export const AlertPadding = {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
}
export type AlertPaddingType = keyof typeof AlertPadding

export const AlertGap = {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
}
export type AlertGapType = keyof typeof AlertGap

export interface AlertCSSType {
  container?: CSS
  content?: CSS
  icon?: IconCSSType
  child?: CSS
}

export interface DefaultAlertProps {
  children?: React.ReactNode
  fontSize?: FontsSizesType
  fontWeight?: FontsWeightsType
  borderRadius?: BorderRadiusType
  iconSize?: number
  padding?: AlertPaddingType
  gap?: AlertGapType
  visible?: boolean
  css?: AlertCSSType
}