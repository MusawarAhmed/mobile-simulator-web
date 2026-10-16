'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Device } from '@/types/device';
import { Search, Smartphone, Tablet, Laptop, ExternalLink, Download } from 'lucide-react';

interface DeviceCatalogProps {
  initialDevices: Device[];
}

export default function DeviceCatalog({ initialDevices }: DeviceCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Devices (77)' },
    { id: 'apple', label: 'Apple iPhone' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'google', label: 'Google Pixel' },
    { id: 'tablet', label: 'Tablets' },
    { id: 'computer', label: 'Laptops / Desktops' },
    { id: 'others', label: 'Foldables & Smart TV' }
  ];

  const filteredDevices = useMemo(() => {
    return initialDevices.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.brand.toLowerCase().includes(search.toLowerCase()) ||
        d.slug.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'apple') return d.brand === 'apple' && d.category === 'smartphone';
      if (selectedCategory === 'samsung') return d.brand === 'samsung';
      if (selectedCategory === 'google') return d.brand === 'google';
      if (selectedCategory === 'tablet') return d.category === 'tablet';
      if (selectedCategory === 'computer') return d.category === 'computer';
      if (selectedCategory === 'others') return d.category === 'others' || d.category === 'foldable';
      return true;
    });
  }, [initialDevices, search, selectedCategory]);

  return (
    <div id="catalog" className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore 77+ Simulated Viewports & Frames
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            View accurate CSS viewports, physical resolutions, user agents, and download free PNG mockups.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search iPhone 18, Pixel, Galaxy..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === c.id
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDevices.map((dev) => (
          <div
            key={dev.slug}
            className="group relative bg-slate-900/90 border border-slate-800/80 hover:border-sky-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1"
          >
            {/* Image Thumbnail Container */}
            <div className="relative w-full h-52 mb-4 bg-slate-950/60 rounded-xl p-3 flex items-center justify-center overflow-hidden border border-slate-900">
              <div className="relative w-36 h-48 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={`/devices/${dev.slug}/device.png`}
                  alt={`${dev.name} mockup transparent frame`}
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  loading="lazy"
                />
              </div>
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                {dev.devicePixelRatio}x DPR
              </span>
            </div>

            {/* Info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                  {dev.brand}
                </span>
                {dev.release_year && (
                  <span className="text-[10px] text-slate-500">
                    • {dev.release_year}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
                {dev.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {dev.viewport.width} × {dev.viewport.height} px
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
              <Link
                href={`/devices/${dev.slug}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium transition-colors"
              >
                <span>Specs</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href={`/mockups/${dev.slug}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Mockup</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-base">No devices found matching &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}
