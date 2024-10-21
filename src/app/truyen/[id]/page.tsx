interface Chapter {
  _id: string; 
  title: string;
  link: string;
  server_data?: ServerData[]; 
}

interface ServerData {
  chapter_name: string;
  chapter_api_data: string; // Define chapter_api_data here
}

interface Story {
  title: string;
  description: string;
  chapters: Chapter[];
}

interface Book {
  story: Story;
  chapters: Chapter[];
  data: {
    item: {
      name: string;
      content: string;
      thumb_url: string;
      chapters: Chapter[];
    };
  };
}


export default async function TruyenPage({ params }: { params: { id: string } }) {

  const res = await fetch(`https://otruyenapi.com/v1/api/truyen-tranh/${params.id}/`, { cache: 'no-store' });
  
  if (!res.ok) {
    return <div>Không thể tải dữ liệu.</div>; 
  }

  const book: Book = await res.json(); // Gán kiểu cho dữ liệu trả về

  return (
    <div>
      <h1>{book?.data?.item.name}</h1>
      <p>{book?.data?.item.content}</p>
      <img
        src={`https://img.otruyenapi.com/uploads/comics/${book?.data?.item.thumb_url}`}
        alt={book?.data?.item.name}
      />

      <ul>
        {
          book.data.item.chapters[0].server_data?.map((chap: ServerData, i: number) => (
            <li key={i}>
              <a href={`/truyen/${params.id}/${chap.chapter_api_data.replace('https://sv1.otruyencdn.com/v1/api/chapter', '')}`}>
                Chap {chap.chapter_name}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
