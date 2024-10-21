
import BookCard from '@/components/BookCard'
import Header from '@/components/Header'
import styles from './page.module.css'
import Carousel from '@/components/Carousel'; 
import MenuBar from '@/components/MenuBar';
import BookList from '@/components/BookCard';
import Slide from '@/components/Slide';

import './globals.css'


interface Book {
  id: number;
  title: string;
  image: string;
  description: string;
}

// Đây là một Server Component
export default async function Home() {
  // Gọi API trực tiếp trong Server Component
  const resNew = await fetch(`https://otruyenapi.com/v1/api/danh-sach/truyen-moi`, { cache: 'no-store' }) 
  const resOnNew = await fetch(`https://otruyenapi.com/v1/api/danh-sach/sap-ra-mat`, { cache: 'no-store' }) 
  const resFull = await fetch(`https://otruyenapi.com/v1/api/danh-sach/hoan-thanh`, { cache: 'no-store' }) 

  const books = await resNew.json()
  const booksFukk = await resFull.json()
  const booksOnNew = await resOnNew.json()
  console.log(books.data.items)

  function removeVietnameseTones(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D') 
      .toLowerCase() 
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-'); 
  }
  
  return (
    <div>
      <MenuBar />
      <Carousel />
      <main className={styles.main}>
        <div>
          <div>
          <Slide books={books.data.items} title='Truyện new'/>
          <Slide books={booksOnNew.data.items} title='Truyện Sắp ra mắt'/>
          <Slide books={booksFukk.data.items} title='Truyện Full'/>
              {/* <Slide books={books.stories} title='Truyện đề cử'/>
              <Slide books={books.stories} title='Truyện new'/>
              <Slide books={books.stories} title='Truyện hot'/> */}
          </div>
        </div>
      </main>
    </div>
  )
}
