# @pikas-ui/searchbar

This package contains a searchbar component.

This library is based on [Radix Ui](https://www.radix-ui.com/).

## Getting Started

You need to install the [@pikas-ui/styles](../styles/README.md) package to use this package.

### Installation

With npm:

```
npm install @pikas-ui/searchbar
```

With yarn:

```
yarn add @pikas-ui/searchbar
```

With pnpm:

```
pnpm add @pikas-ui/searchbar
```

---

## Usage

### Textfield
```tsx
import { Textfield } from `@pikas-ui/searchbar`;

const Example: React.FC = () => {
  return <Textfield />
}
```

#### Props

| Prop              | Description                                        | Type                                     | Default       |
| :---------------- | :------------------------------------------------- | :--------------------------------------- | :------------ |
| `styles`          | The style of the button.                           | `object`                                 | -             |
| `searchFunction`  | The function to call when the search is performed. | `(value: string) => Promise<T>`          | -             |
| `onSearch`        | The function to call when the search is performed. | `(value: T) => ResultItemType[] or null` | -             |
| `searchType`      | The type of the searchbar.                         | `"button", "textfield"`                  | `"button"`    |
| `isOpen`          | The state of the searchbar.                        | `boolean`                                | `false`       |
| `id`              | The id of the searchbar.                           | `string`                                 | -             |
| `searchWhenKeyUp` | The state of the searchbar.                        | `boolean`                                | `false`       |
| `debounceDelay`   | The delay of the searchbar.                        | `number`                                 | `500`         |
| `textfield`       | The props of the textfield.                        | `TextfieldProps`                         | -             |
| `noResult`        | The message when no result is found.               | `React.ReactNode`                        | `"No result"` |
| `loading`         | The message when the search is loading.            | `React.ReactNode`                        | -             |
| `direction`       | The direction of the searchbar.                    | `SearchbarDirection`                     | -             |

---

### Change Log
You can find the change log [here](CHANGELOG.md).