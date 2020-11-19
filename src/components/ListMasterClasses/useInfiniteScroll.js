import { useState, useEffect } from 'react';

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

  
  function handleScroll() {


    console.log('handleScroll');
   
    if (Math.ceil(document.documentElement.clientHeight  + document.documentElement.scrollTop) < document.documentElement.scrollHeight  || isFetching) {
      return;
    }
    console.log("Прикрутили в конец");
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;