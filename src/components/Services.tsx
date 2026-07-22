
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
//     <section id="services" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mb-4">Our Services</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Comprehensive engineering and industrial services for mining and infrastructure projects.
//           </p>
//         </motion.div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {services.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="group bg-white p-6 shadow-sm border-l-4 border-transparent hover:border-[#ff6b00] transition-all duration-300 hover:shadow-lg text-center"
//             >
//               <div className="w-14 h-14 bg-[#1a3a6b]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#ff6b00] transition-colors">
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



// components/Services.jsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { supabase } from '@/lib/supabase'
import { 
  Building2,Route as Road, HardHat, FlaskConical, 
  Wrench, Zap, Package, Truck, Plus, Trash2, Edit3
} from 'lucide-react'

interface Service {
  id?: number
  title: string
  description: string
  icon: string
  category: string
  created_at?: string
}

// Mapping des icônes Lucide
const iconMap: Record<string, any> = {
  'Building2': Building2,
  'Road': Road,
  'HardHat': HardHat,
  'FlaskConical': FlaskConical,
  'Wrench': Wrench,
  'Zap': Zap,
  'Package': Package,
  'Truck': Truck,
  'default': Wrench
}

export default function Services() {
  const { t } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Service>({
    title: '',
    description: '',
    icon: 'Wrench',
    category: 'Civil'
  })

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    checkAdmin()
    loadServices()
  }, [])

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAdmin(!!session)
  }

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      
      if (data && data.length > 0) {
        setServices(data)
      } else {
        // Services par défaut
        setServices([
          { id: 1, title: 'Génie Civil', description: 'Solutions complètes d\'infrastructure et structurelles', icon: 'Building2', category: 'Civil' },
          { id: 2, title: 'Construction Routière', description: 'Routes, pistes minières, revêtement en asphalte', icon: 'Road', category: 'Construction' },
          { id: 3, title: 'Services Miniers', description: 'Préparation de site et installations de support', icon: 'HardHat', category: 'Mining' },
          { id: 4, title: 'Laboratoire Géotechnique', description: 'Tests de sol et analyse des matériaux', icon: 'FlaskConical', category: 'Laboratory' },
          { id: 5, title: 'Services Industriels', description: 'Nettoyage, maintenance, support technique', icon: 'Wrench', category: 'Industrial' },
          { id: 6, title: 'Électricité', description: 'Éclairage de site et systèmes électriques', icon: 'Zap', category: 'Electrical' },
          { id: 7, title: 'Fourniture de Matériaux', description: 'Matériaux de construction et équipements', icon: 'Package', category: 'Supply' },
          { id: 8, title: 'Transport', description: 'Location de camions, bus, logistique', icon: 'Truck', category: 'Transport' },
        ])
      }
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  // Ajouter un service
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([formData])
        .select()

      if (error) throw error
      
      if (data) {
        setServices([...services, data[0]])
        setShowForm(false)
        setFormData({ title: '', description: '', icon: 'Wrench', category: 'Civil' })
      }
    } catch (error) {
      console.error('Error adding service:', error)
      alert('Erreur lors de l\'ajout du service')
    }
  }

  // Mettre à jour un service
  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService?.id) return

    try {
      const { error } = await supabase
        .from('services')
        .update({
          title: editingService.title,
          description: editingService.description,
          icon: editingService.icon,
          category: editingService.category
        })
        .eq('id', editingService.id)

      if (error) throw error

      setServices(services.map(s => 
        s.id === editingService.id ? editingService : s
      ))
      setEditingService(null)
    } catch (error) {
      console.error('Error updating service:', error)
      alert('Erreur lors de la mise à jour du service')
    }
  }

  // Supprimer un service
  const handleDeleteService = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) throw error

      setServices(services.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Erreur lors de la suppression du service')
    }
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || iconMap['default']
    return <IconComponent className="w-10 h-10" />
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a6b] mb-4 text-center">
            {t.services.title}
          </h2>
          <p className="text-gray-600 text-lg mb-12 text-center max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Bouton Admin */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setEditingService(null)
                setShowForm(!showForm)
              }}
              className="flex items-center gap-2 bg-[#1a3a6b] text-white px-4 py-2 hover:bg-blue-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter un service
            </button>
          </div>
        )}

        {/* Formulaire Admin */}
        {isAdmin && (showForm || editingService) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 bg-gray-50 border-2 border-[#ff6b00] p-6"
          >
            <h3 className="text-xl font-bold text-[#1a3a6b] mb-4">
              {editingService ? 'Modifier le service' : 'Nouveau service'}
            </h3>
            <form onSubmit={editingService ? handleUpdateService : handleAddService} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    type="text"
                    value={editingService ? editingService.title : formData.title}
                    onChange={(e) => editingService 
                      ? setEditingService({...editingService, title: e.target.value})
                      : setFormData({...formData, title: e.target.value})
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#ff6b00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
                  <select
                    value={editingService ? editingService.icon : formData.icon}
                    onChange={(e) => editingService
                      ? setEditingService({...editingService, icon: e.target.value})
                      : setFormData({...formData, icon: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#ff6b00] outline-none"
                  >
                    <option value="Building2">Bâtiment</option>
                    <option value="Road">Route</option>
                    <option value="HardHat">Casque</option>
                    <option value="FlaskConical">Laboratoire</option>
                    <option value="Wrench">Clé</option>
                    <option value="Zap">Électricité</option>
                    <option value="Package">Paquet</option>
                    <option value="Truck">Camion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <input
                    type="text"
                    value={editingService ? editingService.category : formData.category}
                    onChange={(e) => editingService
                      ? setEditingService({...editingService, category: e.target.value})
                      : setFormData({...formData, category: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#ff6b00] outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingService ? editingService.description : formData.description}
                    onChange={(e) => editingService
                      ? setEditingService({...editingService, description: e.target.value})
                      : setFormData({...formData, description: e.target.value})
                    }
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 focus:border-[#ff6b00] outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-[#ff6b00] text-white px-6 py-2 hover:bg-orange-600 transition-colors"
                >
                  {editingService ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingService(null)
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 rounded-full border-gray-200 border-t-[#ff6b00] animate-spin"></div>
          </div>
        ) : (
          /* Services Grid */
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border-2 border-gray-200 hover:border-[#ff6b00] hover:shadow-xl transition-all duration-300 p-6"
              >
                {/* Admin Actions */}
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => {
                        setEditingService(service)
                        setShowForm(false)
                      }}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      title="Modifier"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => service.id && handleDeleteService(service.id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-4 text-[#ff6b00] group-hover:scale-110 transition-transform duration-300">
                  {getIcon(service.icon)}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#1a3a6b] mb-2 group-hover:text-[#ff6b00] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>

                {/* Category Badge */}
                {service.category && (
                  <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-600 px-2 py-1">
                    {service.category}
                  </span>
                )}

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#ff6b00] group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}