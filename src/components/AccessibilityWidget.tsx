import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  Accessibility,
  X,
  Plus,
  Minus,
  Contrast,
  Link as LinkIcon,
  Droplet,
  MousePointer2,
  AlignJustify,
  ZapOff,
  RotateCcw,
} from "lucide-react";

type Settings = {
  fontStep: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
  noMotion: boolean;
  spacing: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  fontStep: 0,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  bigCursor: false,
  noMotion: false,
  spacing: false,
};

const STORAGE_KEY = "a11y-settings-v1";
const MAX_FONT_STEP = 4;
const MIN_FONT_STEP = -2;

const loadSettings = (): Settings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const applySettings = (s: Settings) => {
  const html = document.documentElement;
  const scale = 1 + s.fontStep * 0.1;
  html.style.fontSize = `${scale * 100}%`;
  html.classList.toggle("a11y-high-contrast", s.highContrast);
  html.classList.toggle("a11y-grayscale", s.grayscale);
  html.classList.toggle("a11y-highlight-links", s.highlightLinks);
  html.classList.toggle("a11y-big-cursor", s.bigCursor);
  html.classList.toggle("a11y-no-motion", s.noMotion);
  html.classList.toggle("a11y-spacing", s.spacing);
};

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    applySettings(loaded);
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore quota errors
    }
  }, [settings]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  }, []);

  const incFont = () =>
    update("fontStep", Math.min(MAX_FONT_STEP, settings.fontStep + 1));
  const decFont = () =>
    update("fontStep", Math.max(MIN_FONT_STEP, settings.fontStep - 1));

  const reset = () => setSettings(DEFAULT_SETTINGS);

  const toggles = useMemo(
    () => [
      {
        key: "highContrast" as const,
        label: "ניגודיות גבוהה",
        icon: Contrast,
      },
      {
        key: "grayscale" as const,
        label: "גוונים אפורים",
        icon: Droplet,
      },
      {
        key: "highlightLinks" as const,
        label: "הדגשת קישורים",
        icon: LinkIcon,
      },
      {
        key: "bigCursor" as const,
        label: "סמן גדול",
        icon: MousePointer2,
      },
      {
        key: "noMotion" as const,
        label: "ביטול אנימציות",
        icon: ZapOff,
      },
      {
        key: "spacing" as const,
        label: "ריווח שורות",
        icon: AlignJustify,
      },
    ],
    []
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "סגירת תפריט נגישות" : "פתיחת תפריט נגישות"}
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-purple-700 text-white shadow-lg shadow-purple-900/40 outline-none transition hover:bg-purple-600 focus-visible:ring-4 focus-visible:ring-purple-300 md:h-14 md:w-14"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Accessibility className="h-6 w-6" aria-hidden="true" />}
      </button>

      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-label="תפריט נגישות"
          dir="rtl"
          lang="he"
          className="fixed bottom-24 left-5 z-[9998] w-[320px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-purple-700/40 bg-navy-dark p-4 shadow-2xl shadow-black/60 md:bottom-28"
        >
          <h2 className="mb-3 text-base font-bold text-white font-heebo">
            תפריט נגישות
          </h2>

          <section aria-labelledby="a11y-font-label" className="mb-3 rounded-lg bg-white/5 p-3">
            <p id="a11y-font-label" className="mb-2 text-sm text-gray-200 font-heebo">
              גודל טקסט
            </p>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={decFont}
                disabled={settings.fontStep <= MIN_FONT_STEP}
                aria-label="הקטנת טקסט"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-700 text-white outline-none transition hover:bg-purple-600 focus-visible:ring-2 focus-visible:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-5 w-5" aria-hidden="true" />
              </button>
              <span
                aria-live="polite"
                className="min-w-[60px] text-center text-sm text-white font-heebo"
              >
                {`${Math.round((1 + settings.fontStep * 0.1) * 100)}%`}
              </span>
              <button
                type="button"
                onClick={incFont}
                disabled={settings.fontStep >= MAX_FONT_STEP}
                aria-label="הגדלת טקסט"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-700 text-white outline-none transition hover:bg-purple-600 focus-visible:ring-2 focus-visible:ring-purple-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </section>

          <ul className="mb-3 grid grid-cols-2 gap-2" role="group" aria-label="התאמות נגישות">
            {toggles.map(({ key, label, icon: Icon }) => {
              const active = settings[key];
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => update(key, !active)}
                    aria-pressed={active}
                    className={`flex h-full w-full flex-col items-center justify-center gap-1 rounded-md p-2 text-xs text-white font-heebo outline-none transition focus-visible:ring-2 focus-visible:ring-purple-300 ${
                      active
                        ? "bg-purple-700 hover:bg-purple-600"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="text-center leading-tight">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={reset}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent py-2 text-sm text-white font-heebo outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-purple-300"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            איפוס הגדרות
          </button>

          <p className="text-[11px] leading-relaxed text-gray-400 font-heebo">
            ההגדרות נשמרות במכשיר שלך.
            {" "}
            <a
              href="/accessibility"
              className="text-purple-300 underline hover:text-purple-200"
            >
              הצהרת נגישות מלאה
            </a>
            {" · "}
            <a
              href="mailto:info@guycohen-ai.co.il?subject=דיווח%20על%20בעיית%20נגישות"
              className="text-purple-300 underline hover:text-purple-200"
            >
              דיווח בעיה
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
