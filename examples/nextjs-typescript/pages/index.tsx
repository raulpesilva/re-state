import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ToDo } from '../components';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>re-state nextjs example</title>
        <meta name="description" content="re-state nextjs example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src="/logo.svg" alt="Re-state Logo" width="300px" height="300px" />
      <ToDo />
    </div>
  );
};

export default Home;
