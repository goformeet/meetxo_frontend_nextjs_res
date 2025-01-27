import Navigation from '@/components/global/layout/navigation'
import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
      <>
          <Navigation />
            {children}
      </>
  )
}
