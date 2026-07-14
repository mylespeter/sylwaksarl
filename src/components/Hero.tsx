
// 'use client'

// import { motion } from 'framer-motion'
// import CountUp from 'react-countup'
// import { ArrowRight, CheckCircle, Shield, Award } from 'lucide-react'

// export default function Hero() {
//   const scrollTo = (href: string) => {
//     const el = document.querySelector(href)
//     if (el) el.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <section id="home" className="relative min-h-screen flex items-center bg-white overflow-hidden pt-2">
//       {/* Formes décoratives légères */}
//       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a3a6b]/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
//       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6b00]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

//       <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
//           {/* Colonne gauche - Texte */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="space-y-6"
//           >
//             {/* Badge repensé */}
//             <div className="inline-flex items-center gap-3 bg-[#1a3a6b] text-white px-4 py-2.5">
//               <span className="w-2 h-2 bg-[#ff6b00] animate-pulse" />
//               <span className="text-sm font-medium tracking-wide uppercase">Based in Lubumbashi, DRC</span>
//             </div>

//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a3a6b] leading-tight">
//               Engineering
//               <span className="text-[#ff6b00]"> Excellence</span>
//               <br />
//               for Mining &
//               <br />
//               Infrastructure
//             </h1>
            
//             <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
//               Civil engineering, geotechnical expertise, and industrial services 
//               delivered with international standards across the Democratic Republic of Congo.
//             </p>

//             {/* Points forts */}
//             <div className="flex flex-wrap gap-6">
//               <div className="flex items-center gap-3 px-4 py-2 bg-gray-50">
//                 <CheckCircle className="w-4 h-4 text-[#ff6b00]" />
//                 <span className="text-gray-700 text-sm font-medium">Qualified Engineers</span>
//               </div>
//               <div className="flex items-center gap-3 px-4 py-2 bg-gray-50">
//                 <Shield className="w-4 h-4 text-[#ff6b00]" />
//                 <span className="text-gray-700 text-sm font-medium">Safety First</span>
//               </div>
//               <div className="flex items-center gap-3 px-4 py-2 bg-gray-50">
//                 <Award className="w-4 h-4 text-[#ff6b00]" />
//                 <span className="text-gray-700 text-sm font-medium">Quality Assured</span>
//               </div>
//             </div>

//             {/* Boutons */}
//             <div className="flex flex-wrap items-center gap-4">
//               <button 
//                 onClick={() => scrollTo('#services')} 
//                 className="group bg-[#ff6b00] text-white px-8 py-4 font-semibold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 hover:shadow-xl"
//               >
//                 Our Services
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
              
//               <button 
//                 onClick={() => scrollTo('#contact')} 
//                 className="group border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-4 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all"
//               >
//                 Contact Us
//               </button>
//             </div>
//           </motion.div>

//           {/* Colonne droite - Images */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative"
//           >
//             {/* Layout avec images superposées */}
//             <div className="relative h-[500px] lg:h-[600px]">
//               {/* Image principale en haut à gauche */}
//               <div className="absolute top-0 left-0 w-[65%] h-[55%] overflow-hidden shadow-2xl z-20">
//                 <img 
//                   src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop" 
//                   alt="Engineering work"
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                 />
//                 {/* Badge */}
//                 <div className="absolute bottom-0 left-0 bg-white px-6 py-4 shadow-lg border-l-4 border-[#ff6b00]">
//                   <div className="text-[#1a3a6b] font-bold text-2xl">50+</div>
//                   <div className="text-gray-500 text-xs uppercase tracking-wide">Projects Done</div>
//                 </div>
//               </div>

//               {/* Image secondaire en bas à droite */}
//               <div className="absolute bottom-0 right-0 w-[55%] h-[45%] overflow-hidden shadow-xl z-10">
//                 <img 
//                   src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=500&fit=crop" 
//                   alt="Construction"
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                 />
//               </div>

//               {/* Image tertiaire au milieu */}
//               <div className="absolute top-[35%] right-[10%] w-[40%] h-[35%] overflow-hidden shadow-2xl z-30 border-4 border-white">
//                 <img 
//                   src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop" 
//                   alt="Road construction"
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                 />
//                 {/* Badge expérience */}
//                 <div className="absolute top-0 right-0 bg-[#ff6b00] text-white px-4 py-3 shadow-lg">
//                   <div className="text-xl font-bold">3+</div>
//                   <div className="text-xs uppercase tracking-wide">Years Exp.</div>
//                 </div>
//               </div>

