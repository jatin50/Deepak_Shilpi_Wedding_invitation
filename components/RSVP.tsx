'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Share2, MessageCircle, Phone, Check, Heart } from 'lucide-react';
import { weddingConfig } from '@/config/invite';
import { downloadICS } from '@/lib/ics';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function RSVP() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Invitation link copied to clipboard!');
  const prefersReduced = useReducedMotion();

  const handleShare = async () => {
    const shareData = {
      title: weddingConfig.meta.title,
      text: weddingConfig.meta.description,
      url: typeof window !== 'undefined' ? window.location.href : weddingConfig.meta.url,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setToastMessage('Invitation link copied to clipboard!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
    }
  };

  const handleSaveCalendar = () => {
    downloadICS(weddingConfig.events, `${weddingConfig.couple.groomShort} & ${weddingConfig.couple.brideShort}`);
  };

  const cleanWhatsappNumber = weddingConfig.rsvp.whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    weddingConfig.rsvp.prefilledMessage
  )}`;

  return (
    <section className="relative w-full py-16 px-4 bg-bg flex flex-col items-center">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 z-50 px-5 py-2.5 rounded-full bg-ink text-card text-[14px] font-serif shadow-lg flex items-center gap-2 border border-rose/30"
          >
            <Check className="w-4 h-4 text-rose" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-[460px]">
        {/* Animated Border Container for Double Border Box */}
        <div className="relative p-6 sm:p-8 bg-card stationery-card">
          {/* Animated SVG Border Outline on entry */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              stroke="var(--color-line)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReduced ? 0.2 : 1.2, ease: 'easeInOut' }}
            />
          </svg>

          {/* Card Content with Fade-In */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            {/* Header label */}
            <span className="label-small tracking-[0.2em] mb-2">WITH BEST COMPLIMENTS</span>

            {/* R·S·V·P in Cormorant (Not script, wide letter spacing) */}
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-semibold tracking-wide mb-4">
              R · S · V · P
            </h2>

            {/* Family Names as given in invitation card */}
            <div className="flex flex-col items-center gap-1 mb-6">
              {weddingConfig.rsvp.familyMembers.map((member, i) => (
                <p
                  key={i}
                  className={`font-serif ${
                    i === weddingConfig.rsvp.familyMembers.length - 1
                      ? 'italic text-soft text-[16px] sm:text-[17px] mt-1'
                      : 'text-ink font-medium text-[18px] sm:text-[19px]'
                  }`}
                >
                  {member}
                </p>
              ))}
            </div>

            {/* Warm Note */}
            <div className="flex items-center justify-center gap-1.5 text-soft font-serif italic text-[16px] mb-8">
              <span>We can’t wait to celebrate with you</span>
              <Heart className="w-4 h-4 fill-rose text-rose" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col w-full gap-3">
              {/* Primary Filled Button (in ink) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-md bg-ink text-card font-serif text-[15px] tracking-tracked hover:bg-ink/90 active:bg-ink/80 transition-all duration-250 shadow-rose-subtle focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <MessageCircle className="w-4 h-4 text-wash" />
                <span>REPLY ON WHATSAPP</span>
              </a>

              {/* Secondary Outlined Buttons Grid */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  type="button"
                  onClick={handleSaveCalendar}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-md border border-ink text-ink font-serif text-[13px] sm:text-[14px] tracking-tracked hover:bg-wash active:bg-wash/80 transition-colors duration-250 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-soft" />
                  <span>SAVE THE DATES</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-md border border-ink text-ink font-serif text-[13px] sm:text-[14px] tracking-tracked hover:bg-wash active:bg-wash/80 transition-colors duration-250 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                >
                  <Share2 className="w-3.5 h-3.5 text-soft" />
                  <span>SHARE INVITE</span>
                </button>
              </div>
            </div>

            {/* Hairline Divider & Family Contacts */}
            {weddingConfig.rsvp.contacts.length > 0 && (
              <div className="w-full mt-8">
                <div className="w-full h-[1px] bg-line/80 mb-6" />

                <div className="flex flex-col gap-3.5 text-left w-full">
                  {weddingConfig.rsvp.contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-[15px] sm:text-[16px] font-serif"
                    >
                      <div className="flex flex-col">
                        <span className="label-small text-[11px] sm:text-[12px] text-soft">
                          {contact.role}
                        </span>
                        <span className="text-ink font-medium">{contact.name}</span>
                      </div>
                      <a
                        href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                        className="flex items-center gap-1.5 text-ink hover:text-soft transition-colors py-1 px-2.5 rounded-full hover:bg-wash/50"
                        aria-label={`Call ${contact.name}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-soft" />
                        <span className="font-serif text-[14px] tracking-wider">{contact.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
