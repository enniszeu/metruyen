// app/truyen/[id]/chap/[chapId]/page.js

export const metadata = {
  title: 'Chi tiết chương',
  description: 'Hiển thị chi tiết chương của truyện',
};
import styles from './book.module.css'

export default async function ChapPage({ params }) {
  const { id, chapId } = params;

  // Gọi API để lấy dữ liệu
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chapter?url=${process.env.NEXT_PUBLIC_API_URL_IO}/${id}/${chapId}/`, { cache: 'no-store' });

  // Kiểm tra phản hồi từ API
  if (!res.ok) {
      return <div>Không thể tải dữ liệu.</div>; // Thông báo lỗi
  }

  const data = await res.json(); // Đọc dữ liệu JSON

  // Kiểm tra xem dữ liệu có tồn tại hay không
  const chapterContent = data?.chapter?.content || "Nội dung không có sẵn"; // Sử dụng || để đảm bảo có thông báo khi không có nội dung

  return (
      <div>
          <div>
              <h2>Chương {chapId}</h2>
          </div>

          {/* Render nội dung chương */}
          <div style={{ 
              background: '#f8eadd',
              borderRadius: '20px',
              boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
              padding: '20px 30px',
              flexGrow: 1,
              margin: '20px 10px'
           }} dangerouslySetInnerHTML={{ __html: chapterContent }} />
      </div>
  );
}

const iconStyle = { marginRight: '20px', fontSize: '20px' };
