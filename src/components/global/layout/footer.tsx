import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    const links = [
        { text: "Overview", url: '/overview' },
        { text: "Features", url: '/features' },
        { text: "Categories", url: '/categories' },
        { text: 'Careers', url: '/careers' },
        { text: 'Help', url: '/help' },
    ]
    return (
        <footer className="bg-[url('/images/footer-bg.png')] text-white bg-cover bg-center pt-28 px-28">
            <div className='grid grid-cols-1 md:grid-cols-6 gap-10'>
                <div className='md:col-span-4'>
                    <p className=' text-[56px] font-semibold leading-[115%] tracking-[-0.56px] max-w-[762px]'>Let’s join MeetXO,
                        Lorem ipsum sit amet dol</p>
                </div>
                <div className='md:col-span-2 flex flex-col'>
                    <div className='flex gap-3.5 items-center'>
                        <div className='flex flex-shrink-0 justify-center items-center h-12 w-12 rounded-full bg-white'>
                            <Image src={'/images/map-pin-primary.svg'} alt='Location Icon' width={24} height={24} />
                        </div>
                        <p className='font-inter text-base/7'>
                            1929, Bancangan, Sambit,
                            Suroboyo, Wakanda
                        </p>
                    </div>
                    <div className='flex gap-3.5 items-center mt-7'>
                        <div className='flex flex-shrink-0 justify-center items-center h-12 w-12 rounded-full bg-white'>
                            <Image src={'/images/envelope-icon.svg'} alt='Envelope Icon' width={24} height={24} />
                        </div>
                        <p className='font-inter text-base/7'>
                            hello@meetxo.com
                        </p>
                    </div>
                    <div className='flex justify-between items-center mt-12'>
                        <Image src={'/images/play-store.svg'} width={135} height={40} alt='Play Store Image' />
                        <Image src={'/images/app-store.svg'} width={135} height={40} alt='App Store Image' />
                    </div>
                </div>
            </div>
            <div className='py-5 border-b-2 border-[#FAFBFF] flex items-center justify-between relative'>
                <aside className='flex items-center gap-2'>
                    <Image src='/images/meetxo-logo.png' width={42} height={42} alt='logo' />
                    <span className='text-3xl md:text-[39px] leading-normal tracking-[0.144px] font-extrabold font-inter text-white'>MeetXO</span>
                </aside>
                <nav className='absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
                    <ul className='flex items-center justify-center gap-8'>
                        {
                            links.map((link) => (
                                <li key={link.url}>
                                    <Link href={link.url}>{link.text}</Link>
                                </li>
                            ))
                        }

                    </ul>
                </nav>
                <aside className='flex items-center gap-6'>
                    <Image src={'/images/facebook.svg'} height={20} width={20} alt='Facebook Logo' />
                    <Image src={'/images/twitter.svg'} height={20} width={20} alt='Twitter Logo' />
                    <Image src={'/images/instagram.svg'} height={20} width={20} alt='Instegram Logo' />
                    <Image src={'/images/linkedin-white.svg'} height={20} width={20} alt='Instegram Logo' />
                </aside>
            </div>
            <div className='py-10 flex justify-between'>
                <p className='text-base/normal font-inter'>© Lorem ipsum sit</p>
                <div className='flex gap-[45px] items-center'>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </footer>
    )
}
