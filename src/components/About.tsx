// 'use client'

// import { motion } from 'framer-motion'
// import { CheckCircle } from 'lucide-react'

// export default function About() {
//   return (
//     <section id="about" className="section">
//       <div className="container">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mb-6">
//               About SYLWAK INVESTMENT
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Founded in 2023 in Lubumbashi, SYLWAK INVESTMENT SARL delivers high-quality 
//               civil engineering, mining services, and industrial solutions across the 
//               Democratic Republic of Congo.
//             </p>
//             <div className="space-y-3">
//               {[
//                 'Experienced engineers and technical staff',
//                 'International quality standards',
//                 'Modern equipment and technology',
//                 'Safety-first approach',
//                 'On-time project delivery'
//               ].map((item, i) => (
//                 <div key={i} className="flex items-center space-x-3">
//                   <CheckCircle className="w-5 h-5 text-[#ff6b00] flex-shrink-0" />
//                   <span className="text-gray-700">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-gray-200 rounded-xl h-80 md:h-96 overflow-hidden"
//           >
//             <div 
//               className="w-full h-full bg-cover bg-center"
//               style={{
//                 backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800')"
//               }}
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mb-6">
              {t.about.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {t.about.description}
            </p>
            <div className="space-y-3">
              {t.about.items.map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#ff6b00] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-200 rounded-xl h-80 md:h-96 overflow-hidden"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800')"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}