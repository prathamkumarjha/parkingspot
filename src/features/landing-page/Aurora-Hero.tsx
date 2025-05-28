'use client'
import { useEffect } from "react"
import { motion, useMotionTemplate, useMotionValue, animate} from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi';
const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
export const AuroraHero =  () => {
    const color = useMotionValue(COLORS[0])
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
   const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
    useEffect(()=>{
        animate(color, COLORS,{
            ease:'easeInOut',
            duration:10,
            repeat:Infinity,
            repeatType: "mirror",
        })
    },[])
    return (
        <motion.section
        className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
      >
        <motion.div
          style={{ backgroundImage }}
          className="absolute inset-0 z-0 opacity-80 blur-sm"
        />
      

        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      

        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm select-none">
            Beta Now Live!
          </span>
          <h1 className="max-w-3xl text-center text-3xl font-bold leading-tight text-transparent bg-gradient-to-r from-[#d7d7d7] via-[#a7a7a7] to-[#d7d7d7] bg-clip-text sm:text-5xl md:text-7xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)] select-none">
            Get your car parking reserved for you
          </h1>
          <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed select-none">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, et,
            distinctio eum impedit nihil ipsum modi.
          </p>
          <motion.button
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 cursor-pointer select-none
            "
          >
            Start free trial
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>
      </motion.section>
      
    )
}