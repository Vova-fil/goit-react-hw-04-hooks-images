import { useState, useEffect } from 'react';

import pixabayAPI from '../services/pixabay-api';
import SearchBar from 'components/Searchbar';
import Loader from './Loader';
import ButtonLoadMore from './Button';
import PixabayImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [searchImage, setSearchImage] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const per_page = 12;

  useEffect(() => {
    if (!searchImage) {
      return;
    }
    setStatus('pending');
    const loadImages = () => {
      pixabayAPI
        .fetchPixabayImage(searchImage, page, per_page)
        .then(response => {
          if (response.hits.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            setStatus('idle');
          } else {
            if (page * per_page > response.total) {
              toast.info(
                'Sorry, there are no more images matching your search query.'
              );
              setImages(images => [...images, ...response.hits]);
              setStatus('idle');
            } else {
              setImages(images => [...images, ...response.hits]);
              setStatus('resolved');
              setTotalHits(response.total);
              toast.info(
                `numbers of images ${
                  response.total
                }, number of page ${page} from the ${Math.ceil(
                  response.total / per_page
                )} pages `
              );
            }
          }
          scrollToBottom();
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };

    const loadImagesBySearch = () => {
      loadImages();
    };
    loadImagesBySearch();
  }, [page, searchImage]);

  const handleFormSubmit = searchImage => {
    resetPage();
    setSearchImage(searchImage);
    setImages([]);
  };

  const resetPage = () => {
    setPage(1);
  };

  const onButtonClick = () => {
    setPage(page + 1);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMore = page < totalHits / per_page;

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit}  />
      <ToastContainer autoClose={4000} />
      {images.length !== 0 && <PixabayImageGallery images={images} />}
      {status === 'pending' && (
        <div>
          <Loader images={images} />
        </div>
      )}
      {status === 'rejected' && (
        <div role="alert">
          <p>{error.message}</p>
        </div>
      )}
      {status === 'resolved' && loadMore && (
        <div>
          <ButtonLoadMore onClick={() => onButtonClick()} />
        </div>
      )}
    </div>
  );
}
