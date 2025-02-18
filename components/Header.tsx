import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='p-4'>
            <div className="max-w-7xl mx-auto flex items-center justify-between text-black">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">Task Manager</h1>
                </div>
                <nav className="space-x-6">
                    <Link href="/" className="">Home</Link>
                    <Link href="/about" className="">About</Link>
                    <Link href="/contact" className="">Contact</Link>
                </nav>
            </div>
        </div>
    )
}

export default Header