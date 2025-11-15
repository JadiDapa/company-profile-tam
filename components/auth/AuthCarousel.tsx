"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://media.istockphoto.com/id/2221152411/id/foto/penjaga-pria-keamanan-bekerja-di-ruang-kontrol-dengan-monitor-cctv-untuk-perlindungan-pusat.jpg?s=612x612&w=0&k=20&c=WzTODbj4XV86Qpq5boDdO02rbW4FfI1PViua8PyPkRE=",
    "https://media.istockphoto.com/id/2204624300/id/foto/kontrol-kualitas-kamera-ip-inspeksi-audit-produsen.jpg?s=612x612&w=0&k=20&c=zlUoiuq0doB5tJ5_ghCphfpa3VX3bLrOhfvTujjKXAM=",
    "https://media.istockphoto.com/id/2163457443/id/foto/perencanaan-konsep-konstruksi-dan-struktur-pertemuan-insinyur-atau-arsitek-untuk-proyek.jpg?s=612x612&w=0&k=20&c=H5Kw3845L9xihZ6PqJIhnC_3N2NxHLKxJFrbIzpMv4s=",
  ];

  const texts = [
    "Transform Ideas Into Scalable Solutions",
    "Innovate Without Limits, Build Without Boundaries",
    "Create Experiences That Inspire and Connect",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <aside className="absolute -z-50 h-full w-full overflow-hidden p-4 opacity-40 lg:relative lg:z-0 lg:block lg:opacity-100">
      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        {/* Logo */}
        <div className="absolute top-2 right-2 z-50 flex h-14 w-40">
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            className="object-contain object-center"
          />
        </div>

        <div className="bg-primary/20 absolute inset-0 h-full w-full object-cover" />

        {/* Image Carousel */}
        {images.map((src, index) => (
          <Image
            key={index}
            src={src || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            fill
            className={`absolute inset-0 -z-10 object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-4">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-1 w-20 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Text Carousel */}
        <div className="absolute bottom-32 left-32 text-center">
          {texts.map((text, index) => (
            <p
              key={index}
              className={`absolute w-120 text-3xl text-slate-100 transition-all duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}
