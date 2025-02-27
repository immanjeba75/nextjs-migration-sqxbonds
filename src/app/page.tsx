
'use client';

import React from 'react';
import Button from 'react-bootstrap/Button';
export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Framework Test</h2>

          {/* Bootstrap component */}
          <Button variant="primary" className="me-2">Bootstrap Button</Button>

          {/* Tailwind styled button */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Tailwind Button
          </button>
        </div>
      </div>
    </div>
  );
}
