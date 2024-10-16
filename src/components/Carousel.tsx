"use client"

import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';


const slides = [
  { id: 1, image: 'https://pic.arkread.com/banner/campaign/u/16222.1727162465!campaign_unedited.png', caption: 'Slide 1' },
  { id: 2, image: 'https://pic.arkread.com/banner/campaign/u/16231.1727317913!campaign_unedited.png', caption: 'Slide 2' },
  { id: 3, image: 'https://pic.arkread.com/banner/campaign/u/16209.1726653422!campaign_unedited.png', caption: 'Slide 3' },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Thay đổi slide sau mỗi 3 giây

    // Dọn dẹp interval khi component bị hủy
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slide}>
        <img className={styles.image} src={slides[currentIndex].image} alt={slides[currentIndex].caption} />
      </div>
    </div>
  );
};

export default Carousel;
