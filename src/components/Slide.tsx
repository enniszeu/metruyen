'use client';
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Slide.module.css';
import images from '../constants/mockData';
import Link from 'next/link';

interface Book {
    name: string;
    author: string;
    type: string;
    chapter: string;
    slug: string;
    thumb_url: string;
    _id: string; // Kiểu của _id là string
}

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
                    <SwiperSlide key={book._id} className="flex justify-center"> {/* Sử dụng book._id làm key */}
                        <Link href={`/truyen/${book.slug}`}>
                            <div className="relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out max-w-xs">
                                <img
                                    src={`https://img.otruyenapi.com/uploads/comics/${book.thumb_url}`}
                                    alt={book.name}
                                    className={styles.bookImage}
                                />
                                <div className={`${styles.bookInfo} bg-black bg-opacity-50 text-white p-3 rounded-b-lg`}>
                                    <h3 className="text-lg font-bold">{book.name}</h3>
                                    <p className="text-sm">{book.author}</p>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slide;
