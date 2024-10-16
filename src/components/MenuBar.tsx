// components/MenuBar.tsx
import Link from 'next/link';
import styles from './MenuBar.module.css'; // Nếu bạn sử dụng CSS module

const MenuBar: React.FC = () => {
  return (
    <nav className={styles.menuBar}>
      <div className={styles.logo}>
        <h2>me truuyen</h2>
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
