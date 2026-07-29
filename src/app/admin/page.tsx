
// // app/admin/page.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabase } from '@/lib/supabase'
// import { Upload, Trash2, Edit, Image as ImageIcon, Users, LayoutGrid, LogOut, FileText, File } from 'lucide-react'

// type User = {
//   id: number
//   username: string
//   email: string
//   genre: string
//   telephone: string
//   created_at: string
//   updated_at: string
// }

// type GalleryImage = {
//   id: number
//   title: string
//   description: string
//   category: string
//   image_url: string
//   created_at: string
//   updated_at: string
// }

// type Document = {
//   id: number
//   name: string
//   type: string
//   size: string
//   category: string
//   file_url: string
//   created_at: string
//   updated_at: string
// }

// const GALLERY_CATEGORIES = ['Construction', 'Mining', 'Industrial', 'Electrical', 'Laboratory']
// const DOCUMENT_CATEGORIES = ['Company', 'Legal', 'Quality', 'Safety', 'Technical']

// export default function AdminPage() {
//   const [activeTab, setActiveTab] = useState<'users' | 'gallery' | 'documents'>('users')
//   const [users, setUsers] = useState<User[]>([])
//   const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
//   const [documents, setDocuments] = useState<Document[]>([])
//   const [loading, setLoading] = useState(true)
//   const [adminUser, setAdminUser] = useState<any>(null)
  
//   // Gallery form state
//   const [uploading, setUploading] = useState(false)
//   const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [category, setCategory] = useState('Construction')
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string>('')
  
//   // Document form state
//   const [uploadingDoc, setUploadingDoc] = useState(false)
//   const [editingDocument, setEditingDocument] = useState<Document | null>(null)
//   const [docName, setDocName] = useState('')
//   const [docCategory, setDocCategory] = useState('Company')
//   const [selectedDocFile, setSelectedDocFile] = useState<File | null>(null)
  
//   const router = useRouter()

//   useEffect(() => {
//     const adminSession = document.cookie.includes('admin-session=authenticated')
//     const storedAdmin = localStorage.getItem('admin-user')
    
//     if (!adminSession || !storedAdmin) {
//       router.push('/admin/login')
//       return
//     }

//     setAdminUser(JSON.parse(storedAdmin))
//     loadData()
//   }, [router])

//   const loadData = async () => {
//     setLoading(true)
//     await Promise.all([loadUsers(), loadGallery(), loadDocuments()])
//     setLoading(false)
//   }

//   const loadUsers = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('users')
//         .select('*')
//         .order('created_at', { ascending: false })

//       if (error) throw error
//       setUsers(data || [])
//     } catch (error) {
//       console.error('Error loading users:', error)
//     }
//   }

//   const loadGallery = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('gallery_images')
//         .select('*')
//         .order('created_at', { ascending: false })

//       if (error) throw error
//       setGalleryImages(data || [])
//     } catch (error) {
//       console.error('Error loading gallery:', error)
//     }
//   }

//   const loadDocuments = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('documents')
//         .select('*')
//         .order('created_at', { ascending: false })

//       if (error) throw error
//       setDocuments(data || [])
//     } catch (error) {
//       console.error('Error loading documents:', error)
//     }
//   }

//   const handleLogout = () => {
//     document.cookie = 'admin-session=; path=/; max-age=0'
//     localStorage.removeItem('admin-user')
//     router.push('/admin/login')
//   }

//   const deleteUser = async (userId: number) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
    
//     try {
//       const { error } = await supabase
//         .from('users')
//         .delete()
//         .eq('id', userId)

//       if (error) throw error
      
//       setUsers(users.filter(user => user.id !== userId))
//     } catch (error) {
//       console.error('Error deleting user:', error)
//     }
//   }

//   // Gallery handlers
//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setSelectedFile(file)
//       const url = URL.createObjectURL(file)
//       setPreviewUrl(url)
//     }
//   }

