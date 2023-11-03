'use client';

import React, { useState } from 'react';
import { Button } from 'antd';

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
    <div className="flex h-screen">
      <div className="m-auto w-72 sm:w-96 bg-white shadow-xl rounded-lg p-8">
        
        <div className="flex justify-between mb-2">
              <p>Mina Data: 0</p>

              <Button className='bg-blue-600' type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                Increase!
              </Button>
            
        </div>

        <div className="flex justify-between">
              <p>Aptos Data: 0</p>

            
        </div>
        
       
      </div>
    </div>
  )
}
