import React, { ReactNode } from 'react'
import { requireAuth } from '@/features/auth/actions'

async function ProtectedLayout({children} : {children : ReactNode}) {
    await requireAuth()
  return (
    <div className='min-h-svh'>{children}</div>
  )
}

export default ProtectedLayout