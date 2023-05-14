import Head from 'next/head';
import styles from '../app/styles/styles.module.css'

import SearchForm from '../components/SearchForm';

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
          <title>GitHub Search Repository</title>
          <meta name="description" content="GitHub Search Repository - Jan Sporek" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <main className={styles.main}>
        <div className={styles.hmpgDiv}> 
        <h1>GitHub Search Repository</h1>
         
        <SearchForm />
        
      </div>
    </main>
    </div>
  )
}