//   const resetGalleryForm = () => {
//     setTitle('')
//     setDescription('')
//     setCategory('Construction')
//     setSelectedFile(null)
//     setPreviewUrl('')
//     setEditingImage(null)
//   }

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!selectedFile && !editingImage) {
//       alert('Veuillez sélectionner une image')
//       return
//     }

//     setUploading(true)

//     try {
//       let imageUrl = editingImage?.image_url || ''

//       if (selectedFile) {
//         const fileExt = selectedFile.name.split('.').pop()
//         const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
//         const { data: uploadData, error: uploadError } = await supabase.storage
//           .from('gallery')
//           .upload(fileName, selectedFile)

//         if (uploadError) throw uploadError

//         const { data: { publicUrl } } = supabase.storage
//           .from('gallery')
//           .getPublicUrl(fileName)

//         imageUrl = publicUrl

//         if (editingImage?.image_url) {
//           const oldFileName = editingImage.image_url.split('/').pop()
//           if (oldFileName) {
//             await supabase.storage
//               .from('gallery')
//               .remove([oldFileName])
//           }
//         }
//       }

//       if (editingImage) {
//         const { error } = await supabase
//           .from('gallery_images')
//           .update({
//             title,
//             description,
//             category,
//             image_url: imageUrl,
//             updated_at: new Date().toISOString()
//           })
//           .eq('id', editingImage.id)

//         if (error) throw error
//       } else {
//         const { error } = await supabase
//           .from('gallery_images')
//           .insert([{
//             title,
//             description,
//             category,
//             image_url: imageUrl
//           }])

//         if (error) throw error
//       }

//       resetGalleryForm()
//       loadGallery()
//     } catch (error) {
//       console.error('Error uploading image:', error)
//       alert('Erreur lors de l\'upload de l\'image')
//     } finally {
//       setUploading(false)
//     }
//   }

//   const deleteImage = async (image: GalleryImage) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return

//     try {
//       const fileName = image.image_url.split('/').pop()
//       if (fileName) {
//         await supabase.storage
//           .from('gallery')
//           .remove([fileName])
//       }

//       const { error } = await supabase
//         .from('gallery_images')
//         .delete()
//         .eq('id', image.id)

//       if (error) throw error

//       setGalleryImages(galleryImages.filter(img => img.id !== image.id))
//     } catch (error) {
//       console.error('Error deleting image:', error)
//     }
//   }

//   const editImage = (image: GalleryImage) => {
//     setEditingImage(image)
//     setTitle(image.title)
//     setDescription(image.description)
//     setCategory(image.category)
//     setPreviewUrl(image.image_url)
//     setSelectedFile(null)
//   }

//   // Document handlers
//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
//   }

//   const handleDocFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setSelectedDocFile(file)
//       if (!docName) {
//         setDocName(file.name.replace(/\.[^/.]+$/, ''))
//       }
//     }
//   }

//   const resetDocumentForm = () => {
//     setDocName('')
//     setDocCategory('Company')
//     setSelectedDocFile(null)
//     setEditingDocument(null)
//   }

//   const handleDocumentUpload = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!selectedDocFile && !editingDocument) {
//       alert('Veuillez sélectionner un fichier')
//       return
//     }

//     setUploadingDoc(true)

//     try {
//       let fileUrl = editingDocument?.file_url || ''
//       let fileType = editingDocument?.type || ''
//       let fileSize = editingDocument?.size || ''

//       if (selectedDocFile) {
//         const fileExt = selectedDocFile.name.split('.').pop()?.toUpperCase() || 'FILE'
//         const fileName = `${Date.now()}-${selectedDocFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        
//         const { data: uploadData, error: uploadError } = await supabase.storage
//           .from('documents')
//           .upload(fileName, selectedDocFile)

//         if (uploadError) throw uploadError

//         const { data: { publicUrl } } = supabase.storage
//           .from('documents')
//           .getPublicUrl(fileName)

//         fileUrl = publicUrl
//         fileType = fileExt
//         fileSize = formatFileSize(selectedDocFile.size)

//         if (editingDocument?.file_url) {
//           const oldFileName = editingDocument.file_url.split('/').pop()
//           if (oldFileName) {
//             await supabase.storage
//               .from('documents')
//               .remove([oldFileName])
//           }
//         }
//       }

//       if (editingDocument) {
//         const { error } = await supabase
//           .from('documents')
//           .update({
//             name: docName,
//             category: docCategory,
//             type: fileType,
//             size: fileSize,
//             file_url: fileUrl,
//             updated_at: new Date().toISOString()
//           })
//           .eq('id', editingDocument.id)

//         if (error) throw error
//       } else {
//         const { error } = await supabase
//           .from('documents')
//           .insert([{
//             name: docName,
//             category: docCategory,
//             type: fileType,
//             size: fileSize,
//             file_url: fileUrl
//           }])

//         if (error) throw error
//       }

//       resetDocumentForm()
//       loadDocuments()
//     } catch (error) {
//       console.error('Error uploading document:', error)
//       alert('Erreur lors de l\'upload du document')
//     } finally {
//       setUploadingDoc(false)
//     }
//   }

//   const deleteDocument = async (document: Document) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) return

//     try {
//       const fileName = document.file_url.split('/').pop()
//       if (fileName) {
//         await supabase.storage
//           .from('documents')
//           .remove([fileName])
//       }

//       const { error } = await supabase
//         .from('documents')
//         .delete()
//         .eq('id', document.id)

//       if (error) throw error

//       setDocuments(documents.filter(doc => doc.id !== document.id))
//     } catch (error) {
//       console.error('Error deleting document:', error)
//     }
//   }

//   const editDocument = (document: Document) => {
//     setEditingDocument(document)
//     setDocName(document.name)
//     setDocCategory(document.category)
//     setSelectedDocFile(null)
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-[#1a3a6b] shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <span className="w-2 h-2 bg-[#ff6b00] animate-pulse" />
//             <h1 className="text-lg font-bold text-white tracking-wide uppercase">
//               Administration
//             </h1>
//           </div>
//           <div className="flex items-center gap-6">
//             <span className="text-sm text-white/80 font-medium">
//               {adminUser?.username}
//             </span>
//             <button
//               onClick={handleLogout}
//               className="text-white/80 hover:text-[#ff6b00] transition-colors flex items-center gap-2 text-sm font-medium"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Déconnexion</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Navigation Tabs */}
//       <div className="bg-gray-50 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex gap-0 overflow-x-auto">
//             <button
//               onClick={() => setActiveTab('users')}
//               className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
//                 activeTab === 'users'
//                   ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
//                   : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
//               }`}
//             >
//               <Users className="w-4 h-4" />
//               <span>Utilisateurs</span>
//             </button>
//             <button
//               onClick={() => setActiveTab('gallery')}
//               className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
//                 activeTab === 'gallery'
//                   ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
//                   : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
//               }`}
//             >
//               <LayoutGrid className="w-4 h-4" />
//               <span>Galerie</span>
//             </button>
//             <button
//               onClick={() => setActiveTab('documents')}
//               className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
//                 activeTab === 'documents'
//                   ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
//                   : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
//               }`}
//             >
//               <FileText className="w-4 h-4" />
//               <span>Documents</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Users Tab */}
//         {activeTab === 'users' && (
//           <div className="space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white">
//                 <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">Total Utilisateurs</p>
//                 <p className="text-4xl font-bold text-[#1a3a6b]">{users.length}</p>
//               </div>
//               <div className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white">
//                 <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">Hommes</p>
//                 <p className="text-4xl font-bold text-[#1a3a6b]">{users.filter(u => u.genre === 'M').length}</p>
//               </div>
//               <div className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white">
//                 <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">Femmes</p>
//                 <p className="text-4xl font-bold text-[#1a3a6b]">{users.filter(u => u.genre === 'F').length}</p>
//               </div>
//             </div>

//             <div className="bg-white border border-gray-200">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                 <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">Liste des Utilisateurs</h2>
//               </div>
              
//               {loading ? (
//                 <div className="p-12 text-center">
//                   <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6b00] animate-spin mx-auto"></div>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b-2 border-gray-200">
//                         <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">ID</th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Username</th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Email</th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Genre</th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Téléphone</th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Date</th>
//                         <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {users.map((user) => (
//                         <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                           <td className="px-6 py-4 text-sm text-gray-600 font-medium">{user.id}</td>
//                           <td className="px-6 py-4 text-sm font-semibold text-[#1a3a6b]">{user.username}</td>
//                           <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                           <td className="px-6 py-4 text-sm">
//                             <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
//                               user.genre === 'M' 
//                                 ? 'bg-blue-50 text-blue-700 border border-blue-200' 
//                                 : 'bg-pink-50 text-pink-700 border border-pink-200'
//                             }`}>
//                               {user.genre === 'M' ? 'Homme' : 'Femme'}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-sm text-gray-600">{user.telephone || '—'}</td>
//                           <td className="px-6 py-4 text-sm text-gray-500">
//                             {new Date(user.created_at).toLocaleDateString('fr-FR')}
//                           </td>
//                           <td className="px-6 py-4 text-sm">
//                             <button
//                               onClick={() => deleteUser(user.id)}
//                               disabled={user.username === 'admin'}
//                               className="text-red-600 hover:text-red-800 font-semibold text-xs uppercase tracking-wide disabled:opacity-30 disabled:cursor-not-allowed"
//                             >
//                               {user.username === 'admin' ? 'Admin' : 'Supprimer'}
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Gallery Tab */}
//         {activeTab === 'gallery' && (
//           <div className="space-y-8">
//             <div className="bg-white border border-gray-200">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                 <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
//                   {editingImage ? 'Modifier l\'image' : 'Ajouter une nouvelle image'}
//                 </h2>
//               </div>
              
//               <div className="p-6">
//                 <form onSubmit={handleUpload} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Titre</label>
//                       <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Catégorie</label>
//                       <select
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                         className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
//                       >
//                         {GALLERY_CATEGORIES.map(cat => (
//                           <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Description</label>
//                     <textarea
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       rows={3}
//                       className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors resize-none"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Image</label>
//                     <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#ff6b00] transition-colors cursor-pointer bg-gray-50">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileSelect}
//                         className="hidden"
//                         id="file-upload"
//                       />
//                       <label htmlFor="file-upload" className="cursor-pointer">
//                         <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
//                         <span className="text-sm text-gray-600 font-medium">
//                           {selectedFile ? selectedFile.name : 'Cliquez pour sélectionner une image'}
//                         </span>
//                       </label>
//                     </div>
//                   </div>
                  
//                   {previewUrl && (
//                     <div className="border-4 border-white shadow-lg overflow-hidden">
//                       <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
//                     </div>
//                   )}
                  
//                   <div className="flex gap-4 pt-4">
//                     <button
//                       type="submit"
//                       disabled={uploading}
//                       className="bg-[#ff6b00] text-white px-8 py-3 font-semibold hover:bg-orange-600 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 disabled:opacity-50 uppercase tracking-wide text-sm"
//                     >
//                       <Upload className="w-4 h-4" />
//                       <span>{uploading ? 'Envoi...' : editingImage ? 'Mettre à jour' : 'Publier'}</span>
//                     </button>
                    
//                     {editingImage && (
//                       <button
//                         type="button"
//                         onClick={resetGalleryForm}
//                         className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all uppercase tracking-wide text-sm"
//                       >
//                         Annuler
//                       </button>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </div>
            
//             <div className="bg-white border border-gray-200">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
//                 <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">Images de la galerie</h2>
//                 <span className="text-sm font-semibold text-[#ff6b00]">{galleryImages.length} image{galleryImages.length > 1 ? 's' : ''}</span>
//               </div>
              
//               {loading ? (
//                 <div className="p-12 text-center">
//                   <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6b00] animate-spin mx-auto"></div>
//                 </div>
//               ) : (
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {galleryImages.map((image) => (
//                       <div key={image.id} className="group border-2 border-gray-200 hover:border-[#ff6b00] transition-all overflow-hidden bg-white hover:shadow-lg">
//                         <div className="relative aspect-video overflow-hidden">
//                           <img src={image.image_url} alt={image.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                           <div className="absolute inset-0 bg-[#1a3a6b]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
//                             <button onClick={() => editImage(image)} className="bg-white text-[#1a3a6b] p-3 hover:bg-[#ff6b00] hover:text-white transition-all shadow-lg" title="Modifier">
//                               <Edit className="w-5 h-5" />
//                             </button>
//                             <button onClick={() => deleteImage(image)} className="bg-white text-red-600 p-3 hover:bg-red-600 hover:text-white transition-all shadow-lg" title="Supprimer">
//                               <Trash2 className="w-5 h-5" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="p-5">
//                           <span className="inline-block bg-[#ff6b00]/10 text-[#ff6b00] text-xs font-bold uppercase tracking-wider px-3 py-1 mb-3">{image.category}</span>
//                           <h3 className="text-base font-bold text-[#1a3a6b] mb-2">{image.title}</h3>
//                           {image.description && (
//                             <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{image.description}</p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {galleryImages.length === 0 && (
//                     <div className="text-center py-16">
//                       <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <p className="text-gray-500 font-semibold uppercase tracking-wide">Aucune image dans la galerie</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Documents Tab */}
//         {activeTab === 'documents' && (
//           <div className="space-y-8">
//             {/* Upload/Edit Form */}
//             <div className="bg-white border border-gray-200">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                 <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
//                   {editingDocument ? 'Modifier le document' : 'Ajouter un nouveau document'}
//                 </h2>
//               </div>
              
//               <div className="p-6">
//                 <form onSubmit={handleDocumentUpload} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
//                         Nom du document
//                       </label>
//                       <input
//                         type="text"
//                         value={docName}
//                         onChange={(e) => setDocName(e.target.value)}
//                         className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
//                         Catégorie
//                       </label>
//                       <select
//                         value={docCategory}
//                         onChange={(e) => setDocCategory(e.target.value)}
//                         className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
//                       >
//                         {DOCUMENT_CATEGORIES.map(cat => (
//                           <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
//                       Fichier (PDF, DOC, DOCX, XLS, XLSX)
//                     </label>
//                     <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#ff6b00] transition-colors cursor-pointer bg-gray-50">
//                       <input
//                         type="file"
//                         accept=".pdf,.doc,.docx,.xls,.xlsx"
//                         onChange={handleDocFileSelect}
//                         className="hidden"
//                         id="doc-file-upload"
//                       />
//                       <label htmlFor="doc-file-upload" className="cursor-pointer">
//                         <File className="w-8 h-8 text-gray-400 mx-auto mb-3" />
//                         <span className="text-sm text-gray-600 font-medium">
//                           {selectedDocFile ? selectedDocFile.name : 'Cliquez pour sélectionner un document'}
//                         </span>
//                         {selectedDocFile && (
//                           <span className="block text-xs text-gray-400 mt-1">
//                             {formatFileSize(selectedDocFile.size)}
//                           </span>
//                         )}
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div className="flex gap-4 pt-4">
//                     <button
//                       type="submit"
//                       disabled={uploadingDoc}
//                       className="bg-[#ff6b00] text-white px-8 py-3 font-semibold hover:bg-orange-600 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 disabled:opacity-50 uppercase tracking-wide text-sm"
//                     >
//                       <Upload className="w-4 h-4" />
//                       <span>{uploadingDoc ? 'Envoi...' : editingDocument ? 'Mettre à jour' : 'Publier'}</span>
//                     </button>
                    
//                     {editingDocument && (
//                       <button
//                         type="button"
//                         onClick={resetDocumentForm}
//                         className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all uppercase tracking-wide text-sm"
//                       >
//                         Annuler
//                       </button>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </div>
            
//             {/* Documents List */}
//             <div className="bg-white border border-gray-200">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
//                 <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
//                   Documents disponibles
//                 </h2>
//                 <span className="text-sm font-semibold text-[#ff6b00]">
//                   {documents.length} document{documents.length > 1 ? 's' : ''}
//                 </span>
//               </div>
              
//               {loading ? (
//                 <div className="p-12 text-center">
//                   <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6b00] animate-spin mx-auto"></div>
//                 </div>
//               ) : (
//                 <div className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {documents.map((doc) => (
//                       <div key={doc.id} className="group border-2 border-gray-200 hover:border-[#ff6b00] transition-all bg-white hover:shadow-lg p-5">
//                         <div className="flex items-start gap-4">
//                           <div className="w-12 h-12 bg-red-50 flex items-center justify-center flex-shrink-0">
//                             <FileText className="w-6 h-6 text-red-500" />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-[#1a3a6b] text-sm group-hover:text-[#ff6b00] transition-colors truncate">
//                               {doc.name}
//                             </h4>
//                             <div className="flex flex-wrap items-center gap-2 mt-2">
//                               <span className="text-xs bg-gray-100 px-2 py-0.5 font-medium">{doc.type}</span>
//                               <span className="text-xs text-gray-500">{doc.size}</span>
//                             </div>
//                             <span className="inline-block bg-[#ff6b00]/10 text-[#ff6b00] text-xs font-bold uppercase tracking-wider px-2 py-0.5 mt-2">
//                               {doc.category}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
//                           <button
//                             onClick={() => editDocument(doc)}
//                             className="flex-1 bg-[#1a3a6b] text-white px-3 py-2 text-xs font-semibold hover:bg-[#1a3a6b]/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
//                           >
//                             <Edit className="w-3 h-3" />
//                             Modifier
//                           </button>
//                           <button
//                             onClick={() => deleteDocument(doc)}
//                             className="flex-1 bg-red-50 text-red-600 px-3 py-2 text-xs font-semibold hover:bg-red-100 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
//                           >
//                             <Trash2 className="w-3 h-3" />
//                             Supprimer
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {documents.length === 0 && (
//                     <div className="text-center py-16">
//                       <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <p className="text-gray-500 font-semibold uppercase tracking-wide">Aucun document</p>
//                       <p className="text-gray-400 text-sm mt-2">Utilisez le formulaire ci-dessus pour ajouter des documents</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }


// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { 
  Upload, Trash2, Edit, Image as ImageIcon, Users, LayoutGrid, 
  LogOut, FileText, File, Building2, Route as Road, HardHat, 
  FlaskConical, Wrench, Zap, Package, Truck, Plus, 
  Handshake, Users as UsersIcon 
} from 'lucide-react'

type User = {
  id: number
  username: string
  email: string
  genre: string
  telephone: string
  created_at: string
  updated_at: string
}

type GalleryImage = {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  created_at: string
  updated_at: string
}

type Document = {
  id: number
  name: string
  type: string
  size: string
  category: string
  file_url: string
  created_at: string
  updated_at: string
}

type Service = {
  id?: number
  title: string
  description: string
  icon: string
  category: string
  created_at?: string
}

type Partner = {
  id?: number
  name: string
  logo: string
  website?: string
  created_at?: string
}

const GALLERY_CATEGORIES = ['Construction', 'Mining', 'Industrial', 'Electrical', 'Laboratory']
const DOCUMENT_CATEGORIES = ['Company', 'Legal', 'Quality', 'Safety', 'Technical']
const SERVICE_ICONS = ['Building2', 'Road', 'HardHat', 'FlaskConical', 'Wrench', 'Zap', 'Package', 'Truck']

// Mapping des icônes
const iconMap: Record<string, any> = {
  'Building2': Building2,
  'Road': Road,
  'HardHat': HardHat,
  'FlaskConical': FlaskConical,
  'Wrench': Wrench,
  'Zap': Zap,
  'Package': Package,
  'Truck': Truck,
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'gallery' | 'documents' | 'services' | 'partners'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [adminUser, setAdminUser] = useState<any>(null)
  
  // Gallery form state
  const [uploading, setUploading] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Construction')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  
  // Document form state
  const [uploadingDoc, setUploadingDoc] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  const [docName, setDocName] = useState('')
  const [docCategory, setDocCategory] = useState('Company')
  const [selectedDocFile, setSelectedDocFile] = useState<File | null>(null)

  // Services form state
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [serviceFormData, setServiceFormData] = useState<Service>({
    title: '',
    description: '',
    icon: 'Wrench',
    category: 'Civil'
  })

  // Partners form state
  const [uploadingPartner, setUploadingPartner] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [partnerName, setPartnerName] = useState('')
  const [partnerWebsite, setPartnerWebsite] = useState('')
  const [selectedPartnerLogo, setSelectedPartnerLogo] = useState<File | null>(null)
  const [partnerLogoPreview, setPartnerLogoPreview] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    const adminSession = document.cookie.includes('admin-session=authenticated')
    const storedAdmin = localStorage.getItem('admin-user')
    
    if (!adminSession || !storedAdmin) {
      router.push('/admin/login')
      return
    }

    setAdminUser(JSON.parse(storedAdmin))
    loadData()
  }, [router])

  const loadData = async () => {
    setLoading(true)
    await Promise.all([
      loadUsers(), 
      loadGallery(), 
      loadDocuments(), 
      loadServices(),
      loadPartners()
    ])
    setLoading(false)
  }

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const loadGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGalleryImages(data || [])
    } catch (error) {
      console.error('Error loading gallery:', error)
    }
  }

  const loadDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDocuments(data || [])
    } catch (error) {
      console.error('Error loading documents:', error)
    }
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
    }
  }

  const loadPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      
      if (data && data.length > 0) {
        setPartners(data)
      } else {
        // Partners par défaut
        setPartners([
          { id: 1, name: 'Bureau Veritas', logo: '/partners/bureau-veritas.png' },
          { id: 2, name: 'SGS', logo: '/partners/sgs.png' },
          { id: 3, name: 'ALS', logo: '/partners/als.png' },
          { id: 4, name: 'Intertek', logo: '/partners/intertek.png' },
          { id: 5, name: 'Eurofins', logo: '/partners/eurofins.png' },
          { id: 6, name: 'TÜV SÜD', logo: '/partners/tuv-sud.png' },
        ])
      }
    } catch (error) {
      console.error('Error loading partners:', error)
    }
  }

  const handleLogout = () => {
    document.cookie = 'admin-session=; path=/; max-age=0'
    localStorage.removeItem('admin-user')
    router.push('/admin/login')
  }

  const deleteUser = async (userId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
    
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) throw error
      
      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  // Gallery handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const resetGalleryForm = () => {
    setTitle('')
    setDescription('')
    setCategory('Construction')
    setSelectedFile(null)
    setPreviewUrl('')
    setEditingImage(null)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile && !editingImage) {
      alert('Veuillez sélectionner une image')
      return
    }

    setUploading(true)

    try {
      let imageUrl = editingImage?.image_url || ''

      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(fileName, selectedFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(fileName)

        imageUrl = publicUrl

        if (editingImage?.image_url) {
          const oldFileName = editingImage.image_url.split('/').pop()
          if (oldFileName) {
            await supabase.storage
              .from('gallery')
              .remove([oldFileName])
          }
        }
      }

      if (editingImage) {
        const { error } = await supabase
          .from('gallery_images')
          .update({
            title,
            description,
            category,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingImage.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert([{
            title,
            description,
            category,
            image_url: imageUrl
          }])

        if (error) throw error
      }

      resetGalleryForm()
      loadGallery()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Erreur lors de l\'upload de l\'image')
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (image: GalleryImage) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return

    try {
      const fileName = image.image_url.split('/').pop()
      if (fileName) {
        await supabase.storage
          .from('gallery')
          .remove([fileName])
      }

      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id)

      if (error) throw error

      setGalleryImages(galleryImages.filter(img => img.id !== image.id))
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const editImage = (image: GalleryImage) => {
    setEditingImage(image)
    setTitle(image.title)
    setDescription(image.description)
    setCategory(image.category)
    setPreviewUrl(image.image_url)
    setSelectedFile(null)
  }

  // Document handlers
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const handleDocFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedDocFile(file)
      if (!docName) {
        setDocName(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }

  const resetDocumentForm = () => {
    setDocName('')
    setDocCategory('Company')
    setSelectedDocFile(null)
    setEditingDocument(null)
  }

  const handleDocumentUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDocFile && !editingDocument) {
      alert('Veuillez sélectionner un fichier')
      return
    }

    setUploadingDoc(true)

    try {
      let fileUrl = editingDocument?.file_url || ''
      let fileType = editingDocument?.type || ''
      let fileSize = editingDocument?.size || ''

      if (selectedDocFile) {
        const fileExt = selectedDocFile.name.split('.').pop()?.toUpperCase() || 'FILE'
        const fileName = `${Date.now()}-${selectedDocFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, selectedDocFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(fileName)

        fileUrl = publicUrl
        fileType = fileExt
        fileSize = formatFileSize(selectedDocFile.size)

        if (editingDocument?.file_url) {
          const oldFileName = editingDocument.file_url.split('/').pop()
          if (oldFileName) {
            await supabase.storage
              .from('documents')
              .remove([oldFileName])
          }
        }
      }

      if (editingDocument) {
        const { error } = await supabase
          .from('documents')
          .update({
            name: docName,
            category: docCategory,
            type: fileType,
            size: fileSize,
            file_url: fileUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingDocument.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('documents')
          .insert([{
            name: docName,
            category: docCategory,
            type: fileType,
            size: fileSize,
            file_url: fileUrl
          }])

        if (error) throw error
      }

      resetDocumentForm()
      loadDocuments()
    } catch (error) {
      console.error('Error uploading document:', error)
      alert('Erreur lors de l\'upload du document')
    } finally {
      setUploadingDoc(false)
    }
  }

  const deleteDocument = async (document: Document) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) return

    try {
      const fileName = document.file_url.split('/').pop()
      if (fileName) {
        await supabase.storage
          .from('documents')
          .remove([fileName])
      }

      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', document.id)

      if (error) throw error

      setDocuments(documents.filter(doc => doc.id !== document.id))
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  const editDocument = (document: Document) => {
    setEditingDocument(document)
    setDocName(document.name)
    setDocCategory(document.category)
    setSelectedDocFile(null)
  }

  // Services handlers
  const resetServiceForm = () => {
    setServiceFormData({
      title: '',
      description: '',
      icon: 'Wrench',
      category: 'Civil'
    })
    setEditingService(null)
  }

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingService?.id) {
        const { error } = await supabase
          .from('services')
          .update({
            title: serviceFormData.title,
            description: serviceFormData.description,
            icon: serviceFormData.icon,
            category: serviceFormData.category
          })
          .eq('id', editingService.id)

        if (error) throw error

        setServices(services.map(s => 
          s.id === editingService.id ? { ...serviceFormData, id: editingService.id } : s
        ))
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert([serviceFormData])
          .select()

        if (error) throw error
        
        if (data) {
          setServices([...services, data[0]])
        }
      }

      resetServiceForm()
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Erreur lors de la sauvegarde du service')
    }
  }

  const deleteService = async (id: number) => {
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
    }
  }

  const editService = (service: Service) => {
    setEditingService(service)
    setServiceFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      category: service.category
    })
  }

  // Partners handlers
  const handlePartnerLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedPartnerLogo(file)
      const url = URL.createObjectURL(file)
      setPartnerLogoPreview(url)
    }
  }

  const resetPartnerForm = () => {
    setPartnerName('')
    setPartnerWebsite('')
    setSelectedPartnerLogo(null)
    setPartnerLogoPreview('')
    setEditingPartner(null)
  }

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPartnerLogo && !editingPartner) {
      alert('Veuillez sélectionner un logo')
      return
    }

    setUploadingPartner(true)

    try {
      let logoUrl = editingPartner?.logo || ''

      if (selectedPartnerLogo) {
        const fileExt = selectedPartnerLogo.name.split('.').pop()
        const fileName = `partner-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('partners')
          .upload(fileName, selectedPartnerLogo)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('partners')
          .getPublicUrl(fileName)

        logoUrl = publicUrl

        if (editingPartner?.logo) {
          const oldFileName = editingPartner.logo.split('/').pop()
          if (oldFileName) {
            await supabase.storage
              .from('partners')
              .remove([oldFileName])
          }
        }
      }

      if (editingPartner?.id) {
        const { error } = await supabase
          .from('partners')
          .update({
            name: partnerName,
            website: partnerWebsite || null,
            logo: logoUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPartner.id)

        if (error) throw error

        setPartners(partners.map(p => 
          p.id === editingPartner.id ? { ...p, name: partnerName, website: partnerWebsite, logo: logoUrl } : p
        ))
      } else {
        const { data, error } = await supabase
          .from('partners')
          .insert([{
            name: partnerName,
            website: partnerWebsite || null,
            logo: logoUrl
          }])
          .select()

        if (error) throw error
        
        if (data) {
          setPartners([...partners, data[0]])
        }
      }

      resetPartnerForm()
    } catch (error) {
      console.error('Error saving partner:', error)
      alert('Erreur lors de la sauvegarde du partenaire')
    } finally {
      setUploadingPartner(false)
    }
  }

  const deletePartner = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return

    try {
      const partner = partners.find(p => p.id === id)
      if (partner?.logo) {
        const fileName = partner.logo.split('/').pop()
        if (fileName) {
          await supabase.storage
            .from('partners')
            .remove([fileName])
        }
      }

      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPartners(partners.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting partner:', error)
    }
  }

  const editPartner = (partner: Partner) => {
    setEditingPartner(partner)
    setPartnerName(partner.name)
    setPartnerWebsite(partner.website || '')
    setPartnerLogoPreview(partner.logo)
    setSelectedPartnerLogo(null)
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || iconMap['Wrench']
    return <IconComponent className="w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1a3a6b] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#ff6b00] animate-pulse" />
            <h1 className="text-lg font-bold text-white tracking-wide uppercase">
              Administration
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-white/80 font-medium">
              {adminUser?.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-[#ff6b00] transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === 'users'
                  ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
                  : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Utilisateurs</span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === 'services'
                  ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
                  : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Services</span>
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === 'partners'
                  ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
                  : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span>Partenaires</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
                  : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Galerie</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-4 text-sm font-semibold uppercase tracking-wide transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-[#ff6b00] text-[#1a3a6b] bg-white'
                  : 'border-transparent text-gray-500 hover:text-[#1a3a6b]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">Total Utilisateurs</p>
                <p className="text-4xl font-bold text-[#1a3a6b]">{users.length}</p>
              </div>
              <div className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">Hommes</p>
                <p className="text-4xl font-bold text-[#1a3a6b]">{users.filter(u => u.genre === 'M').length}</p>
              </div>
              <div className="bg-gray-50 border-l-4 border-[#ff6b00] p-6 hover:shadow-lg transition-all hover:bg-white">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">Femmes</p>
                <p className="text-4xl font-bold text-[#1a3a6b]">{users.filter(u => u.genre === 'F').length}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">Liste des Utilisateurs</h2>
              </div>
              
              {loading ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-4 border-gray-200 rounded-full border-t-[#ff6b00] animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Genre</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Téléphone</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-[#1a3a6b] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">{user.id}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-[#1a3a6b]">{user.username}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                              user.genre === 'M' 
                                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                : 'bg-pink-50 text-pink-700 border border-pink-200'
                            }`}>
                              {user.genre === 'M' ? 'Homme' : 'Femme'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.telephone || '—'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={() => deleteUser(user.id)}
                              disabled={user.username === 'admin'}
                              className="text-red-600 hover:text-red-800 font-semibold text-xs uppercase tracking-wide disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              {user.username === 'admin' ? 'Admin' : 'Supprimer'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
                  {editingService ? 'Modifier le service' : 'Ajouter un nouveau service'}
                </h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleServiceSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                        Titre du service
                      </label>
                      <input
                        type="text"
                        value={serviceFormData.title}
                        onChange={(e) => setServiceFormData({...serviceFormData, title: e.target.value})}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        value={serviceFormData.category}
                        onChange={(e) => setServiceFormData({...serviceFormData, category: e.target.value})}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                        placeholder="Ex: Civil, Construction, Mining..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                        Icône
                      </label>
                      <select
                        value={serviceFormData.icon}
                        onChange={(e) => setServiceFormData({...serviceFormData, icon: e.target.value})}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                      >
                        {SERVICE_ICONS.map(iconName => (
                          <option key={iconName} value={iconName}>
                            {iconName}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-end">
                      <div className="bg-gray-50 border-2 border-gray-200 px-6 py-3 flex items-center gap-3">
                        {getIcon(serviceFormData.icon)}
                        <span className="text-sm text-gray-600 font-medium">Aperçu</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                      Description
                    </label>
                    <textarea
                      value={serviceFormData.description}
                      onChange={(e) => setServiceFormData({...serviceFormData, description: e.target.value})}
                      rows={4}
                      className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors resize-none"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="bg-[#ff6b00] text-white px-8 py-3 font-semibold hover:bg-orange-600 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 uppercase tracking-wide text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{editingService ? 'Mettre à jour' : 'Ajouter'}</span>
                    </button>
                    
                    {editingService && (
                      <button
                        type="button"
                        onClick={resetServiceForm}
                        className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all uppercase tracking-wide text-sm"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">Services disponibles</h2>
                <span className="text-sm font-semibold text-[#ff6b00]">{services.length} service{services.length > 1 ? 's' : ''}</span>
              </div>
              
              {loading ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6b00] animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <div key={service.id} className="group border-2 border-gray-200 hover:border-[#ff6b00] transition-all bg-white hover:shadow-lg p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#ff6b00]/10 flex items-center justify-center flex-shrink-0 text-[#ff6b00]">
                            {getIcon(service.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-[#1a3a6b] group-hover:text-[#ff6b00] transition-colors">
                              {service.title}
                            </h4>
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider px-2 py-0.5 mt-1">
                              {service.category || 'Non catégorisé'}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => editService(service)}
                            className="flex-1 bg-[#1a3a6b] text-white px-3 py-2 text-xs font-semibold hover:bg-[#1a3a6b]/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Modifier
                          </button>
                          <button
                            onClick={() => service.id && deleteService(service.id)}
                            className="flex-1 bg-red-50 text-red-600 px-3 py-2 text-xs font-semibold hover:bg-red-100 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {services.length === 0 && (
                    <div className="text-center py-16">
                      <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-semibold uppercase tracking-wide">Aucun service</p>
                      <p className="text-gray-400 text-sm mt-2">Utilisez le formulaire ci-dessus pour ajouter des services</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div className="space-y-8">
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
                  {editingPartner ? 'Modifier le partenaire' : 'Ajouter un nouveau partenaire'}
                </h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handlePartnerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                        Nom du partenaire
                      </label>
                      <input
                        type="text"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                        Site web (optionnel)
                      </label>
                      <input
                        type="url"
                        value={partnerWebsite}
                        onChange={(e) => setPartnerWebsite(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                      Logo du partenaire
                    </label>
                    <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#ff6b00] transition-colors cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePartnerLogoSelect}
                        className="hidden"
                        id="partner-logo-upload"
                      />
                      <label htmlFor="partner-logo-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <span className="text-sm text-gray-600 font-medium">
                          {selectedPartnerLogo ? selectedPartnerLogo.name : 'Cliquez pour sélectionner un logo'}
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  {partnerLogoPreview && (
                    <div className="border-4 border-white shadow-lg overflow-hidden w-32 h-32 mx-auto">
                      <img src={partnerLogoPreview} alt="Logo preview" className="w-full h-full object-contain bg-white p-2" />
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploadingPartner}
                      className="bg-[#ff6b00] text-white px-8 py-3 font-semibold hover:bg-orange-600 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 disabled:opacity-50 uppercase tracking-wide text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploadingPartner ? 'Envoi...' : editingPartner ? 'Mettre à jour' : 'Ajouter'}</span>
                    </button>
                    
                    {editingPartner && (
                      <button
                        type="button"
                        onClick={resetPartnerForm}
                        className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all uppercase tracking-wide text-sm"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">Partenaires</h2>
                <span className="text-sm font-semibold text-[#ff6b00]">{partners.length} partenaire{partners.length > 1 ? 's' : ''}</span>
              </div>
              
              {loading ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6b00] animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {partners.map((partner) => (
                      <div key={partner.id} className="group border-2 border-gray-200 hover:border-[#ff6b00] transition-all bg-white hover:shadow-lg p-6 text-center">
                        <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center p-4 mb-4 group-hover:shadow-md transition-all">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                const fallback = document.createElement('span')
                                fallback.className = 'text-3xl font-bold text-[#1a3a6b]'
                                fallback.textContent = partner.name.charAt(0)
                                parent.appendChild(fallback)
                              }
                            }}
                          />
                        </div>
                        <h4 className="font-bold text-[#1a3a6b] text-sm group-hover:text-[#ff6b00] transition-colors">
                          {partner.name}
                        </h4>
                        {partner.website && (
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                          >
                            Visiter
                          </a>
                        )}
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => editPartner(partner)}
                            className="flex-1 bg-[#1a3a6b] text-white px-3 py-2 text-xs font-semibold hover:bg-[#1a3a6b]/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Modifier
                          </button>
                          <button
                            onClick={() => partner.id && deletePartner(partner.id)}
                            className="flex-1 bg-red-50 text-red-600 px-3 py-2 text-xs font-semibold hover:bg-red-100 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {partners.length === 0 && (
                    <div className="text-center py-16">
                      <Handshake className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-semibold uppercase tracking-wide">Aucun partenaire</p>
                      <p className="text-gray-400 text-sm mt-2">Utilisez le formulaire ci-dessus pour ajouter des partenaires</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
                  {editingImage ? 'Modifier l\'image' : 'Ajouter une nouvelle image'}
                </h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Titre</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Catégorie</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                      >
                        {GALLERY_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">Image</label>
                    <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#ff6b00] transition-colors cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <span className="text-sm text-gray-600 font-medium">
                          {selectedFile ? selectedFile.name : 'Cliquez pour sélectionner une image'}
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  {previewUrl && (
                    <div className="border-4 border-white shadow-lg overflow-hidden">
                      <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="bg-[#ff6b00] text-white px-8 py-3 font-semibold hover:bg-orange-600 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 disabled:opacity-50 uppercase tracking-wide text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? 'Envoi...' : editingImage ? 'Mettre à jour' : 'Publier'}</span>
                    </button>
                    
                    {editingImage && (
                      <button
                        type="button"
                        onClick={resetGalleryForm}
                        className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all uppercase tracking-wide text-sm"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">Images de la galerie</h2>
                <span className="text-sm font-semibold text-[#ff6b00]">{galleryImages.length} image{galleryImages.length > 1 ? 's' : ''}</span>
              </div>
              
              {loading ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6b00] animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="group border-2 border-gray-200 hover:border-[#ff6b00] transition-all overflow-hidden bg-white hover:shadow-lg">
                        <div className="relative aspect-video overflow-hidden">
                          <img src={image.image_url} alt={image.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-[#1a3a6b]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <button onClick={() => editImage(image)} className="bg-white text-[#1a3a6b] p-3 hover:bg-[#ff6b00] hover:text-white transition-all shadow-lg" title="Modifier">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button onClick={() => deleteImage(image)} className="bg-white text-red-600 p-3 hover:bg-red-600 hover:text-white transition-all shadow-lg" title="Supprimer">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-5">
                          <span className="inline-block bg-[#ff6b00]/10 text-[#ff6b00] text-xs font-bold uppercase tracking-wider px-3 py-1 mb-3">{image.category}</span>
                          <h3 className="text-base font-bold text-[#1a3a6b] mb-2">{image.title}</h3>
                          {image.description && (
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{image.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {galleryImages.length === 0 && (
                    <div className="text-center py-16">
                      <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-semibold uppercase tracking-wide">Aucune image dans la galerie</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-8">
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
                  {editingDocument ? 'Modifier le document' : 'Ajouter un nouveau document'}
                </h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleDocumentUpload} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                        Nom du document
                      </label>
                      <input
                        type="text"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                        Catégorie
                      </label>
                      <select
                        value={docCategory}
                        onChange={(e) => setDocCategory(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-gray-700 font-medium focus:outline-none focus:border-[#ff6b00] transition-colors"
                      >
                        {DOCUMENT_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-[#1a3a6b] uppercase tracking-wide mb-2">
                      Fichier (PDF, DOC, DOCX, XLS, XLSX)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-[#ff6b00] transition-colors cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleDocFileSelect}
                        className="hidden"
                        id="doc-file-upload"
                      />
                      <label htmlFor="doc-file-upload" className="cursor-pointer">
                        <File className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <span className="text-sm text-gray-600 font-medium">
                          {selectedDocFile ? selectedDocFile.name : 'Cliquez pour sélectionner un document'}
                        </span>
                        {selectedDocFile && (
                          <span className="block text-xs text-gray-400 mt-1">
                            {formatFileSize(selectedDocFile.size)}
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploadingDoc}
                      className="bg-[#ff6b00] text-white px-8 py-3 font-semibold hover:bg-orange-600 transition-all inline-flex items-center gap-2 shadow-lg shadow-[#ff6b00]/20 disabled:opacity-50 uppercase tracking-wide text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{uploadingDoc ? 'Envoi...' : editingDocument ? 'Mettre à jour' : 'Publier'}</span>
                    </button>
                    
                    {editingDocument && (
                      <button
                        type="button"
                        onClick={resetDocumentForm}
                        className="border-2 border-[#1a3a6b] text-[#1a3a6b] px-8 py-3 font-semibold hover:bg-[#1a3a6b] hover:text-white transition-all uppercase tracking-wide text-sm"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#1a3a6b] uppercase tracking-wide">
                  Documents disponibles
                </h2>
                <span className="text-sm font-semibold text-[#ff6b00]">
                  {documents.length} document{documents.length > 1 ? 's' : ''}
                </span>
              </div>
              
              {loading ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6b00] animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="group border-2 border-gray-200 hover:border-[#ff6b00] transition-all bg-white hover:shadow-lg p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-red-50 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-[#1a3a6b] text-sm group-hover:text-[#ff6b00] transition-colors truncate">
                              {doc.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="text-xs bg-gray-100 px-2 py-0.5 font-medium">{doc.type}</span>
                              <span className="text-xs text-gray-500">{doc.size}</span>
                            </div>
                            <span className="inline-block bg-[#ff6b00]/10 text-[#ff6b00] text-xs font-bold uppercase tracking-wider px-2 py-0.5 mt-2">
                              {doc.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => editDocument(doc)}
                            className="flex-1 bg-[#1a3a6b] text-white px-3 py-2 text-xs font-semibold hover:bg-[#1a3a6b]/90 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteDocument(doc)}
                            className="flex-1 bg-red-50 text-red-600 px-3 py-2 text-xs font-semibold hover:bg-red-100 transition-colors uppercase tracking-wide flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {documents.length === 0 && (
                    <div className="text-center py-16">
                      <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-semibold uppercase tracking-wide">Aucun document</p>
                      <p className="text-gray-400 text-sm mt-2">Utilisez le formulaire ci-dessus pour ajouter des documents</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}