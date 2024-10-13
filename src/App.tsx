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
import { IziToastSettings } from 'izitoast';
import { useEffect, useState } from 'react';
function App() {
type ImgDataType = {
   
  id: number;
  description: string;
  urls: {
   regular:string,
   small:  string,
   
  }
 
  };
  type responsType = {
    // total: number;
    // total_pages: number;
    // response: {
    //   data: {
    //     total: number;
    //     total_pages: number;
    //     results: ImgDataType;
    //   };
    // };
    data: {
      total: number;
      total_pages: number;
      results: ImgDataType[];
    };
  };
  const [ImgData, setData] = useState<ImgDataType[]>([]);
  const [query, setQuery] = useState<string | null>(null)
  const [loader, setLoader] = useState<boolean>(false)
  const [err, setErr] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [page, setPage] = useState<number>(1)
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [urlModalImg, setUrlModalImg] = useState<string>('')
   function openModal(value:string) {
     setIsOpen(true);
     setUrlModalImg(value);
   }

   
  function closeModal() {
    setIsOpen(false);
  }
 
  const sendQuery= (searchValue: string) => {
 
    setQuery(searchValue);
  }
  let maxPage: number ;
  if (totalPages !== null) {
  maxPage = Math.round(totalPages / (12 * page));
  } 
 
  useEffect(() => {
    async function getImgs(word:string, page:number) {
      if( word === null) return
      try {
        setLoader(true);
        const response:responsType = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=vKuo5q6BtAb4eyT7HMIcPesAbRlmfSav8y4iXt9ouF0&query=${word}&per_page=12&page=${page}`
        );
        console.log(response)
        if (response.data.results.length === 0) {
          setLoader(false);
          iziToast.error({ message: "There is no matches to your request, try again" });
          setErr(true);
          return;
        } else {
          setData((imgData) => [...imgData, ...response.data.results]);
          setTotalPages(response.data.total);
        }
      } catch (error) {
        iziToast.error(error!);
        setErr(true);
      } finally {
        setLoader(false);
      }
    }
    getImgs(
      query!, page
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
          openModal={openModal}
       
        />
      )}
      {query !== null && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          imgModal={urlModalImg}
          closeModal={closeModal}
        />
      )}
      {maxPage! > page && <LoadMoreBtn loadMore={loadMore} />}
    </>
  );
}

export default App
