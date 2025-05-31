"use client"
import React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface MenuLinkProps {
    href: string;
    children: React.ReactNode;
}

// Social links and navigation links (updated)
const socialLinks = [
    { name: "Twitter", socialUrl: "https://twitter.com/reymon359" },
    { name: "GitHub", socialUrl: "https://github.com/reymon359" },
    { name: "Mapmelon", socialUrl: "https://www.mapmelon.com/reymon359/" },
    { name: "LinkedIn", socialUrl: "https://www.linkedin.com/in/ramon-morcillo/" },
]

const pages = [
    { name: "Index", href: "/", ariaCurrent: true },
    { name: "works", href: "/works" },
    { name: "about", href: "/about" },
    { name: "Contact", href: "mailto:hey@ramonmorcillo.com?subject=Hi%20there!", external: true },
]


function MenuLink({ href, children }: MenuLinkProps) {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
    return (
        <Link
            href={href}
            className={`menu-link relative text-[#ddd] font-normal pointer-events-auto transition-colors duration-100 leading-[1em] border-b-0 hover:underline${isActive ? ' active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
}


const Navigation: React.FC = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            {/* Logo: fixed top left on desktop, bottom in nav on mobile */}
            {/* Desktop logo */}
            <div className="hidden md:block fixed top-0 left-0 z-20 px-20 py-16">
                <Link href="/" className="block w-10 hover:scale-110 transition">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 22 22"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white fill-current"
                    >
                        <path d="M11 21.5C5.201 21.5.5 16.799.5 11S5.201.5 11 .5 21.5 5.201 21.5 11 16.799 21.5 11 21.5zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19z" />
                    </svg>
                </Link>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 w-full z-30 print:hidden">
                {/* Toggle Menu: only visible on mobile */}
                <div
                    className="flex flex-col justify-between items-end w-7 h-[15px] cursor-pointer md:hidden absolute right-8 top-4"
                    onClick={() => setOpen(!open)}
                >
                    <span className={`h-[1px] bg-white transition-all ${open ? "w-[60%]" : "w-full"}`} />
                    <span className={`h-[1px] bg-white transition-all ${open ? "w-full" : "w-[60%] mr-[20%]"}`} />
                    <span className={`h-[1px] bg-white transition-all ${open ? "w-[60%]" : "w-full"}`} />
                </div>

                {/* Menu Section: always visible on desktop, expandable on mobile */}
                <div
                    className={`bg-primary-dark px-20 py-12 
            ${open ? 'max-h-[300px]' : 'max-h-0'}
            overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.45,0,0.1,1)]
            md:max-h-none md:overflow-visible md:transition-none
          `}
                    style={{ maxHeight: undefined }}
                >
                    <div className="space-y-4">
                        {/* Two-column Menu: Social links and Navigation links */}
                        <nav className="flex flex-col md:flex-row md:justify-between md:gap-x-12">
                            {/* Social Links */}
                            <ul className="flex flex-col space-y-2 md:mb-0 md:w-1/2">
                                {socialLinks.map((social) => (
                                    <li key={social.name}>
                                        <a href={social.socialUrl} target="_blank" rel="noopener noreferrer"
                                            className=" text-[#ddd] font-normal pointer-events-auto transition-colors duration-100 leading-[1em] border-b-0 cursor-pointer no-underline focus:outline-none hover:text-white hover:font-semibold hover:border-b-0">
                                            {social.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {/* Navigation Links */}
                            <ul className="flex flex-col space-y-2 md:items-end md:w-1/2">
                                {pages.map((page) => (
                                    <li key={page.name}>
                                        {page.external ? (
                                            <a
                                                href={page.href}
                                                className="menu-link  text-[#ddd] font-normal pointer-events-auto transition-colors duration-100 leading-[1em] border-b-0 hover:underline"
                                                rel="noopener"
                                            >
                                                {page.name}
                                            </a>
                                        ) : (
                                            <MenuLink href={page.href}>{page.name}</MenuLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        {/* Mobile logo at the bottom inside nav */}
                        <div className="md:hidden flex justify-center pt-6">
                            <Link href="/" className="block w-10 hover:scale-110 transition">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 22 22"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white fill-current"
                                >
                                    <path d="M11 21.5C5.201 21.5.5 16.799.5 11S5.201.5 11 .5 21.5 5.201 21.5 11 16.799 21.5 11 21.5zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Dual rotated footer items, fixed vertical center, left/right */}
            <footer className="relative overflow-hidden h-screen  z-10   w-screen">
                {/* Left item */}
                <div
                    className="hidden md:block absolute -left-4  top-1/2 -translate-y-1/2  translate-x-1/2 rotate-[-90deg] text-white text-xs font-primary tracking-wider pt-20"
                    style={{ transformOrigin: 'left' }}
                >
                    Ramón Morcillo - {new Date().getFullYear()}
                </div>
                {/* Right item */}
                <div
                    className="hidden md:block absolute top-1/2 -right-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-white text-xs font-primary tracking-wider pr-8 pt-12"
                    style={{ transformOrigin: 'right' }}
                >
                    Made with 💚 & ⏳
                </div>
                {/* Mobile: horizontal, not rotated, hidden when menu is open */}
                <div className={`flex md:hidden justify-between w-full px-4 pb-2 text-white text-xs font-primary tracking-wider absolute bottom-0 left-0 transition-opacity duration-300 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <span>Ramón Morcillo - {new Date().getFullYear()}</span>
                    <span>Made with 💚 & ⏳</span>
                </div>
            </footer>
        </>
    )
}

export default Navigation