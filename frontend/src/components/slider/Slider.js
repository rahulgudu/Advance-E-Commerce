import React, { useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Slider.scss"; 
import { sliderData } from './slider-data';
import { useNavigate } from "react-router-dom";
const Slider = () => {
    const naviagte =  useNavigate();
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const slideLength = sliderData.length;
    const autoSlide = true;
    let slideInterval;
    let intervalTime = 5000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 :  currentSlide + 1);
    };
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    // when I visit the page the slide should start from 0
    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    // AutoSlide
    useEffect(() => {
        if(autoSlide){
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime);
            }
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide, intervalTime, autoSlide]);


  return (
    <div className='slider'>
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>

      { sliderData.map((slide, index) => {
        const {image, heading, desc} = slide;

        return (
            <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                {index === currentSlide && (
                    <>
                        <img src={image} alt="slide" />
                        <div className='content'>
                            <span className='span1'></span>
                            <span className='span2'></span>
                            <span className='span3'></span>
                            <span className='span4'></span>
                            <h2>{heading}</h2>
                            <p>{desc}</p>
                            <hr />
                            <button className='--btn --btn-primary' onClick={()=>naviagte("/shop")}>
                                Shop Now
                            </button>
                        </div>
                    </>
                )}
            </div>
        )
      }) }
    </div>
  )
}

export default Slider
