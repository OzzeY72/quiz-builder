"use client";
import Link from 'next/link';
import styles from './button.module.css';

export default function Button({ title, href }: { title: string, href: string}) {
 return <Link href={ href } className={styles.button}>{title}</Link>;
}
