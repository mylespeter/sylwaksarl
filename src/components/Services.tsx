// 'use client'

// import { motion } from 'framer-motion'
// import { Building2, Route, HardHat, FlaskConical, Factory, Zap, Package, Truck } from 'lucide-react'

// const services = [
//   { icon: Building2, title: 'Civil Engineering', desc: 'Complete infrastructure and structural solutions' },
//   { icon: Route, title: 'Road Construction', desc: 'Highways, mining roads, asphalt paving' },
//   { icon: HardHat, title: 'Mining Services', desc: 'Site preparation and support facilities' },
//   { icon: FlaskConical, title: 'Geotechnical Lab', desc: 'Soil testing and material analysis' },
//   { icon: Factory, title: 'Industrial Services', desc: 'Cleaning, maintenance, technical support' },
//   { icon: Zap, title: 'Electrical', desc: 'Site lighting and power systems' },
//   { icon: Package, title: 'Materials Supply', desc: 'Construction materials and equipment' },
//   { icon: Truck, title: 'Transport', desc: 'Truck rental, bus services, logistics' },
// ]

// export default function Services() {
//   return (
//     <section id="services" className="section bg-gray-50">
//       <div className="container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="title">Our Services</h2>
//           <p className="subtitle">
//             Comprehensive engineering and industrial services for mining and infrastructure projects.
//           </p>
//         </motion.div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="card group hover:border-[#ff6b00]/50 text-center"
//             >
//               <div className="w-14 h-14 bg-[#1a3a6b]/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ff6b00] transition-colors">
//                 <s.icon className="w-7 h-7 text-[#1a3a6b] group-hover:text-white" />
//               </div>
//               <h3 className="font-bold text-[#1a3a6b] mb-2">{s.title}</h3>
//               <p className="text-sm text-gray-500">{s.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { motion } from 'framer-motion'
import { Building2, Route, HardHat, FlaskConical, Factory, Zap, Package, Truck } from 'lucide-react'

const services = [
  { icon: Building2, title: 'Civil Engineering', desc: 'Complete infrastructure and structural solutions' },
  { icon: Route, title: 'Road Construction', desc: 'Highways, mining roads, asphalt paving' },
  { icon: HardHat, title: 'Mining Services', desc: 'Site preparation and support facilities' },
  { icon: FlaskConical, title: 'Geotechnical Lab', desc: 'Soil testing and material analysis' },
  { icon: Factory, title: 'Industrial Services', desc: 'Cleaning, maintenance, technical support' },
  { icon: Zap, title: 'Electrical', desc: 'Site lighting and power systems' },
  { icon: Package, title: 'Materials Supply', desc: 'Construction materials and equipment' },
  { icon: Truck, title: 'Transport', desc: 'Truck rental, bus services, logistics' },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive engineering and industrial services for mining and infrastructure projects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-6 shadow-sm border-l-4 border-transparent hover:border-[#ff6b00] transition-all duration-300 hover:shadow-lg text-center"
            >
              <div className="w-14 h-14 bg-[#1a3a6b]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ff6b00] transition-colors">
                <s.icon className="w-7 h-7 text-[#1a3a6b] group-hover:text-white" />
              </div>
              <h3 className="font-bold text-[#1a3a6b] mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}