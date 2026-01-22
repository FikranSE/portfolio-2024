import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ColorTags,
  GradientText,
  Section,
  Tags,
} from 'astro-boilerplate-components';

type ProjectMediaItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; title: string };

type ProjectKind = 'web' | 'mobile';

type Project = {
  title: string;
  description: string;
  technologies: Array<{ name: string; color: any }>;
  imageUrl: string;
  imageAlt: string;
  media?: ProjectMediaItem[];
  kind: ProjectKind;
  link?: string;
  sourceLink?: string;
  isPrivate?: boolean;
};

const LockIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="h-4 w-4"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const BrowserFrame = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="flex-1">
        <div className="h-7 rounded-lg bg-white border border-gray-200 px-3 text-xs text-gray-500 flex items-center overflow-hidden">
          <span className="truncate">{title}</span>
        </div>
      </div>
    </div>
    <div className="bg-gray-100">
      <div className="aspect-video w-full">{children}</div>
    </div>
  </div>
);

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[360px]">
    <div className="rounded-[2.25rem] border border-gray-200 bg-white shadow-sm p-3">
      <div className="rounded-[1.75rem] bg-black overflow-hidden">
        <div className="relative">
          <div className="absolute left-1/2 top-2 -translate-x-1/2 h-6 w-28 rounded-full bg-black/60 backdrop-blur" />
          <div className="aspect-[9/19] w-full bg-gray-100">{children}</div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectMedia = ({ imageUrl, imageAlt, media }: { imageUrl: string; imageAlt: string; media?: ProjectMediaItem[] }) => {
  const mediaItems: ProjectMediaItem[] = useMemo(
    () => (media && media.length > 0 ? media : [{ type: 'image', src: imageUrl, alt: imageAlt }]),
    [imageAlt, imageUrl, media]
  );

  const preferredStartIndex = useMemo(() => {
    const firstImageIndex = mediaItems.findIndex((item) => item.type === 'image');
    return firstImageIndex >= 0 ? firstImageIndex : 0;
  }, [mediaItems]);

  const [activeIndex, setActiveIndex] = useState(preferredStartIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasGallery = mediaItems.length > 1;

  const firstItem = mediaItems[0];
  if (!firstItem) {
    return null;
  }

  const currentItem = mediaItems[Math.min(Math.max(activeIndex, 0), mediaItems.length - 1)] ?? firstItem;

  const goPrev = useCallback(() => {
    if (mediaItems.length <= 1) {
      return;
    }
    setActiveIndex((i) => (i - 1 + mediaItems.length) % mediaItems.length);
  }, [mediaItems.length]);

  const goNext = useCallback(() => {
    if (mediaItems.length <= 1) {
      return;
    }
    setActiveIndex((i) => (i + 1) % mediaItems.length);
  }, [mediaItems.length]);

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  const openLightboxFromEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openLightbox();
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  useEffect(() => {
    setActiveIndex(preferredStartIndex);
  }, [preferredStartIndex]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
      if (e.key === 'ArrowLeft') {
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeLightbox, goNext, goPrev, isLightboxOpen]);

  if (!hasGallery) {
    return (
      <div className="relative w-full h-full group">
        <button
          type="button"
          className="relative w-full h-full"
          onClick={openLightboxFromEvent}
        >
          {firstItem.type === 'video' ? (
            <video
              controls
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none"
              src={firstItem.src}
              title={firstItem.title}
            />
          ) : (
            <img
              src={firstItem.src}
              alt={firstItem.alt}
              className="w-full h-full object-cover"
            />
          )}
        </button>
        

      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-full">
        {currentItem.type === 'video' ? (
          <button
            type="button"
            className="relative w-full h-full"
            onClick={openLightboxFromEvent}
          >
            <video
              controls
              preload="metadata"
              className="w-full h-full object-cover pointer-events-none"
              src={currentItem.src}
              title={currentItem.title}
            />
          </button>
        ) : (
          <button
            type="button"
            className="relative w-full h-full"
            onClick={openLightboxFromEvent}
          >
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="w-full h-full object-cover"
            />
          </button>
        )}



        <div className="absolute inset-y-0 left-3 flex items-center">
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goPrev();
            }}
            className="h-9 w-9 rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm backdrop-blur hover:bg-white"
          >
            <span className="text-lg leading-none">‹</span>
          </button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goNext();
            }}
            className="h-9 w-9 rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm backdrop-blur hover:bg-white"
          >
            <span className="text-lg leading-none">›</span>
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs text-gray-600 shadow-sm">
            <span className="uppercase tracking-widest">{activeIndex + 1} / {mediaItems.length}</span>
          </div>
        </div>
      </div>

      {isLightboxOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80"
          onMouseDown={closeLightbox}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-6xl"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute -top-12 right-0 h-10 w-10 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/60"
                onClick={closeLightbox}
              >
                <span className="text-xl leading-none">×</span>
              </button>

              <div className="relative overflow-hidden rounded-2xl bg-black/40 shadow-2xl border border-white/10 backdrop-blur">
                <div className="flex items-center justify-center w-full max-h-[85vh]">
                  {currentItem.type === 'video' ? (
                    <video
                      controls
                      preload="metadata"
                      className="max-h-[85vh] max-w-[92vw] w-auto h-auto object-contain bg-black"
                      src={currentItem.src}
                      title={currentItem.title}
                    />
                  ) : (
                    <img
                      src={currentItem.src}
                      alt={currentItem.alt}
                      className="max-h-[85vh] max-w-[92vw] w-auto h-auto object-contain bg-black"
                    />
                  )}
                </div>

                {hasGallery && (
                  <div className="absolute inset-x-0 bottom-4 px-4">
                    <div className="mx-auto w-full max-w-4xl rounded-xl border border-white/10 bg-black/40 backdrop-blur p-2">
                      <div className="flex gap-2 overflow-x-auto">
                        {mediaItems.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            aria-label={`Open item ${index + 1}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveIndex(index);
                            }}
                            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border ${
                              index === activeIndex ? 'border-white' : 'border-white/20'
                            }`}
                          >
                            {item.type === 'video' ? (
                              <div className="flex h-full w-full items-center justify-center bg-black/60 text-white text-xs">
                                Video
                              </div>
                            ) : (
                              <img
                                src={item.src}
                                alt={item.alt}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-y-0 left-3 flex items-center">
                  <button
                    type="button"
                    aria-label="Previous"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="h-10 w-10 rounded-full border border-white/20 bg-black/40 text-white shadow-sm backdrop-blur hover:bg-black/60"
                  >
                    <span className="text-xl leading-none">‹</span>
                  </button>
                </div>
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <button
                    type="button"
                    aria-label="Next"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goNext();
                    }}
                    className="h-10 w-10 rounded-full border border-white/20 bg-black/40 text-white shadow-sm backdrop-blur hover:bg-black/60"
                  >
                    <span className="text-xl leading-none">›</span>
                  </button>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center">
                  <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                    <span className="uppercase tracking-widest">{activeIndex + 1} / {mediaItems.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const ProjectCard = ({
  title,
  description,
  technologies,
  imageUrl,
  imageAlt,
  media,
  kind,
  reverse = false,
  link,
  sourceLink,
  isPrivate,
}: {
  title: string;
  description: string;
  technologies: Array<{ name: string; color: any }>;
  imageUrl: string;
  imageAlt: string;
  media?: ProjectMediaItem[];
  kind: ProjectKind;
  reverse?: boolean;
  link?: string;
  sourceLink?: string;
  isPrivate?: boolean;
}) => {
  return (

    <div className={`group w-full flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
      <div className="w-full md:w-1/2 perspective-1000">
        <div className="transform transition-all duration-500 ease-in-out group-hover:scale-[1.02] group-hover:-rotate-1">
          {kind === 'web' ? (
            <BrowserFrame title={title}>
              <ProjectMedia imageUrl={imageUrl} imageAlt={imageAlt} media={media} />
            </BrowserFrame>
          ) : (
            <PhoneFrame>
              <ProjectMedia imageUrl={imageUrl} imageAlt={imageAlt} media={media} />
            </PhoneFrame>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
              kind === 'web' 
                ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                : 'bg-purple-50 text-purple-600 border border-purple-100'
            }`}>
              {kind === 'web' ? 'Web Application' : 'Mobile Application'}
            </span>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-5 mb-8">
          {link && (
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Download</span>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-gray-200"
              >
                <img 
                  src="/assets/images/google-play.png" 
                  alt="Get it on Google Play" 
                  className="h-11 w-auto object-contain" 
                />
              </a>
            </div>
          )}

          {sourceLink && (
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Explore Code</span>
              <a 
                href={sourceLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <GithubIcon />
                <span>Source Code</span>
              </a>
            </div>
          )}

          {isPrivate && (
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Source Code</span>
              <div className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed border border-gray-200">
                <LockIcon />
                <span>Private Repository</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
          {technologies.map((tech, index) => (
            <Tags key={index} color={tech.color}>{tech.name}</Tags>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectList = () => {
  const projects: Project[] = [
    {
      title: "Personal Brand AI",
      description: "An intelligent platform for personal branding automation. Features include AI-driven content workflows, multi-platform social connections, and a dedicated creative studio.",
      kind: 'web',
      technologies: [
        { name: "Next.js", color: ColorTags.VIOLET },
        { name: "TypeScript", color: ColorTags.BLUE },
        { name: "Supabase", color: ColorTags.YELLOW },
        { name: "Google AI", color: ColorTags.EMERALD },
        { name: "Shotstack", color: ColorTags.ORANGE },
        { name: "Ayrshare", color: ColorTags.INDIGO },
      ],
      imageUrl: "/assets/personal-brand-ai/home.png",
      imageAlt: "Personal Brand AI",
      media: [
        { type: 'video', src: "/assets/personal-brand-ai/personalBrandAi.mp4", title: "Personal Brand AI - Walkthrough" },
        { type: 'image', src: "/assets/personal-brand-ai/home.png", alt: "Personal Brand AI - Home" },
        { type: 'image', src: "/assets/personal-brand-ai/workflow.png", alt: "Personal Brand AI - Workflow" },
        { type: 'image', src: "/assets/personal-brand-ai/uploadPage.png", alt: "Personal Brand AI - Upload" },
        { type: 'image', src: "/assets/personal-brand-ai/AIStudioEditor.png", alt: "Personal Brand AI - Studio Editor" },
      ],
      sourceLink: "https://github.com/FikranSE/personal-brand-ai",
    },
    {
      title: "Bebo Games",
      description: "A comprehensive mobile game platform featuring interactive maps, campaign systems, rewards, leaderboards, and a fully customizable avatar system. Built for high performance and smooth animations.",
      kind: 'mobile',
      technologies: [
        { name: "React Native", color: ColorTags.FUCHSIA },
        { name: "Redux", color: ColorTags.VIOLET },
        { name: "Rive & Lottie", color: ColorTags.ROSE },
        { name: "Matter.js", color: ColorTags.YELLOW },
        { name: "Game Engine", color: ColorTags.EMERALD },
      ],
      imageUrl: "/assets/bebo-games/home.png",
      imageAlt: "Bebo Games",
      media: [
        { type: 'image', src: "/assets/bebo-games/home.png", alt: "Bebo Games - Home" },
        { type: 'image', src: "/assets/bebo-games/gameplay.png", alt: "Bebo Games - Gameplay" },
        { type: 'image', src: "/assets/bebo-games/mapsGame.png", alt: "Bebo Games - Maps" },
        { type: 'image', src: "/assets/bebo-games/leaderboard.png", alt: "Bebo Games - Leaderboard" },
        { type: 'image', src: "/assets/bebo-games/kustomAvatar.png", alt: "Bebo Games - Avatar" },
      ],
      link: "https://play.google.com/store/apps/details?id=com.bebogames.marventurevr&pcampaignid=web_share",
    },
    {
      title: "Hierarchical Menu Tree System",
      description: "A high-performance recursive menu management system. Features unlimited nesting depth, drag-and-drop reordering, and efficient closure table storage pattern for optimized database queries.",
      kind: 'web',
      technologies: [
        { name: "Go (Gin)", color: ColorTags.CYAN },
        { name: "GORM", color: ColorTags.EMERALD },
        { name: "MySQL", color: ColorTags.BLUE },
        { name: "Next.js", color: ColorTags.VIOLET },
        { name: "TypeScript", color: ColorTags.INDIGO },
        { name: "Tailwind", color: ColorTags.SKY },
      ],
      imageUrl: "/assets/hierarcy/1.png",
      imageAlt: "Hierarchical Menu System",
      media: [
        { type: 'image', src: "/assets/hierarcy/1.png", alt: "Hierarchical Menu - Dashboard" },
        { type: 'image', src: "/assets/hierarcy/2.png", alt: "Hierarchical Menu - Tree View" },
        { type: 'image', src: "/assets/hierarcy/3.png", alt: "Hierarchical Menu - Edit Mode" },
        { type: 'image', src: "/assets/hierarcy/4.png", alt: "Hierarchical Menu - Drag & Drop" },
        { type: 'image', src: "/assets/hierarcy/5.png", alt: "Hierarchical Menu - JSON Output" },
        { type: 'image', src: "/assets/hierarcy/6.png", alt: "Hierarchical Menu - API Response" },
      ],
      sourceLink: "#", 
    },
    {
      title: "PDAM Mobile Payment",
      description: "A robust utility payment application featuring real-time billing, multiple payment gateway integrations, and history tracking. focused on secure transaction processing and ease of use.",
      kind: 'mobile',
      technologies: [
        { name: "React Native", color: ColorTags.CYAN },
        { name: "React Query", color: ColorTags.RED },
        { name: "Midtrans TS", color: ColorTags.BLUE },
        { name: "TypeScript", color: ColorTags.ORANGE }
      ],
      imageUrl: "/assets/pdam/home.png",
      imageAlt: "PDAM Mobile App",
      media: [
        { type: 'image', src: "/assets/pdam/home.png", alt: "PDAM - Home" },
        { type: 'image', src: "/assets/pdam/login.png", alt: "PDAM - Login" },
        { type: 'image', src: "/assets/pdam/beliToken.png", alt: "PDAM - Beli Token" },
        { type: 'image', src: "/assets/pdam/detailPembelian.png", alt: "PDAM - Detail Pembelian" },
        { type: 'image', src: "/assets/pdam/detail.png", alt: "PDAM - Detail" },
      ],
      sourceLink: "https://github.com/FikranSE/Mobile-app-meter-air-react-native",
    },
    {
      title: "Dompet Suara",
      description: "A voice-activated financial management app featuring expense tracking, budgeting flows, and recurring bill management with a focus on accessibility and user experience.",
      kind: 'mobile',
      technologies: [
        { name: "Flutter", color: ColorTags.SKY },
        { name: "Dart", color: ColorTags.BLUE },
        { name: "Riverpod", color: ColorTags.INDIGO },
        { name: "MySQL", color: ColorTags.CYAN },
      ],
      imageUrl: "/assets/dompet-suara/home.png",
      imageAlt: "Dompet Suara",
      media: [
        { type: 'image', src: "/assets/dompet-suara/home.png", alt: "Dompet Suara - Home" },
        { type: 'image', src: "/assets/dompet-suara/budget.png", alt: "Dompet Suara - Budget" },
        { type: 'image', src: "/assets/dompet-suara/pemasukan.png", alt: "Dompet Suara - Pemasukan" },
        { type: 'image', src: "/assets/dompet-suara/pengeluaran.png", alt: "Dompet Suara - Pengeluaran" },
        { type: 'image', src: "/assets/dompet-suara/tagihanRutin.png", alt: "Dompet Suara - Tagihan Rutin" },
      ],
      sourceLink: "#",
    },
    {
      title: "Supir Angkot",
      description: "A dedicated driver companion app optimizing urban mobility. Features real-time route tracking, trip history analytics, and performance monitoring.",
      kind: 'mobile',
      technologies: [
        { name: "React Native", color: ColorTags.FUCHSIA },
        { name: "Socket.io", color: ColorTags.ORANGE },
        { name: "GPS Device", color: ColorTags.YELLOW },
        { name: "Google Maps", color: ColorTags.VIOLET },
      ],
      imageUrl: "/assets/supir-angkot/home.png",
      imageAlt: "Supir Angkot",
      media: [
        { type: 'image', src: "/assets/supir-angkot/home.png", alt: "Supir Angkot - Home" },
        { type: 'image', src: "/assets/supir-angkot/menus.png", alt: "Supir Angkot - Menus" },
        { type: 'image', src: "/assets/supir-angkot/historyPerjalanan.png", alt: "Supir Angkot - History" },
        { type: 'image', src: "/assets/supir-angkot/detailTempuh.png", alt: "Supir Angkot - Detail Tempuh" },
        { type: 'image', src: "/assets/supir-angkot/login.png", alt: "Supir Angkot - Login" },
      ],
      link: "https://play.google.com/store/apps/details?id=com.eiges_angkot&pcampaignid=web_share",
    },
    {
      title: "Corporate Booking System",
      description: "An enterprise-grade internal app for managing meeting rooms and transport fleets. Features calendar syncing, conflict detection, and admin approval workflows.",
      kind: 'mobile',
      technologies: [
        { name: "React Native", color: ColorTags.VIOLET },
        { name: "Next.js", color: ColorTags.SLATE },
        { name: "Tailwind", color: ColorTags.SKY },
        { name: "Express.js", color: ColorTags.GRAY },
        { name: "REST API", color: ColorTags.INDIGO }
      ],
      imageUrl: "/assets/booking-system/homeMobile.png",
      imageAlt: "Booking App",
      media: [
        { type: 'image', src: "/assets/booking-system/homeMobile.png", alt: "Booking System - Home Mobile" },
        { type: 'image', src: "/assets/booking-system/exploreMobile.png", alt: "Booking System - Explore" },
        { type: 'image', src: "/assets/booking-system/detailRoomMobile.png", alt: "Booking System - Detail Room" },
        { type: 'image', src: "/assets/booking-system/bookingRoom.png", alt: "Booking System - Booking Room" },
        { type: 'image', src: "/assets/booking-system/statusBooking.png", alt: "Booking System - Status Booking" },
        { type: 'image', src: "/assets/booking-system/reschedule.png", alt: "Booking System - Reschedule" },
        { type: 'image', src: "/assets/booking-system/rescheduleForm.png", alt: "Booking System - Reschedule Form" },
        { type: 'image', src: "/assets/booking-system/selectShift.png", alt: "Booking System - Select Shift" },
        { type: 'image', src: "/assets/booking-system/loginAdmin.png", alt: "Booking System - Login Admin" },
        { type: 'image', src: "/assets/booking-system/dashboardAdmin.png", alt: "Booking System - Dashboard Admin" },
        { type: 'image', src: "/assets/booking-system/roomDetailAdmin.png", alt: "Booking System - Room Detail Admin" },
        { type: 'image', src: "/assets/booking-system/bookingManageAdmin.png", alt: "Booking System - Manage Admin" },
        { type: 'image', src: "/assets/booking-system/detailBookingAdminSide.png", alt: "Booking System - Detail Admin" },
        { type: 'image', src: "/assets/booking-system/notifPageAdmin.png", alt: "Booking System - Notifications" },
        { type: 'image', src: "/assets/booking-system/addRoom.png", alt: "Booking System - Add Room" },
      ],
      sourceLink: "http://github.com/FikranSE/BookingApp-using-React-Native-MySQL",
    },
    {
      title: "E-Procurement System Enhancement",
      description: "Led the scalability overhaul of PT Geo Dipa Energi's procurement system. Focused on optimizing database queries, containerizing services, and enhancing the frontend interface for better vendor management.",
      kind: 'web',
      technologies: [
        { name: "React.js", color: ColorTags.CYAN },
        { name: "Node.js", color: ColorTags.LIME },
        { name: "Docker", color: ColorTags.BLUE },
        { name: "Metronic UI", color: ColorTags.INDIGO }
      ],
      imageUrl: "/assets/eprocurement/login.jpeg",
      imageAlt: "E-Procurement System",
      media: [
        { type: 'image', src: "/assets/eprocurement/login.jpeg", alt: "E-Procurement - Login" },
        { type: 'image', src: "/assets/eprocurement/listKontrak.png", alt: "E-Procurement - List Kontrak" },
        { type: 'image', src: "/assets/eprocurement/formPermohonan.png", alt: "E-Procurement - Form Permohonan" },
      ],
      isPrivate: true,
    },
    {
      title: "ABM Investama Dashboard",
      description: "Engineered high-performance data visualization dashboards with complex clustering algorithms. Implemented secure multi-tenant data filtering and real-time reporting capabilities.",
      kind: 'web',
      technologies: [
        { name: "CodeIgniter", color: ColorTags.ORANGE },
        { name: "Highcharts", color: ColorTags.PURPLE },
        { name: "MySQL", color: ColorTags.BLUE },
        { name: "Bootstrap 4", color: ColorTags.VIOLET }
      ],
      imageUrl: "/assets/images/abm.jpeg",
      imageAlt: "ABM Dashboard",
      isPrivate: true,
    },
    {
      title: "Adhi Karya 360 Assessment",
      description: "Revamped the 'Akhlak' moral assessment system for 1000+ employees. Modernized the legacy codebase to improve reliability and created a responsive grading interface for easier HR evaluations.",
      kind: 'web',
      technologies: [
        { name: "Yii Framework", color: ColorTags.LIME },
        { name: "PostgreSQL", color: ColorTags.BLUE },
        { name: "jQuery", color: ColorTags.AMBER },
        { name: "Apache", color: ColorTags.RED }
      ],
      imageUrl: "/assets/images/adhi.jpeg",
      imageAlt: "Adhi Karya Project",
      isPrivate: true,
    },
    {
      title: "Unand Spatial Digital Map",
      description: "Architected a GIS-based digital mapping solution for campus infrastructure. Integrated diverse spatial data layers and provided interactive tools for facility management.",
      kind: 'web',
      technologies: [
        { name: "CodeIgniter 4", color: ColorTags.ORANGE },
        { name: "Leaflet.js", color: ColorTags.GREEN },
        { name: "GeoJSON", color: ColorTags.YELLOW },
        { name: "PostGIS", color: ColorTags.BLUE }
      ],
      imageUrl: "/assets/images/digitasi.jpg",
      imageAlt: "Digital Map",
      isPrivate: true,
    },
  ];

  return (
    <Section
      title={
        <>
          Recent <GradientText>Projects</GradientText>
        </>
      }
    >
      <div className="flex flex-col gap-24 py-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </Section>
  );
};

export { ProjectList };