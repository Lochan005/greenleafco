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

      {open && (
        <div
          id="site-menu"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 grid bg-botanical-deep text-canvas"
        >
          <div className="site-container flex min-h-screen flex-col py-5 md:py-8">
            <div className="flex items-center justify-between border-b border-canvas/20 pb-5">
              <a href="/" className="font-display text-2xl no-underline">
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
            <nav aria-label="Expanded navigation" className="my-auto py-12">
              <ul className="grid gap-2">
                {items.map((item, index) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group flex items-baseline gap-5 border-b border-canvas/15 py-4 font-display text-[clamp(2.3rem,7vw,6rem)] leading-none no-underline"
                    >
                      <span className="font-sans text-[0.65rem] tracking-widest text-sage">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="max-w-md text-sm leading-6 text-sage">
              Premium produce for professional kitchens, hospitality, retail,
              and distribution.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
