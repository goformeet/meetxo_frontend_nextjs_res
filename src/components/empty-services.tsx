import Image from 'next/image';
import React from 'react'

export default function EmptyServices({ styles }: { styles?: string; }) {
  return (
      <div className={styles}>
          <Image src={'/images/empty-services.png'} alt='empty data image' width={329} height={307} className='object-contain object-center mx-auto' />
    </div>
  )
}
