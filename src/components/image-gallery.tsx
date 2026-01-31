'use client'

import * as React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type ImageGalleryProps = {
  baseUrl: string
  className?: string
}

export const ImageGallery = ({ baseUrl, className }: ImageGalleryProps) => {
  const images = React.useMemo(
    () => [
      {
        src: `${baseUrl}images/gallery/gallery-20.jpg`,
        alt: '웨딩 갤러리 이미지 20',
      },
      {
        src: `${baseUrl}images/gallery/gallery-22.jpg`,
        alt: '웨딩 갤러리 이미지 22',
      },
      {
        src: `${baseUrl}images/gallery/gallery-11.jpg`,
        alt: '웨딩 갤러리 이미지 11',
      },
      {
        src: `${baseUrl}images/gallery/gallery-24.jpg`,
        alt: '웨딩 갤러리 이미지 24',
      },
      {
        src: `${baseUrl}images/gallery/gallery-26.jpg`,
        alt: '웨딩 갤러리 이미지 26',
      },
      {
        src: `${baseUrl}images/gallery/gallery-30.jpg`,
        alt: '웨딩 갤러리 이미지 30',
      },
      {
        src: `${baseUrl}images/gallery/gallery-31.jpg`,
        alt: '웨딩 갤러리 이미지 31',
      },
      {
        src: `${baseUrl}images/gallery/gallery-12.jpg`,
        alt: '웨딩 갤러리 이미지 12',
      },
      {
        src: `${baseUrl}images/gallery/gallery-13.jpg`,
        alt: '웨딩 갤러리 이미지 13',
      },
      {
        src: `${baseUrl}images/gallery/gallery-15.jpg`,
        alt: '웨딩 갤러리 이미지 15',
      },
      {
        src: `${baseUrl}images/gallery/gallery-17.jpg`,
        alt: '웨딩 갤러리 이미지 17',
      },
      {
        src: `${baseUrl}images/gallery/gallery-02.jpg`,
        alt: '웨딩 갤러리 이미지 2',
      },
      {
        src: `${baseUrl}images/gallery/gallery-05.jpg`,
        alt: '웨딩 갤러리 이미지 5',
      },
      {
        src: `${baseUrl}images/gallery/gallery-09.jpg`,
        alt: '웨딩 갤러리 이미지 9',
      },
      {
        src: `${baseUrl}images/gallery/gallery-10.jpg`,
        alt: '웨딩 갤러리 이미지 10',
      },
    ],
    [baseUrl],
  )

  const [api, setApi] = React.useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [loadedBySrc, setLoadedBySrc] = React.useState<Record<string, boolean>>(
    {},
  )

  const sectionRef = React.useRef<HTMLElement>(null)
  const thumbnailsViewportRef = React.useRef<HTMLDivElement | null>(null)
  const thumbnailButtonRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const isPointerDownRef = React.useRef(false)

  React.useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Only render images near the current slide to reduce memory/paint cost.
  // (We keep the slide containers so the carousel snap points stay stable.)
  const RENDER_RANGE = 2

  const markLoaded = React.useCallback((src: string) => {
    setLoadedBySrc((prev) => {
      if (prev[src]) return prev
      return { ...prev, [src]: true }
    })
  }, [])

  const preventNativeImageMenu = React.useCallback(
    (e: React.SyntheticEvent) => {
      // Prevent iOS Safari long-press "Share/Save" menu and desktop context menu.
      e.preventDefault()
    },
    [],
  )

  const handleThumbnailClick = React.useCallback(
    (idx: number) => {
      if (!api) return

      // Reflect intent immediately (no flicker / no lag).
      setActiveIndex(idx)
      // Always jump instantly on thumbnail click (no animated scrolling).
      api.scrollTo(idx, true)
    },
    [api],
  )

  // Keep the active thumbnail visible (auto-scroll the thumbnail strip).
  React.useEffect(() => {
    if (isPointerDownRef.current) return
    const viewport = thumbnailsViewportRef.current
    const el = thumbnailButtonRefs.current[activeIndex]
    if (!viewport || !el) return

    const viewportRect = viewport.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const isFullyVisible =
      elRect.left >= viewportRect.left && elRect.right <= viewportRect.right

    // Only scroll when the active thumbnail isn't fully visible.
    if (!isFullyVisible) {
      // Use rAF so layout is up-to-date (less "pause" feeling).
      requestAnimationFrame(() => {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      })
    }
  }, [activeIndex])

  React.useEffect(() => {
    if (!api) return

    const syncActiveIndex = () => {
      const idx = api.selectedScrollSnap()
      setActiveIndex((prev) => (prev === idx ? prev : idx))
    }

    // Set initial state.
    syncActiveIndex()

    // Update active highlight immediately when selection changes,
    // but only auto-scroll the thumbnail strip once the carousel settles.
    api.on('select', syncActiveIndex)
    api.on('reInit', syncActiveIndex)

    const onPointerDown = () => {
      isPointerDownRef.current = true
    }
    const onPointerUp = () => {
      isPointerDownRef.current = false
    }
    api.on('pointerDown', onPointerDown)
    api.on('pointerUp', onPointerUp)

    return () => {
      api.off('select', syncActiveIndex)
      api.off('reInit', syncActiveIndex)
      api.off('pointerDown', onPointerDown)
      api.off('pointerUp', onPointerUp)
    }
  }, [api])

  return (
    <section
      ref={sectionRef}
      className={cn('slide-in-up pt-2 pb-10 will-change-transform', className)}
      aria-labelledby="gallery-section"
    >
      <h2 id="gallery-section" className="sr-only">
        이미지 갤러리
      </h2>

      <div className="rounded-2xl max-[420px]:rounded-none bg-black/90 overflow-hidden shadow-sm ring-1 ring-black/10">
        <Carousel
          setApi={setApi}
          opts={{ align: 'start' }}
          className="relative"
        >
          <CarouselContent className="ml-0 will-change-transform">
            {images.map((img, idx) => {
              const shouldRenderImage =
                Math.abs(idx - activeIndex) <= RENDER_RANGE
              return (
                <CarouselItem key={img.src} className="pl-0">
                  <div
                    className="relative w-full bg-black"
                    style={{ aspectRatio: '4 / 5' }}
                  >
                    {shouldRenderImage ? (
                      <>
                        <img
                          src={img.src}
                          alt={img.alt}
                          width={1800}
                          height={1125}
                          className="absolute inset-0 w-full h-full object-cover select-none [-webkit-touch-callout:none]"
                          loading={idx === activeIndex ? 'eager' : 'lazy'}
                          decoding="async"
                          onLoad={() => markLoaded(img.src)}
                          onContextMenu={preventNativeImageMenu}
                          onDragStart={preventNativeImageMenu}
                          draggable={false}
                          ref={(node) => {
                            // If the image is already cached, `onLoad` may fire immediately; ensure we show it.
                            if (node?.complete) markLoaded(img.src)
                          }}
                        />
                        {/* Fade out a cover once the image is loaded to avoid a "blink" */}
                        <div
                          className={cn(
                            'pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 will-change-opacity motion-reduce:transition-none',
                            loadedBySrc[img.src] ? 'opacity-0' : 'opacity-100',
                          )}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <div
                        className="absolute inset-0 bg-black"
                        aria-hidden="true"
                      />
                    )}

                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-t from-black/70 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        {/* thumbnails */}
        <div
          ref={thumbnailsViewportRef}
          className="px-4 pb-4 pt-3 overflow-x-auto bg-black"
          aria-label="갤러리 썸네일"
        >
          <div className="flex gap-2 w-max">
            {images.map((img, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={img.src}
                  type="button"
                  ref={(node) => {
                    thumbnailButtonRefs.current[idx] = node
                  }}
                  className={cn(
                    'relative size-[54px] rounded-xl overflow-hidden bg-black shrink-0 ring-1 transition',
                    isActive
                      ? 'ring-white/80'
                      : 'ring-white/10 opacity-75 hover:opacity-100',
                  )}
                  onClick={() => handleThumbnailClick(idx)}
                  aria-label={`${idx + 1}번째 이미지로 이동`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <img
                    src={img.src}
                    alt=""
                    width={108}
                    height={108}
                    className={cn(
                      'absolute inset-0 w-full h-full object-cover select-none [-webkit-touch-callout:none] transition-opacity duration-200 motion-reduce:transition-none',
                      loadedBySrc[img.src] ? 'opacity-100' : 'opacity-0',
                    )}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => markLoaded(img.src)}
                    onContextMenu={preventNativeImageMenu}
                    onDragStart={preventNativeImageMenu}
                    draggable={false}
                    ref={(node) => {
                      if (node?.complete) markLoaded(img.src)
                    }}
                  />
                  {isActive ? (
                    <span
                      className="absolute inset-0 ring-1 ring-inset ring-white/70 rounded-xl"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
