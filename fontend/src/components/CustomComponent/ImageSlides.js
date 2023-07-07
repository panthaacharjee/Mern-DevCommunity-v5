import React, { useState } from "react";
import "./imageslides.css";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

const ImageSlides = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const firstSlide = currentIndex === 0;
    const newIndex = firstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const lastSlide = currentIndex === images.length - 1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const imageStyle = {
    backgroundImage:
      images.length > 0 && `url(${images[currentIndex].original})`,
    display: images.length > 0 ? "flex" : "none",
  };
  return (
    <div className="image-carosel">
      <div className="image-carosel-div" style={imageStyle}>
        {images.length > 1 ? (
          <>
            <span onClick={goToPrevious}>
              <BsArrowLeftSquareFill />
            </span>
            <span onClick={goToNext}>
              <BsArrowRightSquareFill />
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ImageSlides;
