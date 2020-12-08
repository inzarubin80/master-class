import { useEffect,  useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";

export default (ref, rootMargin = '0px', one = false) => {

    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
            setIntersecting((prev)=>{return one&&prev?prev:entry.isIntersecting} ); 
        },
        {
          rootMargin
        }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        
        if (ref.current){

            observer.unobserve(ref.current);
        
          }
      };
    }, []); 
  
    return [isIntersecting,  setIntersecting];

};
