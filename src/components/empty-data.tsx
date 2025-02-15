import Image from 'next/image'
import React from 'react'

export default function EmptyData({ styles }: { styles?: string; }) {
  return (
      <div className={styles}>
          <Image src={'/images/empty-data.svg'} alt='empty data image' width={284} height={247} className='object-contain object-center mx-auto' />
    </div>
  )
}
