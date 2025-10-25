'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from '../styles/navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/image', label: 'Image' },
    { href: '/video', label: 'Video' },
    { href: '/upscale', label: 'Upscale' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoImageContainer}>
            <Image
              src="/assets/128x128.png"
              alt="NeonLights AI Logo"
              width={50}
              height={50}
              className={styles.logoImage}
              priority
            />
          </div>
          <span className={styles.logoText}>NEONLIGHTS AI</span>
        </Link>

        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.authSection}>
          <Link href="#" className="btn-outline btn-sm">
            Log In
          </Link>
          <div className={styles.profileAvatar}>
            <Image
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwKSIvPgo8cGF0aCBkPSJNMjAgMTBDMTYuNjg2MyAxMCAxNCAxMi42ODYzIDE0IDE2QzE0IDE5LjMxMzcgMTYuNjg2MyAyMiAyMCAyMkMyMy4zMTM3IDIyIDI2IDE5LjMxMzcgMjYgMTZDMjYgMTIuNjg2MyAyMy4zMTM3IDEwIDIwIDEwWiIgZmlsbD0iIzAwZmZmZiIvPgo8cGF0aCBkPSJNMjAgMjRDMTQuNDc3MiAyNCAxMCAyOC40NzcyIDEwIDM0SDMwQzMwIDI4LjQ3NzIgMjUuNTIyOCAyNCAyMCAyNFoiIGZpbGw9IiMwMGZmZmYiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQwIiB4MT0iMCIgeTE9IjAiIHgyPSI0MCIgeTI9IjQwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMGZmZmYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmYwMGZmIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
              alt="Profile"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
