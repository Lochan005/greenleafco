import { useEffect, useRef, useState } from 'react';

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  items: readonly NavItem[];
}

export default function SiteMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        className="inline-flex min-h-11 items-center gap-3 text-xs font-bold tracking-[0.12em] uppercase"
        onClick={() => setOpen(true)}
      >
        <span>Menu</span>
        <span aria-hidden="true" className="grid gap-1">
          <span className="block h-px w-5 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </span>
      </button>

      <div className={open ? 'fixed inset-0 z-50' : 'pointer-events-none fixed inset-0 z-50'}>
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          className={`absolute inset-0 bg-charcoal/40 transition-opacity duration-300 ease-out ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div
          id="site-menu"
          ref={dialogRef}
          role="dialog"
          aria-modal={open}
          aria-hidden={!open}
          inert={!open}
          aria-label="Site navigation"
          className={`absolute inset-y-0 right-0 flex h-dvh w-[30vw] min-w-0 max-md:w-[min(22rem,100%)] flex-col bg-botanical-deep text-canvas transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-canvas/20 px-6 py-5">
            <a href="/" className="font-display text-xl no-underline">
              Greenleaf Co
            </a>
            <button
              type="button"
              className="min-h-11 px-2 text-xs font-bold tracking-[0.12em] uppercase"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav aria-label="Expanded navigation" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
            <ul className="grid">
              {items.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-baseline gap-3 border-b border-canvas/15 py-3 text-base leading-normal no-underline"
                  >
                    <span className="text-xs tracking-widest text-sage">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="shrink-0 px-6 py-5 text-sm leading-6 text-sage">
            Premium produce for professional kitchens, hospitality, retail, and distribution.
          </p>
        </div>
      </div>
    </>
  );
}
