interface ChapterImage {
  image_file: string; // Filename of the image
  // Add other relevant properties if they exist, e.g.:
  // image_url?: string; // If the API provides a full URL
}

interface ChapterItem {
  chapter_image: ChapterImage[]; // Array of ChapterImage
  chapter_path: string; // Path where the images are stored
  chapter_title?: string; // Assuming there is a title for the chapter
  // Add other properties as needed, such as content or description
}

interface ApiResponse {
  data: {
    item: ChapterItem; // The item structure
  };
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

  // Handle cases where chapter_image might be undefined
  if (!data?.item?.chapter_image) {
    return <div>Không có hình ảnh cho chương này.</div>;
  }

  return (
    <div>
      <h1>{data.item.chapter_title}</h1> {/* Assuming chapter_title exists in response */}
      
      {/* Render nội dung chương */}
      <div>
        {data.item.chapter_image.map((image: ChapterImage, index: number) => (
          <img
            key={index}
            src={`https://sv1.otruyencdn.com/${data.item.chapter_path}/${image.image_file}`}
            alt={`Chương ${index + 1}`}
            className={styles.chapterImage}
          />
        ))}
      </div>
    </div>
  );
}

const iconStyle = { marginRight: '20px', fontSize: '20px' };
