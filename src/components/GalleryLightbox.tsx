import { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  title: string;
  description?: string;
}

export function GalleryLightbox({ images, title, description }: GalleryLightboxProps) {
  const lightGalleryRef = useRef<HTMLDivElement>(null);
  const galleryInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (lightGalleryRef.current && !galleryInstanceRef.current) {
      galleryInstanceRef.current = lightGallery(lightGalleryRef.current, {
        plugins: [lgThumbnail, lgZoom, lgFullscreen, lgShare, lgRotate],
        speed: 500,
        thumbnail: true,
        animateThumb: true,
        zoomFromOrigin: true,
        allowMediaOverlap: true,
        toggleThumb: true,
        download: false,
        counter: true,
        slideEndAnimation: true,
        hideScrollbar: true,
        closable: true,
        showMaximizeIcon: true,
        rotate: true,
        flipHorizontal: true,
        flipVertical: true,
        getCaptionFromTitleOrAlt: true,
        appendSubHtmlTo: '.lg-sub-html',
        subHtmlSelectorRelative: true
      });
    }

    return () => {
      if (galleryInstanceRef.current) {
        galleryInstanceRef.current.destroy();
        galleryInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50" id="gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        
        <div 
          ref={lightGalleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <Card 
              key={index}
              className="overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              data-src={image.src}
              data-sub-html={`<h4 class="font-semibold">${image.title}</h4><p class="text-sm">${image.description}</p>`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="text-sm font-medium">View Details</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{image.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-2">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* South Africa note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Assembly in South Africa. Shipping from Cape Town by sea and air. 
            Stock for SADC can be staged by road.
          </p>
        </div>
      </div>
    </section>
  );
}