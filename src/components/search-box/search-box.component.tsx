import { ChangeEvent } from 'react';

import './search-box.styles.css';

type SearchBoxProps = {
  className: string;
  placeHolder?: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({
  className,
  placeHolder,
  onChangeHandler,
}: SearchBoxProps) => (
  <input
    className={`search-box ${className}`}
    type='search'
    placeholder={placeHolder}
    onChange={e => onChangeHandler(e)}
  />
);

export default SearchBox;
