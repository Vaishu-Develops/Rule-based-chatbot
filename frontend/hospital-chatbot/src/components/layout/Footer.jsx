export default function Footer() {
  return (
    <footer className="mt-12 text-center text-sm text-gray-600">
      <p>© {new Date().getFullYear()} Healing Wave Hospital. All rights reserved.</p>
      <p className="mt-1">For emergencies, please call 911 immediately.</p>
    </footer>
  )
}