import PageHeader from '@/components/PageHeader'

export default function AboutPage(){
  return (
    <>
      <PageHeader
        title="About Eli Ruth"
        subtitle="We’re a product studio building human-centered AI platforms that feel effortless and deliver measurable outcomes."
        backHref="/home#top"
      />

      {/* Story */}
      <section className="section">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card p-6">
            <h3 className="text-xl font-semibold">Our Story</h3>
            <p className="muted mt-3">
              Eli Ruth began with a simple idea: advanced AI should be understandable, reliable, and genuinely
              helpful for teams—not just a proof-of-concept. We continue to partner with organizations to ship
              production-grade systems that organize data, automate workflows, and create delightful consumer experiences.
            </p>
            <p className="muted mt-3">
              We focus on clarity, speed, and trust. That means intuitive UX, low-latency pipelines, strong privacy,
              and infrastructure that scales gracefully from pilot to enterprise rollouts.
            </p>
          </div>

          <aside className="card p-6">
            <h3 className="text-xl font-semibold">At a Glance</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Founded: 2025</li>
              <li>• Focus: Data platforms, robotics automation, consumer apps</li>
              <li>• Footprint: Remote-first</li>
              <li>• Ethos: Useful & usable AI</li>
            </ul>
            <a className="btn btn-primary mt-4 inline-block" href="/contact">Work With Us</a>
          </aside>
        </div>
      </section>

      {/* Mission & Roadmap (Future tense Q4 2025–Q4 2026) */}
      <section className="section">
        <h3 className="text-xl font-semibold">Mission & Roadmap</h3>
        <div className="mt-4 space-y-3">
          <div className="card p-4 flex items-start gap-4">
            <span className="text-brand-300 font-semibold">2025 Q4</span>
            <p className="muted">We are driving innovation with a unified data platform delivering real-time analytics and governance.</p>
          </div>
          <div className="card p-4 flex items-start gap-4">
            <span className="text-brand-300 font-semibold">2026 Q1</span>
            <p className="muted">We are advancing automation through a robotics vision toolkit that enhances warehouse precision and safety.</p>
          </div>
          <div className="card p-4 flex items-start gap-4">
            <span className="text-brand-300 font-semibold">2026 Q2</span>
            <p className="muted">We are empowering consumers with an AI app suite that delivers seamless onboarding, intelligent search, and proactive support.</p>
          </div>
          <div className="card p-4 flex items-start gap-4">
            <span className="text-brand-300 font-semibold">2026 Q3</span>
            <p className="muted">We are expanding our ecosystem with global integrations that make intelligent solutions accessible across industries.</p>
          </div>
          <div className="card p-4 flex items-start gap-4">
            <span className="text-brand-300 font-semibold">2026 Q4</span>
            <p className="muted">We are establishing Eli Ruth as a trusted innovation partner, setting new standards in AI-driven enterprise and consumer solutions.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="muted">Have a use case in mind? We’d love to collaborate.</p>
          <div className="flex gap-3">
            <a className="btn btn-primary" href="/contact">Start a Project</a>
            <a className="btn btn-secondary" href="/home#top">Back to Home</a>
          </div>
        </div>
      </section>
    </>
  )
}
