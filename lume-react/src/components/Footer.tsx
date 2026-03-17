export default function Footer() {
  return (
    <footer className="py-5 bg-lume-warm border-t border-lume-border text-center">
      <p className="text-[10px] text-lume-muted">
        Lume Project Private Limited &middot; Hyderabad &middot;{' '}
        <a
          href="https://thelumeproject.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-lume-red transition-colors"
        >
          thelumeproject.com
        </a>{' '}
        &middot;{' '}
        <a
          href="https://instagram.com/lumeproject_offl"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-lume-red transition-colors"
        >
          @lumeproject_offl
        </a>{' '}
        &middot; &copy; 2026
      </p>
    </footer>
  )
}
