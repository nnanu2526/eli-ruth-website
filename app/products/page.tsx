import PageHeader from '@/components/PageHeader'

export default function ProductsPage(){
  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Three focused product lines—built to be fast, reliable, and human-centered."
        backHref="/home#top"
      />

      <section className="section">
        <div className="grid-3">
          {/* Data Platform */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Data Platform</h3>
            <p className="muted mt-2">Unify sources, govern access, and deliver real-time analytics.</p>
            <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-slate-300">
              <li>Connectors for apps, DBs, and event streams</li>
              <li>Row/column level governance & audit trails</li>
              <li>Dashboards with sub-second drill-down</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a className="btn btn-primary" href="/contact">Request Demo</a>
              <a className="btn btn-secondary" href="/about">Learn More</a>
            </div>
          </div>

          {/* Robotics Suite */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Robotics Suite</h3>
            <p className="muted mt-2">Vision + automation for safe, precise, repeatable operations.</p>
            <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-slate-300">
              <li>Object detection & pose estimation</li>
              <li>Task orchestration with fail-safes</li>
              <li>Telemetry, alerts, and performance reports</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a className="btn btn-primary" href="/contact">Book Pilot</a>
              <a className="btn btn-secondary" href="/about">Learn More</a>
            </div>
          </div>

          {/* Consumer App Kit */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Consumer App Kit</h3>
            <p className="muted mt-2">AI-first experiences that drive onboarding, search, and support.</p>
            <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-slate-300">
              <li>Personalized onboarding flows</li>
              <li>Natural-language search across content</li>
              <li>Proactive, context-aware support</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a className="btn btn-primary" href="/contact">Try It Free</a>
              <a className="btn btn-secondary" href="/about">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section">
        <div className="card p-6">
          <h3 className="text-xl font-semibold">Use Cases</h3>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold">Operations</h4>
              <p className="muted mt-1">Inventory intel, workflow automation, and telemetry.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold">Growth</h4>
              <p className="muted mt-1">Acquisition insights, funnel tracking, campaign lift.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold">Support</h4>
              <p className="muted mt-1">Self-serve help, intent routing, CSAT improvements.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
