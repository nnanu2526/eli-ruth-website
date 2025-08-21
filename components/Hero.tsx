'use client'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section id="top" className="section pt-8">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            className="h1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Empowering Innovation Through Intelligent AI
          </motion.h1>
          <motion.p
            className="muted mt-4 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            We build data platforms, automation, and consumer apps that help businesses grow.
          </motion.p>
          <div className="mt-8 flex gap-3">
            <a className="btn btn-primary" href="/contact">Contact Us</a>
            <a className="btn btn-secondary" href="/products">Learn More</a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card p-2"
        >
          <img src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1600&auto=format&fit=crop" alt="AI abstract" className="rounded-xl w-full h-72 object-cover" />
        </motion.div>
      </div>
    </section>
  )
}
