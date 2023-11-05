'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import Head from 'next/head';
import GradientBG from '../components/GradientBG.js';
import styles from '@/styles/Home.module.css';



export default function Home() {
  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <>
      <Head>
        <title>Mina to Aptos</title>
        <meta name="description" content="built with o1js" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <GradientBG>
      <main className={styles.main}>
          <div className="flex h-screen">
              <div className={styles.card}>
                
                <div className={styles.line}>
                      <p>Mina Data: 0</p>

                      <Button className={styles.button} type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                        Increase!
                      </Button>
                </div>

                <div className={styles.line}>
                      <p>Aptos Data: 0</p>
                </div>
                
              
              </div>
            </div>
        </main>
      </GradientBG>
    </>
  );
}
