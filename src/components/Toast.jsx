import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-xl shadow-modal border flex items-start gap-3 backdrop-blur-md ${
        isSuccess
          ? 'bg-white/95 border-emerald-200 text-charcoal'
          : isError
          ? 'bg-white/95 border-rose-200 text-charcoal'
          : 'bg-white/95 border-charcoal-100 text-charcoal'
      }`}>
        <div className="mt-0.5 flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-forest-500" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-600" />}
        </div>
        
        <div className="flex-1 min-w-0 pr-2">
          {toast.title && (
            <p className="text-sm font-semibold text-charcoal-900 leading-snug">
              {toast.title}
            </p>
          )}
          <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-charcoal-400 hover:text-charcoal-700 p-1 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

