import Navigation from '@/components/global/layout/Navigation'
import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
      <>
          <Navigation />
            {children}
      </>
  )
}
