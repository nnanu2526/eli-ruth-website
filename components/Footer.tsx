export default function Footer(){
  return (
    <footer className="section pt-12">
      <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="muted">© {new Date().getFullYear()} ELI RUTH, LLC. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:underline" href="#">Privacy</a>
          <a className="hover:underline" href="#">Terms</a>
          <a className="hover:underline" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}
