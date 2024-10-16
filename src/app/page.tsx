import BookCard from '@/components/BookCard'
import Header from '@/components/Header'
import styles from './page.module.css'

// Đây là một Server Component
export default async function Home() {
  // Gọi API trực tiếp trong Server Component
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`, { cache: 'no-store' }) 
  const books = await res.json()

  function removeVietnameseTones(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D') 
      .toLowerCase() 
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-'); 
  }
  
  return (
    <main className={styles.main}>
      <div>
        <Header />
        <div className={styles.containerStyle}>
          <div className={styles.grouper}>
            <h1 className={styles.title}>ALL BOOKS</h1>
            <ul className={styles.ulGroupStyle}>
              {
                books.stories.map((book, i) => (
                  <li key={i} className={styles.liGroupStyle}>
                    <a href={`/truyen/${removeVietnameseTones(book.title)}`} style={{ textDecoration: 'none' }}>
                      <BookCard 
                        title={book.title} 
                        coverImage={book.image} 
                        description={book.description} 
                      />
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
