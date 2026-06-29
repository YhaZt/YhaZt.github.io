import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Mail, Loader2 } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/config';

export default function FloatingChat({ isOpen, onOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();
      if (!response.ok || data.success !== 'true') {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2800);
    } catch {
      setError(`Could not send right now. Email me at ${CONTACT_EMAIL}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setError(null);
    onClose();
  };

  const toggleChat = () => {
    if (isOpen) handleClose();
    else onOpen();
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="w-[min(100vw-2rem,380px)] glass-panel rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                    CS
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Carpel SD</p>
                  <p className="text-xs text-emerald-400">Online — replies within 24h</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 max-h-[min(60vh,420px)] overflow-y-auto">
              <div className="mb-4 flex gap-2">
                <div className="shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  CS
                </div>
                <div className="glass-panel rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-muted-foreground max-w-[85%]">
                  Hey! Got a project or opportunity? Drop a message — I&apos;ll get back to you soon.
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <p className="text-sm font-medium text-foreground mb-1">Message sent!</p>
                  <p className="text-xs text-muted-foreground">Thanks for reaching out.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="name"
                      type="text"
                      required
                      disabled={loading}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-background/60 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="email"
                      type="email"
                      required
                      disabled={loading}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-background/60 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <textarea
                    name="message"
                    required
                    disabled={loading}
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full px-3 py-2.5 rounded-xl bg-background/60 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                  {error && (
                    <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full glow-btn-primary text-sm py-2.5 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleChat}
        className="relative group"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
        )}
        <span className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/35 transition-colors" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white shadow-[0_8px_32px_rgba(99,102,241,0.45)] border border-white/20">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <MessageCircle size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
}
