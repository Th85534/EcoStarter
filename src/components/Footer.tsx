import { Camera } from 'lucide-react'
import React from 'react'

// type FooterProps = {}

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <Camera className="h-8 w-8 mr-2" />
                    <span className="text-xl font-bold">Metamorph</span>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-indigo-300 transition">About</a>
                    <a href="#" className="hover:text-indigo-300 transition">Features</a>
                    <a href="#" className="hover:text-indigo-300 transition">Stories</a>
                    <a href="#" className="hover:text-indigo-300 transition">Contact</a>
                </div>
            </div>
            <div className="mt-8 text-center text-indigo-300 text-sm">
              © 2024 Metamorph. All rights reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer