import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export function Dialog({
  open,
  onClose,
  title,
  children,
  drawer = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const targets = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((element) => element.offsetParent !== null);
        const first = targets[0];
        const last = targets.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed border-0 bg-white p-0 text-graphite-800 shadow-2xl backdrop:bg-graphite-900/45 backdrop:backdrop-blur-sm ${drawer ? "inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-md" : "inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg rounded-2xl"}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-graphite-100 px-6 py-5">
          <h2 id={titleId} className="font-display text-xl font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title.toLowerCase()}`}
            className="rounded-lg p-2 text-graphite-500 hover:bg-graphite-100"
          >
            <X size={21} />
          </button>
        </div>
        {open && children}
      </div>
    </dialog>
  );
}
