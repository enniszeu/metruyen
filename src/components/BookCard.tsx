// components/BookList.tsx
'use client';
import React from 'react';
import styles from './BookCard.module.css';

// Define the shape of the book object using TypeScript interfaces
interface Book {
    title: string;
    author: string;
    type: string;
    chapter: string;
}

// Define the props for the BookList component
interface BookListProps {
    books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    return (
        <div className={styles.bookList}>
            <h2>Our Favourite Reads</h2>
            <div className={styles.bookGrid}>
                {books.map((book, index) => (
                    <div className={styles.bookItem} key={index}>
                      <div>
                          <img
                              src="https://pic.arkread.com/cover/column/f/65267799.1725851136.jpg!cover_default.jpg"
                              alt={book.title}
                          />
                          <div className={styles.bookInfo}>
                          <h3>{book.title}</h3>
                          <p>by {book.author}</p>
                          <p>Type: {book.type}</p>
                          <p className={styles.price}>{book.chapter}</p>
                        </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
