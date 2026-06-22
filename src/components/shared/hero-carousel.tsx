"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/banner/banner1.png",
    alt: "Banner tài khoản số và dịch vụ online"
  },
  {
    src: "/banner/banner2.png",
    alt: "Banner công cụ AI và phần mềm sáng tạo"
  },
  {
    src: "/banner/banner3.png",
    alt: "Banner giải trí đa dạng"
  },
  {
    src: "/banner/banner4.png",
    alt: "Banner bảo mật và VPN"
  }
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  function showPreviousSlide() {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNextSlide() {
    setActiveIndex((current) => (current + 1) % slides.length);
  }

  return (
    <div className="relative overflow-hidden rounded-[40px] border border-[#ead7ff] bg-[linear-gradient(135deg,#f7f9ff_0%,#fff5fb_45%,#f7fffb_100%)] shadow-[0_30px_90px_rgba(111,78,255,0.10)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#ff6db5_0%,#7c5cff_50%,#4ab8ff_100%)]" />

      <div className="relative aspect-[16/6] min-h-[260px] w-full overflow-hidden md:min-h-[360px]">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-all duration-700 ${
              index === activeIndex
                ? "translate-x-0 opacity-100"
                : index < activeIndex
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
            }`}
          >
            <Image src={slide.src} alt={slide.alt} fill className="object-cover" priority={index === 0} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,35,0.08)_0%,rgba(17,17,35,0)_45%,rgba(17,17,35,0.04)_100%)]" />
          </div>
        ))}

        <button
          type="button"
          aria-label="Banner trước"
          onClick={showPreviousSlide}
          className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-2xl leading-none text-white md:flex"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Banner tiếp theo"
          onClick={showNextSlide}
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-2xl leading-none text-white md:flex"
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Chuyển tới banner ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-3 rounded-full transition-all ${index === activeIndex ? "w-10 bg-white shadow" : "w-3 bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
