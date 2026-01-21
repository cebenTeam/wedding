'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { inter, serif } from '@/app/fonts'

const NAVER_MAP_SCRIPT_ID = 'naver-map-sdk'

function loadNaverMapScript(clientId: string) {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('No window'))
  if ((window as any).naver?.maps) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(
      NAVER_MAP_SCRIPT_ID,
    ) as HTMLScriptElement | null

    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () =>
        reject(new Error('네이버 지도 스크립트 로드 실패')),
      )
      return
    }

    const script = document.createElement('script')
    script.id = NAVER_MAP_SCRIPT_ID
    script.async = true
    script.defer = true
    script.type = 'text/javascript'
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('네이버 지도 스크립트 로드 실패'))

    document.head.appendChild(script)
  })
}

export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  const initMap = () => {
    if (!mapRef.current || !window.naver) return

    // https://naver.me/xHgpb86d
    const location = new window.naver.maps.LatLng(37.5029975, 127.0465038)
    const map = new window.naver.maps.Map(mapRef.current, {
      center: location,
      zoom: 17,
    })

    // HTML로 마커 + 라벨 함께
    const markerContent = `
      <div style="text-align: center;">
        <img 
          src="https://map.pstatic.net/resource/api/v2/image/maps/selected-marker/1002112@1x.png?version=20&mapping=marker-177" 
          style="width: 32px; height: 40px; display: block; margin: 0 auto;"
        />
        <div style="
          font-weight: 600;
          font-size: 12px;
          color: #333;
          white-space: nowrap;
          text-shadow: rgb(255, 255, 255) -1px 0px, rgb(255, 255, 255) 0px 1px, rgb(255, 255, 255) 1px 0px, rgb(255, 255, 255) 0px -1px;          
        ">
          아펠가모 선릉
        </div>
      </div>
    `

    new window.naver.maps.Marker({
      position: location,
      map: map,
      icon: {
        content: markerContent,
        anchor: new window.naver.maps.Point(16, 40),
      },
    })

    map.panBy(new window.naver.maps.Point(95, -125))
  }

  useEffect(() => {
    const clientId = 'sqe6yam84f'
    if (!clientId) {
      console.warn(
        '[Map] VITE_NAVER_MAP_CLIENT_ID is missing. Set it in wedding/env.sample -> wedding/.env.local',
      )
      return
    }

    let cancelled = false

    loadNaverMapScript(clientId)
      .then(() => {
        if (cancelled) return
        setIsMapLoaded(true)
        // ensure ref is mounted
        requestAnimationFrame(() => initMap())
      })
      .catch((e) => {
        console.error('스크립트 로드 실패', e)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={`mb-6 text-center ${inter.className}`}>
        <h2
          className={`text-[18px] font-medium tracking-wide mb-2 ${serif.className}`}
        >
          아펠가모 선릉 4층 웨딩홀
        </h2>

        <div className="text-[13px] text-foreground/60 leading-relaxed mb-1">
          <address className="not-italic">
            서울 강남구 테헤란로 322
            <br />
            한신인터밸리24 빌딩 4층
          </address>
        </div>

        <p className="text-[12px] text-foreground/50">
          <a href="tel:02-2183-0230">Tel. 02-2183-0230</a>
        </p>
      </div>
      <div
        className={`max-[420px]:mx-6 rounded-md overflow-hidden relative ${inter.className}`}
      >
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#f0f0f0',
          }}
        />
        <Button
          variant="secondary"
          size="lg"
          className={`absolute top-2 right-2 max-[420px]:right-2.5 shadow-2xl rounded-3xl bg-white cursor-pointer tracking-tight hover:bg-white pl-2 gap-1.5 pr-3`}
          onClick={() => window.open('https://naver.me/xHgpb86d', '_blank')}
          disabled={!isMapLoaded}
        >
          <div
            className="w-7 h-7 bg-cover bg-center rounded"
            style={{
              backgroundImage:
                'url(https://www.navercorp.com/img/pc/service-map-app-4.jpg)',
            }}
          />
          <span className="relative -left-[2px]">네이버 지도에서 보기</span>
        </Button>
      </div>

      <div
        className={`mt-4 max-[420px]:px-6 space-y-4 text-sm ${inter.className}`}
      >
        <div>
          <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
            <span>지하철</span>
          </h3>
          <p className="text-foreground/80 leading-relaxed">
            <strong>선릉역(2호선·분당선) 4번 출구</strong>
            <br />
            IBK기업은행을 지나 50m 직진 맥도날드 옆 한신인터밸리24 빌딩, 4층
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
            <span>자가용</span>
          </h3>
          <p className="text-foreground/80 leading-relaxed">
            "한신인터밸리24 주차장" 검색 시 건물 뒷편 주차장 입구로 안내
            <br />
            <span className="text-foreground/60">(주차 2시간 무료)</span>
          </p>
        </div>
      </div>
    </>
  )
}

declare global {
  interface Window {
    naver: any
  }
}
