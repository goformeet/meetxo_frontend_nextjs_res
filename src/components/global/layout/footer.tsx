import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    const links = [
        { text: 'About', url: '/about'},
        { text: "Careers ", url: 'https://www.linkedin.com/company/meetxo/jobs/' },
        { text: "Team ", url: '/team ' },
        { text: "FAQ", url: '/faq' },
        { text: 'Experts', url: '/experts' },
        // { text: 'Help', url: 'intro.co/contact ' },
    ];
    const socialLinks = [
        {
            icon: "/images/linkedin-white.svg",
            url: "https://www.linkedin.com/company/meetxo/",
        },
        {
            icon: "/images/facebook.svg",
            url: "https://www.facebook.com/meetxo/",
        },
        {
            icon: "/images/instagram.svg",
            url: "https://www.instagram.com/meetxo.ai",
        },
        {
            icon: "/images/youtube.png",
            url: "https://www.youtube.com/@MeetXO",
        },
        {
            icon: "/images/twitter.svg",
            url: "https://x.com/meetxoAI",
        },
        {
            icon: "/images/reddit.png",
            url: "https://www.reddit.com/user/Dismal_Chipmunk4947/",
        }
    ];

    return (
        <footer className="bg-[url('/images/footer-bg.png')] text-white bg-cover bg-center pt-14 lg:pt-28 px-6 md:px-16 lg:px-28">
            <div className='grid grid-cols-1 lg:grid-cols-6 gap-5 md:gap-6 lg:gap-10'>
                <div className='md:col-span-4'>
                    <p className='text-2xl md:text-3xl lg:text-[56px]/[100%] font-semibold tracking-[-0.56px] max-w-[762px]'>Join MeetXO—where every conversation opens a new door.</p>
                </div>
                <div className='md:col-span-2 flex flex-col'>
                    <div className='flex gap-3.5 items-center'>
                        <div className='flex flex-shrink-0 justify-center items-center h-12 w-12 rounded-full bg-white'>
                            <Image src={'/images/map-pin-primary.svg'} alt='Location Icon' width={24} height={24} />
                        </div>
                        <p className='font-inter text-sm md:text-base/7'>
                            16192 Coastal
                            Highway, Lewes, Delaware 19958, County of Sussex, USA
                        </p>
                    </div>
                    <Link href={'mailto:info@meetxo.ai'} className='flex gap-3.5 items-center mt-7'>
                        <div className='flex flex-shrink-0 justify-center items-center h-12 w-12 rounded-full bg-white'>
                            <Image src={'/images/envelope-icon.svg'} alt='Envelope Icon' width={24} height={24} />
                        </div>
                        <p className='font-inter text-sm md:text-base/7'>
                            info@meetxo.ai
                        </p>
                    </Link>
                    <div className='flex justify-between items-center mt-12'>

                         <a href="https://play.google.com/store/apps/details?id=com.app.meetxo&pli=1" target="_blank" rel="noopener noreferrer">
                        <Image src={'/images/play-store.svg'} width={135} height={40} alt='Play Store Image' />
                        </a>
                        <a href="https://apps.apple.com/us/app/meetxo/id6741767901" target="_blank" rel="noopener noreferrer">
                            <Image src={'/images/app-store.svg'} width={135} height={40} alt='App Store Image' />
                        </a>
                        {/*                         <Image src={'/images/app-store.svg'} width={135} height={40} alt='App Store Image' /> */}
                    </div>
                </div>
            </div>
            <div className='py-5 border-b-2 border-[#FAFBFF] flex flex-col md:flex-row md:items-center gap-8 md:gap-4 justify-between relative'>
                <aside className='flex items-center gap-2'>
                    <Link href={'/'}>
                        <Image src='/images/meetxo-logo.png' width={1000} height={300} alt='logo' className='h-12 w-auto bg-white rounded-md' />
                    </Link>
                </aside>
                <nav>
                    <ul className='flex flex-wrap md:items-center md:justify-center gap-4 md:gap-8'>
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
                    {
                        socialLinks.map((link, index) => (
                            <Link key={index} href={link.url}>
                                <Image src={link.icon} height={20} width={20} alt='Social Logo' />
                            </Link>
                        ))
                    }
                </aside>
            </div>
            <div className='py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8'>
                <p className="text-base/normal font-inter">© MeetXO {new Date().getFullYear()}</p>
                <div className='flex flex-col md:flex-row gap-8 md:gap-[45px] items-center'>
                    <Link href={'/terms-of-service'}>Terms & Conditions</Link>
                    <Link href={'/privacy-policy'}>Privacy Policy</Link>
                    <Link href={'/refund-policy'}>Refund Policy</Link>
                </div>
            </div>
        </footer>
    )
}
