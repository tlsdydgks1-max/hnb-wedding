import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  lat: number;
  lng: number;
  zoom?: number;
}

let scriptLoaded = false;

export function NaverMap({ lat, lng, zoom = 16 }: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
    if (!clientId) {
      console.error("VITE_NAVER_MAP_CLIENT_ID is missing");
      return;
    }

    const initMap = () => {
      if (!mapRef.current) return;

      const center = new window.naver.maps.LatLng(lat, lng);

      const map = new window.naver.maps.Map(mapRef.current, {
        center,
        zoom, // ✅ 줌 가능
      });

      // ✅ 마커 표시
      new window.naver.maps.Marker({
        position: center,
        map,
      });
    };

    // 이미 로드된 경우
    if (scriptLoaded && window.naver?.maps) {
      initMap();
      return;
    }

    // SDK 로드
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      initMap();
    };
    document.head.appendChild(script);
  }, [lat, lng, zoom]);

  return (
    <div className="mb-4 h-64 overflow-hidden rounded-2xl shadow-soft">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
