import React from 'react'
import { motion } from 'motion/react';
import { BrainCog } from 'lucide-react';

function Logo() {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <BrainCog/>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-black font-sans text-lg  dark:text-white"
      >
        Smart Service
      </motion.span>
    </a>
  )
}

export default Logo