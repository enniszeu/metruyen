// app/truyen/[id]/page.tsx

interface Chapter {
  title: string;
  link: string;
}

interface Story {
  title: string;
  description: string;
  chapters: Chapter[];
}

interface Book {
  story: Story;
}

export default async function TruyenPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/truyen?url=${process.env.NEXT_PUBLIC_API_URL_IO}/${params.id}/`, { cache: 'no-store' });

  if (!res.ok) {
    return <div>Không thể tải dữ liệu.</div>;
  }

  const book: Book = await res.json(); // Gán kiểu cho dữ liệu trả về

  return (
    <div>
      <h1>{book.story.title}</h1>
      <p>{book.story.description}</p>

      <ul>
        {
          book.story.chapters.map((chap, i) => (
            <li key={i}>
              <a href={`/truyen/${chap.link.replace('https://truyenfull.io/', '')}`} style={{ textDecoration: 'none' }}>
                {chap.title}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
