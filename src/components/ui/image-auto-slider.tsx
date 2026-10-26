"use client";

import React, { useId } from "react";

export interface ImageAutoSliderItem {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ImageAutoSliderProps {
  /** Array of image items or string URLs */
  items?: (ImageAutoSliderItem | string)[];
  /** Animation duration for one full loop cycle in seconds. Default: 32s */
  speedSeconds?: number;
  /** Pause movement on mouse hover. Default: true */
  pauseOnHover?: boolean;
  className?: string;
}

// Provided Unsplash demo image references for development preview
export const DEMO_SLIDER_IMAGES: ImageAutoSliderItem[] = [
  {
    src: "https://cdn.21st.dev/assets/mirror/0b/0b2eee3635f20ec932fa27ae8db24eb760045aee6dd53c6cd05b01799761b6fb.jpg",
    alt: "Event moment 1",
    caption: "Hands-on cloud architecture workshop",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/a0/a0e1a6affa10f9d1304e1ec7a0a074efa2e5befddbe5f55ec1674ca4606a7272.jpg",
    alt: "Event moment 2",
    caption: "Collaborative builder sessions",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/c5/c50a953b2534eeb024de5eb84901abda556e6a8faa74bb6c13983557f14f02e2.jpg",
    alt: "Event moment 3",
    caption: "Live demonstrations & Q&A",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/2c/2c3bda48c0009be1f143cfed1b28a012de388bcd39d662df550ec1d28966b864.jpg",
    alt: "Event moment 4",
    caption: "Peer code reviews & mentorship",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/df/df5b37ca7d83d93ddbece6430932d006f89d70704f4cf14c91bc724b9653ec9f.jpg",
    alt: "Event moment 5",
    caption: "Deep dive into Bedrock & Generative AI",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/fe/fe0e5e4058e6fc722507077aa70c1e0fd48ee254ab0bae5512902dc6729ff155.jpg",
    alt: "Event moment 6",
    caption: "Final project presentations",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/6f/6ff6818c9f0e9b6b28eb7f16f650538626b00cf3b10c36eac6840d280c799636.jpg",
    alt: "Event moment 7",
    caption: "Builder community networking",
  },
  {
    src: "https://cdn.21st.dev/assets/mirror/97/971ee8523c7efc71ed5323f0b7c386b7b09dde6af9bae9bedd7288ca7a787b40.jpg",
    alt: "Event moment 8",
    caption: "Team sprint milestones",
  },
];

export default function ImageAutoSlider({
  items,
  speedSeconds = 30,
  pauseOnHover = true,
  className = "",
}: ImageAutoSliderProps) {
  const uniqueId = useId().replace(/:/g, "_");

  // Normalize items to { src, alt, caption }
  const normalized: ImageAutoSliderItem[] = React.useMemo(() => {
    if (!items || items.length === 0) return [];
    return items.map((item, idx) => {
      if (typeof item === "string") {
        return {
          src: item,
          alt: `Event photo ${idx + 1}`,
        };
      }
      return {
        src: item.src,
        alt: item.alt || `Event photo ${idx + 1}`,
        caption: item.caption,
      };
    });
  }, [items]);

  if (normalized.length === 0) {
    return null;
  }

  // If only 1 image exists, render as a static hero-style showcase without infinite loop
  if (normalized.length === 1) {
    const single = normalized[0];
    return (
      <div className={`w-full flex justify-center py-6 ${className}`}>
        <div className="relative max-w-xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
          <img
            src={single.src}
            alt={single.alt || "Event photograph"}
            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {single.caption && (
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-sm text-white/90 font-medium">
              {single.caption}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Duplicate items for seamless continuous looping
  const duplicated = [...normalized, ...normalized];

  const animationName = `auto-scroll-${uniqueId}`;

  return (
    <div className={`relative w-full overflow-hidden py-4 ${className}`}>
      {/* Component-scoped animation styles */}
      <style
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes ${animationName} {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .slider-track-${uniqueId} {
            display: flex;
            width: max-content;
            animation: ${animationName} ${speedSeconds}s linear infinite;
            will-change: transform;
          }

          ${
            pauseOnHover
              ? `.slider-track-${uniqueId}:hover { animation-play-state: paused; }`
              : ""
          }

          .slider-mask-${uniqueId} {
            mask: linear-gradient(
              90deg,
              transparent 0%,
              rgba(0,0,0,1) 8%,
              rgba(0,0,0,1) 92%,
              transparent 100%
            );
            -webkit-mask: linear-gradient(
              90deg,
              transparent 0%,
              rgba(0,0,0,1) 8%,
              rgba(0,0,0,1) 92%,
              transparent 100%
            );
          }

          .slider-card-${uniqueId} {
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease, border-color 0.3s ease;
          }

          .slider-card-${uniqueId}:hover {
            transform: scale(1.04) translateY(-2px);
            filter: brightness(1.1);
            border-color: rgba(255, 153, 0, 0.4);
            z-index: 10;
          }

          @media (prefers-reduced-motion: reduce) {
            .slider-track-${uniqueId} {
              animation: none !important;
              overflow-x: auto;
              width: 100%;
            }
          }
        `,
        }}
      />

      {/* Slider Viewport with Edge Fade Masks */}
      <div className={`slider-mask-${uniqueId} w-full overflow-hidden`}>
        <div className={`slider-track-${uniqueId} flex gap-5 py-4 px-2`}>
          {duplicated.map((item, idx) => (
            <div
              key={`${uniqueId}-img-${idx}`}
              className={`slider-card-${uniqueId} group relative flex-shrink-0 w-64 h-52 sm:w-72 sm:h-56 md:w-80 md:h-64 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl cursor-pointer`}
            >
              <img
                src={item.src}
                alt={item.alt || `Event moment ${(idx % normalized.length) + 1}`}
                className="w-full h-full object-cover select-none"
                loading="lazy"
                draggable={false}
              />

              {/* Ambient bottom caption overlay */}
              {item.caption && (
                <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-90 transition-opacity group-hover:opacity-100 flex items-end">
                  <p className="text-xs sm:text-sm text-white/90 font-medium line-clamp-2 m-0 drop-shadow">
                    {item.caption}
                  </p>
                </div>
              )}

              {/* Subtle top-right AWS SBG brand indicator on hover */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold uppercase bg-black/60 backdrop-blur-md text-[#FF9900] border border-[#FF9900]/30">
                  Moment #{(idx % normalized.length) + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component export alias for compatibility with provided snippet
export { ImageAutoSlider as Component };

export interface CardAutoSliderProps {
  children: React.ReactNode[];
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function CardAutoSlider({
  children,
  speedSeconds = 35,
  pauseOnHover = true,
  className = "",
}: CardAutoSliderProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const count = React.Children.count(children);

  if (count === 0) return null;

  // For 1 or 2 cards, display directly without infinite loop
  if (count <= 2) {
    return (
      <div className={`flex flex-wrap gap-6 justify-center py-4 ${className}`}>
        {children}
      </div>
    );
  }

  const childArray = React.Children.toArray(children);
  const duplicated = [...childArray, ...childArray];
  const animationName = `card-scroll-${uniqueId}`;

  return (
    <div className={`relative w-full overflow-hidden py-4 ${className}`}>
      <style
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes ${animationName} {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .card-track-${uniqueId} {
            display: flex;
            width: max-content;
            animation: ${animationName} ${speedSeconds}s linear infinite;
            will-change: transform;
          }

          ${
            pauseOnHover
              ? `.card-track-${uniqueId}:hover { animation-play-state: paused; }`
              : ""
          }

          .card-mask-${uniqueId} {
            mask: linear-gradient(
              90deg,
              transparent 0%,
              rgba(0,0,0,1) 6%,
              rgba(0,0,0,1) 94%,
              transparent 100%
            );
            -webkit-mask: linear-gradient(
              90deg,
              transparent 0%,
              rgba(0,0,0,1) 6%,
              rgba(0,0,0,1) 94%,
              transparent 100%
            );
          }

          @media (prefers-reduced-motion: reduce) {
            .card-track-${uniqueId} {
              animation: none !important;
              overflow-x: auto;
              width: 100%;
            }
          }
        `,
        }}
      />

      <div className={`card-mask-${uniqueId} w-full overflow-hidden`}>
        <div className={`card-track-${uniqueId} flex gap-6 py-2 px-3`}>
          {duplicated.map((child, idx) => (
            <div key={`${uniqueId}-item-${idx}`} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

