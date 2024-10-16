'use client'
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Slide.module.css';
import images from '../constants/mockData';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface Book {
    title: string;
    author: string;
    type: string;
    chapter: string;
    coverUrl: string;
}

// Define the props for the BookList component
interface BookListProps {
    books: Book[];
    title?: string;
}

const Slide: FC<BookListProps> = ({ books, title }) => {
    const [randomImages, setRandomImages] = useState<string[]>([]);

    // Hàm loại bỏ dấu tiếng Việt
    function removeVietnameseTones(str: string) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D') 
            .toLowerCase() 
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-'); 
    }

    // Sử dụng useEffect để tạo ra mảng ảnh ngẫu nhiên
    useEffect(() => {
        const imagesArray = books.map(() => images[Math.floor(Math.random() * images.length)]);
        setRandomImages(imagesArray);
    }, [books]);

    return (
        <div className="w-full">
            {title && <div className="text-2xl font-bold mb-4 mt-4">{title}</div>}
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                className="w-full"
            >
                {books.map((book, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <a href={`/truyen/${removeVietnameseTones(book.title)}`} style={{ textDecoration: 'none' }}>
                            <div className="relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out max-w-xs">
                                <img
                                    src={book.coverUrl || randomImages[index]} // Sử dụng ảnh ngẫu nhiên đã được tạo trên client
                                    alt={book.title}
                                    className={styles.bookImage}
                                />
                                {/* Overlay cho tiêu đề và tác giả */}
                                <div className={`${styles.bookInfo} bg-black bg-opacity-50 text-white p-3 rounded-b-lg`}>
                                    <h3 className="text-lg font-bold">{book.title}</h3>
                                    <p className="text-sm">{book.author}</p>
                                </div>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slide;
