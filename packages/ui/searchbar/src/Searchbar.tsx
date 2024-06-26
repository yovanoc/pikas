import { ButtonIcon } from '@pikas-ui/button';
import type { IconProps } from '@pikas-ui/icons';
import { IconByName } from '@pikas-ui/icons';
import { ClipLoader } from '@pikas-ui/loader';
import { Separator } from '@pikas-ui/separator';
import type { PikasCSS } from '@pikas-ui/styles';
import { styled } from '@pikas-ui/styles';
import type { TextfieldProps, TextfieldCSS } from '@pikas-ui/textfield';
import { Textfield } from '@pikas-ui/textfield';
import { useEffect, useState, useRef, ReactNode, FC } from 'react';
import {
  useDebounceValue,
  useOnClickOutside,
  useWindowSize,
} from 'usehooks-ts';

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

const Result = styled('div', {
  position: 'absolute',
  left: 0,
  right: 0,
  backgroundColor: '$white',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '$gray',
  borderRadius: '$lg',
  boxShadow: '$xs',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.2s ease-in-out',
  maxHeight: 300,
  overflowY: 'auto',

  variants: {
    isOpen: {
      true: {
        opacity: 1,
        pointerEvents: 'auto',
      },
    },
    direction: {
      down: {
        top: '100%',
      },
      up: {
        bottom: '100%',
      },
    },
  },
});

const SearchResultContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

const ResultGroupStyled = styled('div', {});

const ResultGroupTitle = styled('span', {
  fontWeight: '$bold',
  padding: '16px 16px 8px 16px',
  color: '$black',
});

const ResultItemStyled = styled('div', {
  padding: '8px 16px',
  cursor: 'pointer',
  color: '$black',
  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '$gray-lighter',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$gray-lighter',
      },
    },
  },
});

const NoResult = styled('div', {
  padding: '8px 16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$black',
});

const ResultLoading = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
});

const DirectResultValue = styled('span', {
  color: '$black',
});

const SearchIcon: FC<IconProps> = ({ ...props }) => (
  <IconByName name="bx:search" {...props} />
);

export const searchbarDirection = {
  up: true,
  down: false,
};
export type SearchbarDirection = typeof searchbarDirection;

export type ResultItem = {
  content: ReactNode;
  onClick?: () => void;
};

export type ResultGroup = {
  title?: string;
  items: ResultItem[];
};

type ResultGroupWithId = {
  title?: string;
  items: Array<ResultItem & { id: number }>;
};

export type SearchbarCSS = {
  container?: PikasCSS;
  resultContainer?: PikasCSS;
  noResult?: PikasCSS;
  resultItem?: PikasCSS;
  textfield?: TextfieldCSS;
  resultGroup?: PikasCSS;
  resultGroupTitle?: PikasCSS;
};

export type SearchbarProps<T> = {
  searchFunction: (value: string) => Promise<T>;
  onSearch: (value: T) => ResultGroup[] | null;
  searchType?: 'button' | 'textfield';
  isOpen?: boolean;
  id?: string;
  searchWhenKeyUp?: boolean;
  debounceDelay?: number;
  textfield?: TextfieldProps;
  css?: SearchbarCSS;
  noResult?: ReactNode;
  loading?: ReactNode;
  direction?: SearchbarDirection;
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  directResult?: {
    enabled: boolean;
    onClick?: (value?: string) => void;
  };
};

