export default function ProjectFlow() {
  const steps = ['Upload', 'Parse', 'Match', 'Score', 'Refine', 'Export PDF']
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white">
      <div className="absolute inset-0 opacity-60" style={{ backgroundSize: '18px 18px', backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)' }} />
      <div className="relative p-6">
        <div className="text-sm font-semibold text-emerald-700">How it works</div>
        <div className="mt-1 text-2xl font-bold tracking-tight">Your resume, upgraded in minutes</div>

        <div className="mt-6">
          <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-3 animate-[marquee_16s_linear_infinite]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  {steps.map((s) => (
                    <span key={s + i} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-800">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-[pulse-ring_2s_ease-out_infinite]" />
                      {s}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border p-4 bg-white">
            <div className="text-sm font-semibold text-gray-700">1. Upload</div>
            <div className="text-gray-600 mt-1">Drop your PDF/DOCX resume or paste from LinkedIn.</div>
          </div>
          <div className="rounded-xl border p-4 bg-white">
            <div className="text-sm font-semibold text-gray-700">2. Match</div>
            <div className="text-gray-600 mt-1">Paste the job description to compute ATS-friendly score.</div>
          </div>
          <div className="rounded-xl border p-4 bg-white">
            <div className="text-sm font-semibold text-gray-700">3. Improve</div>
            <div className="text-gray-600 mt-1">Get missing skills and tips, then export a polished PDF.</div>
          </div>
        </div>
      </div>
    </div>
  )
}


