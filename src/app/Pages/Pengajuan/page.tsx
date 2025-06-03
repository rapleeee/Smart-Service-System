"use client"

import { SidebarLayout } from '@/app/layout/SidebarLayout'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PengajuanPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to pengajuan type selection page
    router.push('/Pages/PengajuanType')
  }, [router])

  return (
    <SidebarLayout>
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-blue-600"></div>
          <div className="h-4 w-4 animate-pulse rounded-full bg-blue-600 [animation-delay:0.2s]"></div>
          <div className="h-4 w-4 animate-pulse rounded-full bg-blue-600 [animation-delay:0.4s]"></div>
        </div>
      </div>
    </SidebarLayout>
  )
}