export const Searchbar = <T,>({
  onSearch,
  searchFunction,
  searchType = 'button',
  isOpen: isOpenProp = false,
  id = 'searchbar',
  searchWhenKeyUp,
  css,
  textfield,
  debounceDelay = 500,
  loading: loadingProp = false,
  noResult = 'No result',
  direction: directionProp,
  width = '100%',
  maxWidth = '100%',
  minWidth,
  directResult,
}: SearchbarProps<T>): JSX.Element => {
  const [result, setResult] = useState<ResultGroupWithId[]>();
  const [textfieldValue, setTextfieldValue] = useState<string>();
  const [nbItems, setNbItems] = useState(0);
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [loading, setLoading] = useState(loadingProp);
  const [direction, setDirection] = useState(directionProp);
  const [selectionId, setSelectionId] = useState(0);
  const debouncedValue = useDebounceValue(textfieldValue, debounceDelay);
  const refContainer = useRef<HTMLFormElement | null>(null);
  const refTextfield = useRef<HTMLInputElement | null>(null);
  const refResult = useRef<HTMLDivElement | null>(null);
  const refItem = useRef<Array<HTMLDivElement | null>>([]);
  useOnClickOutside(refContainer, () => setIsOpen(false));
  const [outerHeight, setOuterHeight] = useState<number>();
  const windowSize = useWindowSize();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    setOuterHeight(window.outerHeight);
  }, [windowSize]);

  const getResultFormat = (res: ResultGroup[] | null): ResultGroupWithId[] => {
    if (!res) {
      return [];
    }

    let i = directResult?.enabled ? 1 : 0;
    const resultFormat: ResultGroupWithId[] = [];

    for (const group of res) {
      const items: Array<ResultItem & { id: number }> = [];
      for (const item of group.items) {
        items.push({
          ...item,
          id: i,
        });
        i++;
      }

      resultFormat.push({
        title: group.title,
        items,
      });
    }

    setNbItems(i);

    return resultFormat;
  };

  const handleSearch = async (): Promise<void> => {
    if (!textfieldValue) {
      return;
    }

    refItem.current = [];
    const res = await searchFunction(textfieldValue);
    const resOnSearch = onSearch(res);
    setResult(getResultFormat(resOnSearch));
    setLoading(false);
  };

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  useEffect(() => {
    setLoading(loadingProp);
  }, [loadingProp]);

  useEffect(() => {
    setDirection(directionProp);
  }, [directionProp]);

  useEffect(() => {
    if (searchWhenKeyUp) {
      void handleSearch();
    }
  }, [debouncedValue]);

  const handleAddSelectionId = (): void => {
    setSelectionId((ls) => {
      const currentItemArray = Object.values(refItem.current);
      const newId = Math.min(
        ls + 1,
        currentItemArray.length ? currentItemArray.length - 1 : 0
      );
      const currentItem = currentItemArray[newId];
      const currentResult = refResult.current;
      if (
        currentItem &&
        currentResult &&
        currentItem.offsetTop + currentItem.offsetHeight >
          currentResult.scrollTop + currentResult.offsetHeight
      ) {
        currentResult.scrollTo({
          top:
            currentItem.offsetTop -
            currentResult.offsetHeight +
            currentItem.offsetHeight,
          behavior: 'smooth',
        });
      }
      return newId;
    });
  };

  const handleRemoveSelectionId = (): void => {
    setSelectionId((ls) => {
      const currentItemArray = Object.values(refItem.current);
      const newId = Math.max(ls - 1, 0);
      const currentItem = currentItemArray[newId];
      const currentResult = refResult.current;

      if (
        currentItem &&
        currentResult &&
        currentItem.offsetTop < currentResult.scrollTop
      ) {
        currentResult.scrollTo({
          top: currentItem.offsetTop,
          behavior: 'smooth',
        });
      }
      return newId;
    });
  };

  return (
    <Form
      onSubmit={(e): void => {
        e.preventDefault();
        void handleSearch();
      }}
      css={{
        width,
        maxWidth,
        minWidth,
        ...css?.container,
      }}
      ref={refContainer}
    >
      <Textfield
        {...textfield}
        ref={refTextfield}
        autoComplete="off"
        onChange={(e): void => {
          setIsOpen(true);
          setSelectionId(0);
          setLoading(true);
          textfield?.onChange?.(e);
          setTextfieldValue(e.target.value);

          if (!searchWhenKeyUp) {
            setIsOpen(false);
          }
        }}
        id={id}
        rightChildren={
          searchType === 'button' ? (
            <ButtonIcon
              Icon={SearchIcon}
              borderRadius="full"
              type="submit"
              size={14}
              padding="xs"
            />
          ) : undefined
        }
        RightIcon={searchType !== 'button' ? SearchIcon : undefined}
        onFocus={(e): void => {
          textfield?.onFocus?.(e);
          if (!textfieldValue) {
            return;
          }
          setIsOpen(true);
        }}
        onKeyDown={(e): void => {
          textfield?.onKeyDown?.(e);
          if (loading && !directResult?.enabled) {
            return;
          }

          switch (e.key) {
            case 'Enter':
              if (isOpen) {
                refItem.current[selectionId]?.click();
                refTextfield.current?.blur();
                setIsOpen(false);
              }
              break;

            case 'ArrowDown':
              handleAddSelectionId();
              break;

            case 'ArrowUp':
              handleRemoveSelectionId();
              break;

            default:
              break;
          }
        }}
        css={{
          right: {
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...css?.textfield?.right,
          },
          ...css?.textfield,
        }}
      />
      <Result
        ref={refResult}
        isOpen={isOpen}
        css={css?.resultContainer}
        direction={
          direction ??
          (outerHeight &&
            outerHeight / 2 < (refContainer.current?.offsetTop ?? 0))
            ? 'up'
            : 'down'
        }
      >
        {directResult?.enabled && textfieldValue ? (
          <ResultItemStyled
            ref={(ref): void => {
              refItem.current[0] = ref;
            }}
            onClick={(): void => {
              directResult.onClick?.(textfieldValue);
              setIsOpen(false);
            }}
            selected={selectionId === 0}
            css={css?.resultItem}
          >
            <DirectResultValue>{textfieldValue}</DirectResultValue>
          </ResultItemStyled>
        ) : null}

        <SearchResultContainer>
          {loading ? (
            <ResultLoading>
              <ClipLoader size={40} colorName="primary" />
            </ResultLoading>
          ) : null}
          {!loading && (
            <>
              {nbItems && result ? (
                result.map((group, groupIndex) => {
                  const res = [];

                  if (group.title && group.items.length) {
                    res.push(
                      <ResultGroupTitle
                        key={`${groupIndex}-title`}
                        css={css?.resultGroupTitle}
                      >
                        {group.title}
                      </ResultGroupTitle>
                    );
                  }

                  res.push(
                    <ResultGroupStyled key={groupIndex} css={css?.resultGroup}>
                      {group.items.map((item, itemIndex) => {
                        const resGroupItem = [];

                        if (itemIndex) {
                          resGroupItem.push(
                            <Separator
                              size={1}
                              key={`${itemIndex}-separator`}
                            />
                          );
                        }

                        resGroupItem.push(
                          <ResultItemStyled
                            ref={(ref): void => {
                              refItem.current[item.id] = ref;
                            }}
                            key={itemIndex}
                            onClick={(): void => {
                              item.onClick?.();
                              setIsOpen(false);
                            }}
                            selected={selectionId === item.id}
                            css={css?.resultItem}
                          >
                            {item.content}
                          </ResultItemStyled>
                        );

                        return resGroupItem;
                      })}
                    </ResultGroupStyled>
                  );

                  return res;
                })
              ) : (
                <NoResult css={css?.noResult}>{noResult}</NoResult>
              )}
            </>
          )}
        </SearchResultContainer>
      </Result>
    </Form>
  );
};
