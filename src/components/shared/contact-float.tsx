export function ContactFloat() {
  const items = [
    {
      href: "https://zalo.me/0234235345",
      label: "Chat Zalo",
      bg: "from-[#0a7cff] to-[#32a7ff]",
      shadow: "shadow-[0_18px_36px_rgba(10,124,255,0.35)]",
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M32 6c14.36 0 26 9.85 26 22s-11.64 22-26 22c-1.86 0-3.67-.17-5.4-.5L14 57l4.05-10.77C11.35 42.2 6 35.48 6 28 6 15.85 17.64 6 32 6Zm-11.12 12.8v5.27h12.5L19.92 40.74h23.2V35.5H29.63l13.45-16.7H20.88Z" />
        </svg>
      )
    },
    {
      href: "mailto:abcd@gmail.com",
      label: "Gửi email",
      bg: "from-[#ff6b57] to-[#ff8a3d]",
      shadow: "shadow-[0_18px_36px_rgba(255,107,87,0.32)]",
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true" className="h-5 w-5 fill-none stroke-current">
          <rect x="10" y="16" width="44" height="32" rx="8" strokeWidth="4" />
          <path d="m14 22 18 14 18-14" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-5 left-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:left-6">
      {items.map((item, index) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={item.label}
          className={`contact-float-spin group relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${item.bg} text-white ${item.shadow}`}
          style={{ animationDelay: `${index * 160}ms` }}
        >
          <span className="absolute inset-0 rounded-full bg-white/20 blur-[2px]" />
          <span className="contact-float-ping absolute inset-[-5px] rounded-full border-2 border-white/40" />
          <span className="relative z-10">{item.icon}</span>
          <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 hidden -translate-y-1/2 rounded-full bg-[#20120d] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:flex group-hover:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}
