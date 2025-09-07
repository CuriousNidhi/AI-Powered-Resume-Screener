import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import JobDescriptionPage from './pages/JobDescriptionPage'
import ResultsPage from './pages/ResultsPage'
import HeroScorePanel from './components/HeroScorePanel'
import AuthSignIn from './pages/AuthSignIn'
import AuthSignUp from './pages/AuthSignUp'
import TemplatesGallery from './pages/TemplatesGallery'
import ResumeBuilder from './pages/ResumeBuilder'
import SampleResumes from './pages/SampleResumes'

function Shell() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">AI Resume Screener</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/upload" className="hover:text-blue-600">Upload Resume</Link>
            <Link to="/job" className="hover:text-blue-600">Paste JD</Link>
            <Link to="/results" className="hover:text-blue-600">Results</Link>
            <Link to="/templates" className="hover:text-blue-600">Templates</Link>
            <Link to="/samples" className="hover:text-blue-600">Sample Resumes</Link>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/signin" className="hover:text-blue-600">Sign in</Link>
            <Link to="/signup" className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded">Get Started</Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/job" element={<JobDescriptionPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/signin" element={<AuthSignIn />} />
          <Route path="/signup" element={<AuthSignUp />} />
          <Route path="/templates" element={<TemplatesGallery />} />
          <Route path="/builder/:templateId" element={<ResumeBuilder />} />
          <Route path="/samples" element={<SampleResumes />} />
        </Routes>
      </main>
    </div>
  )
}

function Landing() {
  const navigate = useNavigate()
  return (
    <section className="-mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-100">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10">
          <div>
            <div className="text-sm uppercase tracking-wide text-emerald-600 font-semibold">Resume Checker</div>
            <h1 className="mt-3 text-5xl md:text-6xl font-extrabold leading-[1.05] text-gray-900">Is your resume good enough?</h1>
            <p className="mt-4 text-gray-700 text-lg max-w-xl">A free and fast AI resume checker doing crucial checks to ensure your resume is ready to perform and get you interview callbacks.</p>

            <div className="mt-8 rounded-2xl border-2 border-dashed border-emerald-300 bg-white p-6 max-w-xl">
              <div className="text-gray-700 font-medium">Drop your resume here or choose a file.</div>
              <div className="text-sm text-gray-500">PDF & DOCX only. Max 2MB file size.</div>
              <div className="mt-4 flex flex-wrap gap-3">
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md cursor-pointer transition">
                  Upload Your Resume
                  <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={() => navigate('/upload')} />
                </label>
                <button className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => navigate('/job')}>Paste JD</button>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-gray-500">🔒 Privacy guaranteed</div>
            </div>
          </div>
          <div>
            <HeroScorePanel />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
