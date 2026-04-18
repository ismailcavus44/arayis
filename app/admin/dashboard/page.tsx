'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  FileText, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  BarChart3,
  TrendingUp,
  Calendar,
  UserCheck,
  MapPin,
  Layers,
} from 'lucide-react'
import {
  blogService,
  jobService,
  applicationService,
  evdeBakimCityService,
  utils,
  BlogPost,
  JobListing,
  EvdeBakimCityRecord,
} from '@/lib/admin'
import EvdeBakimServicesAdmin from '@/components/admin/EvdeBakimServicesAdmin'
import { supabase } from '@/lib/supabase'
import { isAllowedAdminUser } from '@/lib/admin-auth'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

function AdminDashboardInner() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const t = searchParams.get('tab')
    if (
      t === 'blog' ||
      t === 'jobs' ||
      t === 'applications' ||
      t === 'settings' ||
      t === 'dashboard' ||
      t === 'evde-cities' ||
      t === 'hizmetler'
    ) {
      setActiveTab(t)
    }
  }, [searchParams])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (cancelled) return
      if (!session?.user?.id || !isAllowedAdminUser(session.user.id)) {
        await supabase.auth.signOut()
        router.replace('/admin')
        return
      }
      setIsLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          <p className="mt-4 text-xs font-normal text-slate-500 sm:text-sm">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-sm font-normal leading-relaxed text-slate-700 antialiased">
      <header className="border-b border-slate-100/80 bg-white shadow-sm">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium tracking-tight text-slate-800 sm:text-[15px]">
                Aray-İş Admin Paneli
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center text-xs font-normal text-slate-500 transition-colors hover:text-red-600 sm:text-sm"
            >
              <LogOut size={18} className="mr-1.5 sm:mr-2" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <div className="flex gap-6 lg:gap-8">
          <div className="w-[250px] shrink-0">
            <nav className="rounded-2xl border border-slate-100/80 bg-white p-3 text-[13px] shadow-sm transition-shadow duration-300 hover:shadow-md md:p-4">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-all duration-200 ${
                    activeTab === 'dashboard'
                      ? 'bg-green-600 font-medium text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50/90'
                  }`}
                >
                  <BarChart3 size={17} className="mr-2.5 shrink-0 opacity-90" />
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('blog')}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-all duration-200 ${
                    activeTab === 'blog'
                      ? 'bg-green-600 font-medium text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50/90'
                  }`}
                >
                  <FileText size={17} className="mr-2.5 shrink-0 opacity-90" />
                  Blog Yazıları
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('jobs')}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-all duration-200 ${
                    activeTab === 'jobs'
                      ? 'bg-green-600 font-medium text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50/90'
                  }`}
                >
                  <Briefcase size={17} className="mr-2.5 shrink-0 opacity-90" />
                  İş İlanları
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('applications')}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-all duration-200 ${
                    activeTab === 'applications'
                      ? 'bg-green-600 font-medium text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50/90'
                  }`}
                >
                  <Users size={17} className="mr-2.5 shrink-0 opacity-90" />
                  Başvurular
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('hizmetler')}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-all duration-200 ${
                    activeTab === 'hizmetler'
                      ? 'bg-green-600 font-medium text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50/90'
                  }`}
                >
                  <Layers size={17} className="mr-2.5 shrink-0 opacity-90" />
                  Hizmet sayfaları
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('evde-cities')}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-all duration-200 ${
                    activeTab === 'evde-cities'
                      ? 'bg-green-600 font-medium text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50/90'
                  }`}
                >
                  <MapPin size={17} className="mr-2.5 shrink-0 opacity-90" />
                  Evde bakım illeri
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-[13px] font-normal transition-all duration-200 ${
                    activeTab === 'settings'
                      ? 'bg-green-600 font-medium text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50/90'
                  }`}
                >
                  <Settings size={17} className="mr-2.5 shrink-0 opacity-90" />
                  Ayarlar
                </button>
              </div>
            </nav>
          </div>

          <div className="min-w-0 flex-1 text-sm font-normal">
            {activeTab === 'dashboard' && (
              <DashboardOverview
                onOpenBlog={() => setActiveTab('blog')}
                onOpenJobs={() => setActiveTab('jobs')}
              />
            )}
            {activeTab === 'blog' && <BlogManagement />}
            {activeTab === 'jobs' && <JobManagement />}
            {activeTab === 'applications' && <ApplicationManagement />}
            {activeTab === 'hizmetler' && <EvdeBakimServicesAdmin />}
            {activeTab === 'evde-cities' && <EvdeBakimCitiesManagement />}
            {activeTab === 'settings' && <SettingsManagement />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
        </div>
      }
    >
      <AdminDashboardInner />
    </Suspense>
  )
}

 // Dashboard Overview Bileşeni
 function DashboardOverview({
   onOpenBlog,
   onOpenJobs,
 }: {
   onOpenBlog: () => void
   onOpenJobs: () => void
 }) {
   const [stats, setStats] = useState({
     totalBlogs: 0,
     totalJobs: 0,
     totalApplications: 0,
     recentApplications: 0
   })
   const [isLoading, setIsLoading] = useState(true)
   const [chartData, setChartData] = useState<any[]>([])
   const [jobTypeData, setJobTypeData] = useState<any[]>([])
   const [blogs, setBlogs] = useState<BlogPost[]>([])
   const [jobs, setJobs] = useState<JobListing[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Tüm verileri paralel olarak çek
      const [blogs, jobs, applications] = await Promise.all([
        blogService.getAll(),
        jobService.getAll(),
        applicationService.getAll()
      ])

      // İstatistikleri hesapla
      const totalBlogs = blogs.length
      const totalJobs = jobs.length
      const totalApplications = applications.length
      
      // Son 7 gündeki başvuruları hesapla
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const recentApplications = applications.filter(app => 
        new Date(app.created_at) > sevenDaysAgo
      ).length

      setStats({
        totalBlogs,
        totalJobs,
        totalApplications,
        recentApplications
      })

      // Son 6 ayın verilerini hazırla
      const monthlyData = []
      const currentDate = new Date()
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
        const monthName = date.toLocaleDateString('tr-TR', { month: 'short' })
        
        const monthApplications = applications.filter(app => {
          const appDate = new Date(app.created_at)
          return appDate.getMonth() === date.getMonth() && appDate.getFullYear() === date.getFullYear()
        }).length

        monthlyData.push({
          name: monthName,
          başvurular: monthApplications
        })
      }

      setChartData(monthlyData)

      // İş tipi dağılımını hesapla
      const jobTypeCounts: { [key: string]: number } = {}
      jobs.forEach(job => {
        jobTypeCounts[job.type] = (jobTypeCounts[job.type] || 0) + 1
      })

      const jobTypeChartData = Object.entries(jobTypeCounts).map(([type, count]) => ({
        name: type,
        value: count
      }))

             setJobTypeData(jobTypeChartData)

       // Blog ve iş ilanlarını set et
       setBlogs(blogs)
       setJobs(jobs)

     } catch (error) {
       console.error('Dashboard verileri yüklenirken hata:', error)
     } finally {
       setIsLoading(false)
     }
   }

  const COLORS = ['#16a34a', '#15803d', '#22c55e', '#f59e0b', '#64748b']

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="py-6 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          <p className="mt-3 text-xs font-normal text-slate-500">Dashboard yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 md:space-y-6">
      <div>
        <h1 className="text-xl font-medium tracking-tight text-slate-900 md:text-2xl">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-normal text-slate-500">Toplam Blog</p>
              <p className="text-2xl font-medium tabular-nums text-slate-900">{stats.totalBlogs}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <FileText size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-normal text-slate-500">Aktif İlan</p>
              <p className="text-2xl font-medium tabular-nums text-slate-900">{stats.totalJobs}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <Briefcase size={20} className="text-green-700" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-normal text-slate-500">Toplam Başvuru</p>
              <p className="text-2xl font-medium tabular-nums text-slate-900">{stats.totalApplications}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
              <Users size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-normal text-slate-500">Son 7 Gün</p>
              <p className="text-2xl font-medium tabular-nums text-slate-900">{stats.recentApplications}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
              <TrendingUp size={20} className="text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <h2 className="mb-2 bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-600 bg-clip-text text-base font-medium tracking-tight text-transparent md:text-lg">
            Aylık Başvuru Trendi
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b"
                  fontSize={11}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={11}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07)',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="başvurular" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <h2 className="mb-2 bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-600 bg-clip-text text-base font-medium tracking-tight text-transparent md:text-lg">
            İş Tipi Dağılımı
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jobTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#bbf7d0"
                  dataKey="value"
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.07)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-medium tracking-tight text-slate-900">Son Blog Yazıları</h2>
            <button
              type="button"
              onClick={onOpenBlog}
              className="shrink-0 text-xs font-normal text-green-600 transition-colors hover:text-green-800"
            >
              Tümünü Gör →
            </button>
          </div>
          <div className="space-y-2">
            {blogs.slice(0, 5).map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100/60 bg-slate-50/80 p-3"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[13px] font-normal text-slate-800">{blog.title}</h4>
                  <p className="text-xs font-normal text-slate-500">{utils.formatDate(blog.created_at || '')}</p>
                </div>
                <div className="shrink-0">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm ring-1 ring-slate-100 transition-colors hover:bg-emerald-50 hover:text-green-800"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
            {blogs.length === 0 && (
              <div className="py-4 text-center text-slate-500">Henüz blog yazısı bulunmuyor.</div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-7">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-medium tracking-tight text-slate-900">Son İş İlanları</h2>
            <button
              type="button"
              onClick={onOpenJobs}
              className="shrink-0 text-xs font-normal text-green-600 transition-colors hover:text-green-800"
            >
              Tümünü Gör →
            </button>
          </div>
          <div className="space-y-2">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100/60 bg-slate-50/80 p-3"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-[13px] font-normal text-slate-800">{job.title}</h4>
                  <p className="text-xs font-normal text-slate-600">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-[11px] font-normal text-slate-500">{utils.formatDate(job.created_at || '')}</p>
                </div>
                <div className="shrink-0">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm ring-1 ring-slate-100 transition-colors hover:bg-emerald-50 hover:text-green-800"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
            {jobs.length === 0 && (
              <div className="py-4 text-center text-slate-500">Henüz iş ilanı bulunmuyor.</div>
            )}
          </div>
        </div>
      </div>
     </div>
   )
 }

// Blog Yönetimi Bileşeni
function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const data = await blogService.getAll()
      setBlogs(data)
    } catch (error) {
      console.error('Blog yazıları yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      try {
        await blogService.delete(id)
        fetchBlogs()
        alert('Blog yazısı başarıyla silindi!')
      } catch (error) {
        console.error('Blog yazısı silinirken hata:', error)
        alert('Blog yazısı silinirken bir hata oluştu.')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
        <div className="text-center py-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          <p className="mt-3 text-xs font-normal text-slate-500">Blog yazıları yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium tracking-tight text-slate-900">Blog Yazıları</h2>
          <Link
            href="/admin/blog/editor"
            className="flex items-center rounded-xl bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
          >
            <Plus size={16} className="mr-1.5" />
            Yeni yazı
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Başlık</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Slug</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Tarih</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-gray-100">
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">{blog.title}</td>
                  <td className="px-4 py-2 text-xs font-normal text-slate-500">{blog.slug}</td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-600">{utils.formatDate(blog.created_at || '')}</td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">
                    <div className="flex space-x-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-green-600 hover:text-green-800"
                        title="Sitede görüntüle"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/blog/editor?id=${blog.id}`}
                        className="inline-flex text-emerald-800 hover:text-emerald-950"
                        title="Düzenle"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog.id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {blogs.length === 0 && (
          <div className="py-6 text-center text-xs font-normal text-slate-500">
            Henüz blog yazısı bulunmuyor.
          </div>
        )}
      </div>

  )
}

