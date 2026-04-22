import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DemoOverlayBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('demo-banner-dismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('demo-banner-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 z-[9999] md:max-w-md w-auto"
        >
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-5 md:p-6 overflow-hidden">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 text-brand-dark/40 hover:text-brand-dark hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                  </span>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">
                    Live Demo
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-brand-dark mb-1">
                  You're viewing a live demo
                </h3>
                <p className="text-sm text-brand-muted mb-4 leading-relaxed">
                  Build your own professional website with the precision of <span className="font-semibold text-brand-dark">BuildSiteAsia</span>.
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href="https://buildsiteasia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-blue hover:shadow-lg hover:translate-y-[-2px] transition-all"
                  >
                    Go to Main Site
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
