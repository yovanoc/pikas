import { Badge } from '@pikas-ui/badge'
import { ExampleContainer } from '@/components/ExampleContainer'

export const BadgeExample: React.FC = () => {
  return (
    <ExampleContainer>
      <Badge leftIconName="bx:baguette">Bread</Badge>
      <Badge leftIconName="bx:baguette" color="SECONDARY">
        Bread
      </Badge>
      <Badge leftIconName="bx:baguette" color="TERTIARY">
        Bread
      </Badge>
    </ExampleContainer>
  )
}