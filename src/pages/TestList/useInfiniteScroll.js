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

  
  function handleScroll(event) {

   // console.log(event);
   // console.log(document.documentElement.o);
    



  console.log("window.innerHeight " + window.innerHeight);
  
  console.log("document.documentElement.clientHeight " +document.documentElement.clientHeight );

  console.log("document.documentElement.scrollHeight " +document.documentElement.scrollHeight );
  
  console.log("document.documentElement.scrollTop " + document.documentElement.scrollTop);
  
  console.log("document.documentElement.offsetHeight " + document.documentElement.offsetHeight);

  
  
   
    if (document.documentElement.clientHeight  + document.documentElement.scrollTop < document.documentElement.scrollHeight  || isFetching) return;
  
    console.log("Выводим");
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;