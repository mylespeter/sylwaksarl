

// components/Gallery.jsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { supabase } from '@/lib/supabase'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Mapping des catégories : FR/EN -> catégorie interne
const categoryMap = {
  'Tout': 'All',
  'All': 'All',
  'Construction': 'Construction',
  'Minier': 'Mining',
  'Mining': 'Mining',
  'Électricité': 'Electrical',
  'Electrical': 'Electrical',
  'Industriel': 'Industrial',
  'Industrial': 'Industrial',
  'Laboratoire': 'Laboratory',
  'Laboratory': 'Laboratory',
}

export default function Gallery() {
  const { t, language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState(t.gallery.categories[0])
  const [selectedImage, setSelectedImage] = useState(null)
  const [swiperKey, setSwiperKey] = useState(0)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Charger les images depuis Supabase
  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error('Error loading gallery images:', error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  // Réinitialiser la catégorie active et forcer le re-render du Swiper quand la langue change
  useEffect(() => {
    setActiveCategory(t.gallery.categories[0])
    setSwiperKey(prev => prev + 1)
  }, [language, t.gallery.categories])

  // Vérifier si la catégorie active est "Tout" ou "All"
  const isAllCategory = activeCategory === t.gallery.categories[0]

  const filteredImages = isAllCategory
    ? images 
    : images.filter(img => img.category === categoryMap[activeCategory])

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          key={language}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mb-4 text-center">
            {t.gallery.title}
          </h2>
          <p className="text-gray-600 text-lg mb-12 text-center max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {t.gallery.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium transition-all border-l-4 ${
                activeCategory === cat
                  ? 'bg-[#ff6b00] text-white border-[#cc5500] shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b00]"></div>
          </div>
        ) : (
          /* Carousel */
          <>
            {filteredImages.length > 0 ? (
              <Swiper
                key={swiperKey}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={filteredImages.length > 3}
                className="!pb-14"
              >
                {filteredImages.map((image) => (
                  <SwiperSlide key={`${language}-${image.id}`}>
                    <div 
                      className="group relative aspect-[4/3] overflow-hidden shadow-lg cursor-pointer border-l-4 border-[#ff6b00]"
                      onClick={() => setSelectedImage(image.image_url)}
                    >
                      <img 
                        src={image.image_url} 
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-xs bg-[#ff6b00] px-3 py-1">
                          {image.category}
                        </span>
                        <h3 className="text-lg font-bold mt-2">{image.title}</h3>
                        {image.description && (
                          <p className="text-sm text-gray-200">{image.description}</p>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-12 text-gray-500 border-l-4 border-[#ff6b00] bg-white">
                {t.gallery.noImages}
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-[#ff6b00] z-10 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="max-w-full max-h-[90vh] object-contain border-l-4 border-[#ff6b00]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}