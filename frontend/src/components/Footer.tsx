import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-zinc-900/50 py-12 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent block mb-2">
            NEXUS
          </span>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Nexus Web Studio. Все права защищены.
          </p>
        </div>

        <div className="flex gap-8 text-sm font-medium text-zinc-400">
          <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Договор оферты</Link>
        </div>

      </div>
    </footer>
  );
}