//               {/* Élément décoratif */}
//               <div className="absolute top-[20%] right-0 w-20 h-20 bg-[#ff6b00]/10 z-0" />
//               <div className="absolute bottom-[10%] left-[10%] w-16 h-16 bg-[#1a3a6b]/10 z-0" />
//             </div>
//           </motion.div>

//         </div>

//         {/* Stats en bas */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 lg:mt-24"
//         >
//           {[
//             { value: 3, suffix: '+', label: 'Years Experience' },
//             { value: 50, suffix: '+', label: 'Projects Done' },
//             { value: 150, suffix: '+', label: 'Team Members' },
//             { value: 100, suffix: '%', label: 'Satisfaction' },
//           ].map((stat, i) => (
//             <div 
//               key={i} 
//               className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white"
//             >
//               <div className="text-3xl md:text-4xl font-bold text-[#ff6b00] mb-1">
//                 <CountUp end={stat.value} duration={2} />
//                 {stat.suffix}
//               </div>
//               <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )
// }

'use client'

import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { ArrowRight, CheckCircle, Shield, Award } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white overflow-hidden pt-2">
      {/* Formes décoratives légères */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a3a6b]/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6b00]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Colonne gauche - Texte */}
          <motion.div
            key={t.hero.badge}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-[#1a3a6b] text-white px-4 py-2.5">
              <span className="w-2 h-2 bg-[#ff6b00] animate-pulse" />
              <span className="text-sm font-medium tracking-wide uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-[#1a3a6b] leading-tight">
              {t.hero.title1}{' '}
              <span className="text-[#ff6b00]">{t.hero.title2}</span>
              <br />
              {t.hero.title3}
              <br />
              {t.hero.title4}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              {t.hero.description}
            </p>

            {/* Points forts */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50">
                <CheckCircle className="w-4 h-4 text-[#ff6b00]" />
                <span className="text-gray-700 text-sm font-medium">{t.hero.highlights[0]}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50">
                <Shield className="w-4 h-4 text-[#ff6b00]" />
                <span className="text-gray-700 text-sm font-medium">{t.hero.highlights[1]}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50">
                <Award className="w-4 h-4 text-[#ff6b00]" />
                <span className="text-gray-700 text-sm font-medium">{t.hero.highlights[2]}</span>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => scrollTo('#services')} 
                className="group bg-[#ff6b00] text-white px-8 py-4 font-semibold hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 hover:shadow-xl"
              >
                {t.hero.servicesBtn}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollTo('#contact')} 
                className="group border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-4 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all"
              >
                {t.hero.contactBtn}
              </button>
            </div>
          </motion.div>

          {/* Colonne droite - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Image principale */}
              <div className="absolute top-0 left-0 w-[65%] h-[55%] overflow-hidden shadow-2xl z-20">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop" 
                  alt="Engineering work"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 bg-white px-6 py-4 shadow-lg border-l-4 border-[#ff6b00]">
                  <div className="text-[#1a3a6b] font-bold text-2xl">50+</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wide">{t.hero.projectsDone}</div>
                </div>
              </div>

              {/* Image secondaire */}
              <div className="absolute bottom-0 right-0 w-[55%] h-[45%] overflow-hidden shadow-xl z-10">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=500&fit=crop" 
                  alt="Construction"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Image tertiaire */}
              <div className="absolute top-[35%] right-[10%] w-[40%] h-[35%] overflow-hidden shadow-2xl z-30 border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop" 
                  alt="Road construction"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-0 right-0 bg-[#ff6b00] text-white px-4 py-3 shadow-lg">
                  <div className="text-xl font-bold">3+</div>
                  <div className="text-xs uppercase tracking-wide">{t.hero.yearsExp}</div>
                </div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute top-[20%] right-0 w-20 h-20 bg-[#ff6b00]/10 z-0" />
              <div className="absolute bottom-[10%] left-[10%] w-16 h-16 bg-[#1a3a6b]/10 z-0" />
            </div>
          </motion.div>

        </div>

        {/* Stats en bas */}
        <motion.div
          key={t.hero.stats[0]}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 lg:mt-24"
        >
          {[
            { value: 3, suffix: '+' },
            { value: 50, suffix: '+' },
            { value: 150, suffix: '+' },
            { value: 100, suffix: '%' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#ff6b00] mb-1">
                <CountUp end={stat.value} duration={2} />
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {t.hero.stats[i]}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}