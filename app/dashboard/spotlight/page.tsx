'use client';

import { useState } from 'react';
//import SpotlightViewModal  from '@/components/spotlight/spotlight-view-modal';
  
export default function SpotlightSearchPage() {
    const [query, setQuery ] = useState('');
    const [open, setOpen ] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpen(true);
    }
    
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-4">Spotlight Page</h1>
              <form onSubmit={handleSubmit} className="flex space-x-2" >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Spotlight..."
                  className="border rounded px-3 py-2 w-64"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Search
                </button>
              </form>

              {/* <SpotlightViewModal open ={open} onClose={() => setOpen(false)} query={query} />     */}
        </div>
    );
}