// Sử dụng Server Component để fetch dữ liệu từ API





export default async function TruyenPage({ params }) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/truyen?url=${process.env.NEXT_PUBLIC_API_URL_IO}/${params.id}/`, { cache: 'no-store' });
    if (!res.ok) {
      return <div>Không thể tải dữ liệu.</div>;
    }



  
    const book = await res.json();
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

  
