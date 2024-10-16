// app/truyen/[id]/chap/[chapId]/page.tsx

interface ChapterData {
  title: string;
  content: string;
}

interface ApiResponse {
  chapter: ChapterData;
}

export const metadata = {
  title: 'Chi tiết chương',
  description: 'Hiển thị chi tiết chương của truyện',
};

import styles from './book.module.css';

export default async function ChapPage({ params }: { params: { id: string; chapId: string } }) {
  const { id, chapId } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter?url=${process.env.NEXT_PUBLIC_API_URL_IO}/${id}/${chapId}/`, { cache: 'no-store' });

  if (!res.ok) {
    return <div>Không thể tải dữ liệu.</div>; 
  }

  const data: ApiResponse = await res.json(); // Đọc dữ liệu JSON và gán kiểu

  // Kiểm tra xem dữ liệu có tồn tại hay không
  const chapterContent = data?.chapter?.content || "Nội dung không có sẵn"; // Sử dụng || để đảm bảo có thông báo khi không có nội dung

  return (
    <div>
      <div>
        <h2>Chương {chapId}</h2>
      </div>

      {/* Render nội dung chương */}
      <div
        style={{
          background: '#f8eadd',
          borderRadius: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
          padding: '20px 30px',
          flexGrow: 1,
          margin: '20px 10px',
        }}
        dangerouslySetInnerHTML={{ __html: chapterContent }}
      />
    </div>
  );
}

const iconStyle = { marginRight: '20px', fontSize: '20px' };
