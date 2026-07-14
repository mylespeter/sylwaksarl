export default function Footer() {
  return (
    <footer className="bg-[#1a3a6b] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold mb-2">SYLWAK INVESTMENT SARL</h3>
        <p className="text-blue-200 text-sm mb-4">
          Civil Engineering • Mining Services • Industrial Solutions
        </p>
        <p className="text-blue-300 text-sm">
          © {new Date().getFullYear()} SYLWAK INVESTMENT SARL. All rights reserved.
        </p>
      </div>
    </footer>
  )
}