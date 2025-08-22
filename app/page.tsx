'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PlayGate from '@/components/PlayGate'
import Hero from '@/components/Hero'
import Section from '@/components/Section'

export default function HomePage() {
  const [unlocked, setUnlocked] = useState(false)

  // On mount: check if user already listened
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('audioPlayed') === '1') {
      setUnlocked(true)
    }
  }, [])

  const handleUnlock = () => {
    setUnlocked(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('audioPlayed', '1')
    }
  }

  return (
    <>
      {!unlocked && (
        <PlayGate
          src="/eli_ruth_greeting.mp3"
          label="Play Message"
          onUnlock={handleUnlock}
        />
      )}

      {unlocked && (
        <>
          <Hero />
          <Section
            id="offerings"
            eyebrow="What We Offer"
            title="AI platforms, automation, and consumer apps"
            subtitle="Built for real-world impact, scalability, and security."
          >
            <div className="grid-3">
              {[
                { title: 'AI-Driven Data Systems', desc: 'Organize, analyze, and activate data.', icon: '📊' },
                { title: 'Advanced Robotics', desc: 'Automation for physical tasks & workflows.', icon: '🤖' },
                { title: 'Consumer Apps', desc: 'AI-powered mobile & web experiences.', icon: '📱' },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="card p-6"
                >
                  <div className="text-3xl">{c.icon}</div>
                  <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 muted">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </>
      )}
    </>
  )
}
