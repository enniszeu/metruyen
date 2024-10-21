// app/truyen/[id]/chap/[chapId]/page.tsx

interface ChapterData {
  title: string;
  content: string;
}

interface ApiResponse {
  [key: string]: ChapterData;
}
export const metadata = {
  title: 'Chi tiết chương',
  description: 'Hiển thị chi tiết chương của truyện',
};

import styles from './book.module.css';

export default async function ChapPage({ params }: { params: { id: string; chapId: string } }) {
  const { id, chapId } = params;

  const res = await fetch(`https://sv1.otruyencdn.com/v1/api/chapter/${chapId}/`, { cache: 'no-store' });
  if (!res.ok) {
    return <div>Không thể tải dữ liệu.</div>; 
  }

  const { data }: ApiResponse = await res.json();
  console.log(data.item.chapter_image);

  return (
    <div>
      <div>
      </div>

      {/* Render nội dung chương */}
      {
        data.item.chapter_image.map((image: string, index: number) => (
          <img
            key={index}
            src={`https://sv1.otruyencdn.com/${data.item.chapter_path}/${image.image_file}`}
            alt={`Chuong ${index + 1}`}
            className={styles.chapterImage}
          />
        ))
      }
    </div>
  );
}

const iconStyle = { marginRight: '20px', fontSize: '20px' };
