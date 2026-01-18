import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Carousel.css";

const API_URL = "http://10.1.184.28:8000/api";

const Carousel = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/carousel/`)
      .then(res => {
        setSlides([...res.data, ...res.data]); 
      })
      .catch(err => console.error(err));
  }, []);

  if (!slides.length) return null;

  return (
    <section className="carousel-section">
      <div className="carousel-window">
        <div className="carousel-track">
          {slides.map((slide, i) => (
            <div className="carousel-slide" key={i}>
              <img
                src={slide.images_url?.[0]?.image}
                alt={slide.text}
              />
              <div className="carousel-caption">
                <h2>{slide.text}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
