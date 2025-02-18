import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Landing = () => {
    return (
        <div>
            <main className="flex items-center justify-center py-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6">

                    {/* Image Column */}
                    <div className="flex justify-center items-center">
                        <Image
                            src="/home.jpg"
                            alt="Task Manager"
                            width={500}
                            height={500}
                            className="w-full h-auto max-w-md rounded-lg shadow-xl hidden md:block lg:block"
                        />
                    </div>

                    {/* Information and Buttons Column */}
                    <div className="flex flex-col justify-center items-start space-y-6">
                        <h2 className="text-4xl font-semibold text-black">
                            Manage All Of Your <span className="text-blue-700">WORK</span> In One Place
                        </h2>
                        <p className="text-2xl text-black">
                            Organize your tasks, collaborate with your team, and stay on top of your projects with ease.
                        </p>

                        {/* Buttons for Sign Up and Login */}
                        <div className="space-x-4">
                            <Button className="px-8 py-2">
                                <Link href="/auth/signup">Sign Up</Link>
                            </Button>
                            <Button variant='outline' className="bg-white border border-white text-black hover:bg-gray-900 hover:text-white active:bg-black transition duration-200 px-8 py-2">
                                <Link href="/auth/login">Log In</Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Landing