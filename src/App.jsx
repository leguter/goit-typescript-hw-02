import SearchBar from './components/SearchBar/SearchBar'
import './App.css'
import ImageGallery from './components/ImageGallery/ImageGallery'
import axios from 'axios';
import iziToast from 'izitoast';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import React from "react";
import { useEffect, useState } from 'react';
function App() {
  const [ImgData, setData] = useState([])
  const [query, setQuery] = useState(null)
  const [loader, setLoader] = useState(false)
  const [err, setErr] = useState(false)
  const [totalPages, setTotalPages] = useState(null)
  const [page, setPage] = useState(1)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [urlModalImg, setUrlModalImg] = useState('')
   function openModal(value) {
     setIsOpen(true);
     setUrlModalImg(value);
   }

   
  function closeModal() {
    setIsOpen(false);
  }
 
  const sendQuery = (searchValue) => {
 
    setQuery(searchValue);
  }
  const maxPage = Math.round(totalPages / (12 * page))
  useEffect(() => {
    async function getImgs(word, page) {
      if( word === null) return
      try {
        setLoader(true)
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=vKuo5q6BtAb4eyT7HMIcPesAbRlmfSav8y4iXt9ouF0&query=${word}&per_page=12&page=${page}`
        );
        if (response.data.results.length === 0) {
          setLoader(false)
          iziToast.error("There is no matches to your request, try again");
          setErr(true)
          return;
        } else {
          setData((imgData) => [...imgData, ...response.data.results]);
          setTotalPages(response.data.total)
        }
      } catch (error) {
        iziToast.error(error);
        setErr(true)
      } finally {
        setLoader(false)
      }
    }
    getImgs(
      query, page
     );
  }, [query,page])
  const loadMore = () => {
    if (maxPage > page) {
      setPage(page + 1)
    }
  };
  return (
    <>
      <SearchBar sendQuery={sendQuery} setData={setData} setPage={setPage} />
      {loader !== false && <Loader />}
      {err === true && <ErrorMessage />}
      {query !== null && (
        <ImageGallery
          dataImgs={ImgData}
          fncSubmit={sendQuery}
          openModal={openModal}
          setUrlModalImg={setUrlModalImg}
        />
      )}
      {query !== null && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          imgModal={urlModalImg}
          closeModal={closeModal}
        />
      )}
      {maxPage > page && <LoadMoreBtn loadMore={loadMore} />}
    </>
  );
}

export default App