// İş İlanları Yönetimi Bileşeni
function JobManagement() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingJob, setEditingJob] = useState<JobListing | null>(null)
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    slug: '',
    meta_title: '',
    meta_description: '',
  })

  const emptyJobForm = {
    title: '',
    company: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    slug: '',
    meta_title: '',
    meta_description: '',
  }

  const resolveJobSlug = () => {
    const manual = jobForm.slug.trim()
    const fromManual = manual ? utils.createSlug(manual) : ''
    const fromTitle = utils.createSlug(jobForm.title)
    return fromManual || fromTitle
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const data = await jobService.getAll()
      setJobs(data)
    } catch (error) {
      console.error('İş ilanları yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const slug = resolveJobSlug()
      if (!slug) {
        alert('URL slug için pozisyon başlığı girin veya slug alanını doldurun.')
        return
      }
      const metaTitle = jobForm.meta_title.trim()
      const metaDesc = jobForm.meta_description.trim()
      const newJob: JobListing = {
        title: jobForm.title,
        company: jobForm.company,
        location: jobForm.location,
        type: jobForm.type,
        experience: jobForm.experience,
        salary: jobForm.salary,
        description: jobForm.description,
        requirements: jobForm.requirements.split(',').map((r) => r.trim()).filter(Boolean),
        responsibilities: jobForm.responsibilities.split(',').map((r) => r.trim()).filter(Boolean),
        benefits: jobForm.benefits.split(',').map((b) => b.trim()).filter(Boolean),
        slug,
        meta_title: metaTitle || null,
        meta_description: metaDesc || null,
      }
      await jobService.create(newJob)
      setShowAddModal(false)
      setJobForm(emptyJobForm)
      fetchJobs()
      alert('İş ilanı başarıyla eklendi!')
    } catch (error) {
      console.error('İş ilanı eklenirken hata:', error)
      alert('İş ilanı eklenirken bir hata oluştu.')
    }
  }

  const handleEditJob = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingJob?.id) return
    
    try {
      const slug = resolveJobSlug()
      if (!slug) {
        alert('URL slug için pozisyon başlığı girin veya slug alanını doldurun.')
        return
      }
      const metaTitle = jobForm.meta_title.trim()
      const metaDesc = jobForm.meta_description.trim()
      const updatedJob: Partial<JobListing> = {
        title: jobForm.title,
        company: jobForm.company,
        location: jobForm.location,
        type: jobForm.type,
        experience: jobForm.experience,
        salary: jobForm.salary,
        description: jobForm.description,
        requirements: jobForm.requirements.split(',').map((r) => r.trim()).filter(Boolean),
        responsibilities: jobForm.responsibilities.split(',').map((r) => r.trim()).filter(Boolean),
        benefits: jobForm.benefits.split(',').map((b) => b.trim()).filter(Boolean),
        slug,
        meta_title: metaTitle || null,
        meta_description: metaDesc || null,
      }
      await jobService.update(editingJob.id, updatedJob)
      setShowEditModal(false)
      setEditingJob(null)
      setJobForm(emptyJobForm)
      fetchJobs()
      alert('İş ilanı başarıyla güncellendi!')
    } catch (error) {
      console.error('İş ilanı güncellenirken hata:', error)
      alert('İş ilanı güncellenirken bir hata oluştu.')
    }
  }

  const openEditModal = (job: JobListing) => {
    setEditingJob(job)
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      experience: job.experience || '',
      salary: job.salary || '',
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : '',
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join(', ') : '',
      benefits: Array.isArray(job.benefits) ? job.benefits.join(', ') : '',
      slug: job.slug || '',
      meta_title: job.meta_title ?? '',
      meta_description: job.meta_description ?? '',
    })
    setShowEditModal(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Bu iş ilanını silmek istediğinizden emin misiniz?')) {
      try {
        await jobService.delete(id)
        fetchJobs()
        alert('İş ilanı başarıyla silindi!')
      } catch (error) {
        console.error('İş ilanı silinirken hata:', error)
        alert('İş ilanı silinirken bir hata oluştu.')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
        <div className="text-center py-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          <p className="mt-3 text-xs font-normal text-slate-500">İş ilanları yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium tracking-tight text-slate-900">İş İlanları</h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center rounded-xl bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
          >
            <Plus size={16} className="mr-1.5" />
            Yeni İlan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Pozisyon</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Şirket</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Lokasyon</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Tarih</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-100">
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">{job.title}</td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">{job.company}</td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">{job.location}</td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-600">{utils.formatDate(job.created_at || '')}</td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">
                    <div className="flex space-x-2">
                      <Link
                        href={`/is-ilanlari/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-green-600 hover:text-green-800"
                        title="Sitede görüntüle"
                      >
                        <Eye size={16} />
                      </Link>
                      <button 
                        onClick={() => openEditModal(job)}
                        className="text-emerald-800 hover:text-emerald-950"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(job.id!)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {jobs.length === 0 && (
          <div className="py-6 text-center text-xs font-normal text-slate-500">
            Henüz iş ilanı bulunmuyor.
          </div>
        )}
      </div>

      {/* İş İlanı Ekleme Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-medium leading-snug text-slate-900">Yeni İş İlanı</h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setJobForm(emptyJobForm)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Pozisyon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="Pozisyon adı"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Şirket <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.company}
                      onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="Şirket adı"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Lokasyon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="Şehir, ilçe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      İş Tipi <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={jobForm.type}
                      onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Tam Zamanlı">Tam Zamanlı</option>
                      <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                      <option value="Uzaktan">Uzaktan</option>
                      <option value="Staj">Staj</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Maaş
                    </label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="15.000 - 20.000 TL"
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">SEO ve URL</p>
                  <div>
                    <label className="mb-2 block text-xs font-normal text-slate-600">
                      URL slug <span className="font-normal text-slate-400">(boşsa başlıktan üretilir)</span>
                    </label>
                    <input
                      type="text"
                      value={jobForm.slug}
                      onChange={(e) => setJobForm({ ...jobForm, slug: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm font-normal text-slate-800 focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
                      placeholder="ornek-pozisyon-adi"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-normal text-slate-600">Meta başlık</label>
                    <input
                      type="text"
                      value={jobForm.meta_title}
                      onChange={(e) => setJobForm({ ...jobForm, meta_title: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
                      placeholder="Arama sonuçlarında görünen başlık"
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-normal text-slate-600">Meta açıklama</label>
                    <textarea
                      rows={2}
                      value={jobForm.meta_description}
                      onChange={(e) => setJobForm({ ...jobForm, meta_description: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
                      placeholder="Arama sonuçlarında görünen kısa açıklama"
                      maxLength={500}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    İş Tanımı <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={jobForm.description}
                    onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="İş tanımı ve detayları..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    Aranan Özellikler (virgülle ayırın)
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="Deneyim, React, TypeScript, vb."
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    Yapılacak İşler (virgülle ayırın)
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.responsibilities}
                    onChange={(e) => setJobForm({...jobForm, responsibilities: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="Görev ve sorumluluklar..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    Sunduğumuz Faydalar (virgülle ayırın)
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.benefits}
                    onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="Sigorta, yemek, esnek saatler, vb."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      setJobForm(emptyJobForm)
                    }}
                    className="flex-1 rounded-xl border border-gray-200 px-6 py-3 text-gray-700 transition-all duration-200 hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* İş İlanı Düzenleme Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-medium leading-snug text-slate-900">İş İlanını Düzenle</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingJob(null)
                    setJobForm(emptyJobForm)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleEditJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Pozisyon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="Pozisyon adı"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Şirket <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.company}
                      onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="Şirket adı"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Lokasyon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.location}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="Şehir, ilçe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      İş Tipi <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={jobForm.type}
                      onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Tam Zamanlı">Tam Zamanlı</option>
                      <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                      <option value="Uzaktan">Uzaktan</option>
                      <option value="Staj">Staj</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-2">
                      Maaş
                    </label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                      placeholder="15.000 - 20.000 TL"
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">SEO ve URL</p>
                  <div>
                    <label className="mb-2 block text-xs font-normal text-slate-600">
                      URL slug <span className="font-normal text-slate-400">(boşsa başlıktan üretilir)</span>
                    </label>
                    <input
                      type="text"
                      value={jobForm.slug}
                      onChange={(e) => setJobForm({ ...jobForm, slug: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm font-normal text-slate-800 focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
                      placeholder="ornek-pozisyon-adi"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-normal text-slate-600">Meta başlık</label>
                    <input
                      type="text"
                      value={jobForm.meta_title}
                      onChange={(e) => setJobForm({ ...jobForm, meta_title: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
                      placeholder="Arama sonuçlarında görünen başlık"
                      maxLength={255}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-normal text-slate-600">Meta açıklama</label>
                    <textarea
                      rows={2}
                      value={jobForm.meta_description}
                      onChange={(e) => setJobForm({ ...jobForm, meta_description: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
                      placeholder="Arama sonuçlarında görünen kısa açıklama"
                      maxLength={500}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    İş Tanımı <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={jobForm.description}
                    onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="İş tanımı ve detayları..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    Aranan Özellikler (virgülle ayırın)
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="Deneyim, React, TypeScript, vb."
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    Yapılacak İşler (virgülle ayırın)
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.responsibilities}
                    onChange={(e) => setJobForm({...jobForm, responsibilities: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="Görev ve sorumluluklar..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    Sunduğumuz Faydalar (virgülle ayırın)
                  </label>
                  <textarea
                    rows={3}
                    value={jobForm.benefits}
                    onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
                    placeholder="Sigorta, yemek, esnek saatler, vb."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false)
                      setEditingJob(null)
                      setJobForm(emptyJobForm)
                    }}
                    className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700"
                  >
                    Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Başvuru Yönetimi Bileşeni
function ApplicationManagement() {
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const data = await applicationService.getAll()
      setApplications(data)
    } catch (error) {
      console.error('Başvurular yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) {
      try {
        await applicationService.delete(id)
        fetchApplications()
        alert('Başvuru başarıyla silindi!')
      } catch (error) {
        console.error('Başvuru silinirken hata:', error)
        alert('Başvuru silinirken bir hata oluştu.')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
        <div className="text-center py-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          <p className="mt-3 text-xs font-normal text-slate-500">Başvurular yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium tracking-tight text-slate-900">İş Başvuruları</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Ad Soyad</th>
              <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Pozisyon</th>
              <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">E-posta</th>
              <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Tarih</th>
              <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-gray-100">
                <td className="px-4 py-2 text-[13px] font-normal text-slate-700">{app.first_name} {app.last_name}</td>
                <td className="px-4 py-2 text-[13px] font-normal text-slate-700">{app.job_listings?.title || 'Bilinmiyor'}</td>
                <td className="px-4 py-2 text-[13px] font-normal text-slate-700">{app.email}</td>
                <td className="px-4 py-2 text-[13px] font-normal text-slate-600">{utils.formatDate(app.created_at || '')}</td>
                <td className="px-4 py-2 text-[13px] font-normal text-slate-700">
                  <div className="flex space-x-2">
                    <button type="button" className="text-green-600 hover:text-green-800">
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="py-6 text-center text-xs font-normal text-slate-500">
          Henüz başvuru bulunmuyor.
        </div>
      )}
    </div>
  )
}

function EvdeBakimCitiesManagement() {
  const [rows, setRows] = useState<EvdeBakimCityRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<EvdeBakimCityRecord | null>(null)
  const [form, setForm] = useState({
    city_name: '',
    city_key: '',
    locative: '',
    locative_ki: '',
    sort_order: '0',
  })

  const fetchRows = async () => {
    try {
      setIsLoading(true)
      const data = await evdeBakimCityService.getAll()
      setRows(data)
    } catch (e) {
      console.error('İller yüklenirken hata:', e)
      alert('İl listesi yüklenemedi. Supabase’de evde_bakim_cities tablosu ve RLS politikalarını kontrol edin.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRows()
  }, [])

  const openAdd = () => {
    setEditing(null)
    setForm({
      city_name: '',
      city_key: '',
      locative: '',
      locative_ki: '',
      sort_order: String(rows.length),
    })
    setShowModal(true)
  }

  const openEdit = (r: EvdeBakimCityRecord) => {
    setEditing(r)
    setForm({
      city_name: r.city_name,
      city_key: r.city_key,
      locative: r.locative,
      locative_ki: r.locative_ki,
      sort_order: String(r.sort_order ?? 0),
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditing(null)
    setForm({ city_name: '', city_key: '', locative: '', locative_ki: '', sort_order: '0' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = form.city_name.trim()
    let key = form.city_key.trim().toLowerCase()
    if (!key && name) key = utils.evdeBakimCityKeyFromName(name)
    if (!/^[a-z0-9]+$/.test(key) || key.length < 2) {
      alert('URL anahtarı yalnızca küçük harf ve rakam içermeli, en az 2 karakter; tire kullanılamaz.')
      return
    }
    const loc = form.locative.trim()
    const locKi = form.locative_ki.trim()
    if (!name || !loc || !locKi) {
      alert('İl adı, bulunma hali ve -ki hali zorunludur.')
      return
    }
    const sort_order = Number.parseInt(form.sort_order, 10)
    const so = Number.isFinite(sort_order) ? sort_order : 0

    try {
      if (editing?.id != null) {
        await evdeBakimCityService.update(editing.id, {
          city_key: key,
          city_name: name,
          locative: loc,
          locative_ki: locKi,
          sort_order: so,
        })
        alert('İl güncellendi.')
      } else {
        await evdeBakimCityService.create({
          city_key: key,
          city_name: name,
          locative: loc,
          locative_ki: locKi,
          sort_order: so,
        })
        alert('İl eklendi.')
      }
      closeModal()
      fetchRows()
    } catch (err) {
      console.error(err)
      alert('Kayıt başarısız. Anahtar benzersiz olmalı (aynı il iki kez eklenemez).')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bu ili kaldırmak, tüm hizmet türlerindeki şehir sayfalarını (ör. yaşlı/hasta bakıcısı) kaldırır. Emin misiniz?')) return
    try {
      await evdeBakimCityService.delete(id)
      fetchRows()
      alert('İl silindi.')
    } catch (err) {
      console.error(err)
      alert('Silinemedi.')
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
        <div className="text-center py-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          <p className="mt-3 text-xs font-normal text-slate-500">İller yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-6">
          <div>
            <h2 className="text-lg font-medium tracking-tight text-slate-900">Evde bakım — il sayfaları</h2>
            <p className="mt-1 text-xs font-normal leading-relaxed text-slate-600">
              İl listesi ve URL anahtarları. Yaşlı / hasta bakıcı sayfa metinlerini «Hizmet sayfaları» sekmesinden düzenlersiniz.
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="flex shrink-0 items-center justify-center rounded-xl bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
          >
            <Plus size={16} className="mr-1.5" />
            İl ekle
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Sıra</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">İl</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">URL anahtarı</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">Örnek URL</th>
                <th className="px-4 py-2 text-left text-xs font-normal uppercase tracking-wide text-slate-500">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-600">{r.sort_order}</td>
                  <td className="px-4 py-2 text-[13px] font-medium text-slate-900">{r.city_name}</td>
                  <td className="px-4 py-2 font-mono text-[11px] font-normal text-slate-500">{r.city_key}</td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">
                    <a
                      href={`/hizmetlerimiz/${r.city_key}-yasli-bakicisi`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 hover:underline"
                    >
                      Yaşlı bakıcısı
                    </a>
                    <span className="mx-1 text-gray-300">·</span>
                    <a
                      href={`/hizmetlerimiz/${r.city_key}-hasta-bakicisi`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 hover:underline"
                    >
                      Hasta bakıcısı
                    </a>
                  </td>
                  <td className="px-4 py-2 text-[13px] font-normal text-slate-700">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => openEdit(r)}
                        className="text-emerald-800 hover:text-emerald-950"
                        title="Düzenle"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => r.id != null && handleDelete(r.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="py-6 text-center text-xs font-normal text-slate-500">
            Henüz il yok. Veritabanında tablo yoksa SQL yamasını çalıştırın.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-medium leading-snug text-slate-900">{editing ? 'İli düzenle' : 'İl ekle'}</h3>
                <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">İl adı (görünen)</label>
                  <input
                    type="text"
                    required
                    value={form.city_name}
                    onChange={(e) => setForm({ ...form, city_name: e.target.value })}
                    onBlur={() => {
                      if (!editing && !form.city_key.trim() && form.city_name.trim()) {
                        setForm((f) => ({
                          ...f,
                          city_key: utils.evdeBakimCityKeyFromName(f.city_name),
                        }))
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600"
                    placeholder="Örn. Ankara"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">
                    URL anahtarı <span className="text-gray-400 font-normal">(küçük harf, rakam, tire yok)</span>
                  </label>
                  <input
                    type="text"
                    value={form.city_key}
                    onChange={(e) => setForm({ ...form, city_key: e.target.value.toLowerCase() })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm font-normal text-slate-800 focus:border-green-600 focus:ring-2 focus:ring-green-500/25"
                    placeholder="ankara"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">Bulunma hali (metin içinde)</label>
                  <input
                    type="text"
                    required
                    value={form.locative}
                    onChange={(e) => setForm({ ...form, locative: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600"
                    placeholder="Ankara'da"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">“-ki” hali (ör. Ankara’daki)</label>
                  <input
                    type="text"
                    required
                    value={form.locative_ki}
                    onChange={(e) => setForm({ ...form, locative_ki: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600"
                    placeholder="Ankara'daki"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-slate-600 mb-2">Sıra</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button type="submit" className="flex-1 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700">
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Ayarlar Yönetimi Bileşeni
function SettingsManagement() {
  return (
    <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8">
      <h2 className="mb-5 text-lg font-medium tracking-tight text-slate-900">Ayarlar</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-base font-medium leading-snug text-slate-900">Site Ayarları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-normal text-slate-600 mb-2">
                Site Başlığı
              </label>
              <input
                type="text"
                defaultValue="Aray-İş"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-slate-600 mb-2">
                İletişim E-posta
              </label>
              <input
                type="email"
                defaultValue="info@arayis.com"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base font-medium leading-snug text-slate-900">Admin Hesabı</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-normal text-slate-600 mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-slate-600 mb-2">
                Yeni Şifre
              </label>
              <input
                type="password"
                placeholder="Şifre değiştirmek için yazın"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:ring-2 focus:ring-green-500/25 focus:border-green-600 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="rounded-xl bg-green-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">
            Ayarları Kaydet
          </button>
        </div>
      </div>
    </div>
  )
}
