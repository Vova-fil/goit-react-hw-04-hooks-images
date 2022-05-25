import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import './Searchbar.styled.js';
import {
  Searchbar,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export default function SearchBar(props) {
  const [searchImage, setSearchImage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchImage.trim() === '') {
      toast.warn('Please enter a valid request!', { theme: 'colored' });
      return;
    }
    props.onSubmit(searchImage);
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setSearchImage(value.toLowerCase());
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <FcSearch size="40" />
        </SearchFormBtn>

        <SearchFormInput
          value={searchImage}
          onChange={handleChange}
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="search field image and photo "
        />
      </SearchForm>
    </Searchbar>
  );
}

SearchBar.propTypes = {
  searchImage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
