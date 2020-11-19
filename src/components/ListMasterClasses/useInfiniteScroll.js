import { useState, useEffect } from 'react';

const wrappedElement = document.getElementById('root');

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  

  const isBottom = () => {
   
    return (Math.floor(wrappedElement.getBoundingClientRect().bottom) <= window.innerHeight);

  }

  function handleScroll() {    
   if (!isBottom() || isFetching) {
    return;
  }
  console.log("Прикрутили в конец");
  setIsFetching(true);
  }
  

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;