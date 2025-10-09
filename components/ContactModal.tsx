"use client";

import { useState, FormEvent } from "react";
import { X } from "lucide-react";
import { ParticleEffect } from "./ParticleEffect";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-tw-black/95 backdrop-blur  flex items-center justify-center z-50 p-4">
      <div className="w-full absolute inset-0">
        <ParticleEffect />
      </div>
      <div className="fixed inset-0  supports-[backdrop-filter]:bg-tw-black/50 flex items-center justify-center z-50 p-4">
        <div className=" backdrop-blur-xl border border-tw-grey-dark max-w-md w-full rounded-xl shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-tw-white hover:text-tw-accent cursor-pointer"
          >
            <X size={24} />
          </button>

          <div className="p-8">
            <h2 className="text-2xl font-object-bold text-tw-white mb-6">
              Let's chat...
            </h2>

            <p className="text-tw-white text-xs">
              Every great thing starts with a single step — and this might be
              ours. Can't wait to hear from you.
            </p>

            <div className="flex space-x-4 my-4 mb-10">
              {/* <a 
              href="https://instagram.com/tr_____av" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-tw-white hover:text-tw-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a> */}
              <a
                href="https://au.linkedin.com/in/travisweerts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tw-white hover:text-tw-accent transition-colors border border-tw-white hover:border-tw-accent p-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>

            {submitStatus === "success" ? (
              <div className="text-green-500 mb-4">
                Thank you for your message! I'll get back to you soon.
              </div>
            ) : submitStatus === "error" ? (
              <div className="text-red-500 mb-4">
                Something went wrong. Please try again later.
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {/* <label htmlFor="name" className="block text-tw-white mb-2 text-xs font-object-regular">Name</label> */}
                <input
                  type="text"
                  id="name"
                  placeholder="Your name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 text-tw-white border border-tw-grey rounded-md focus:outline-none focus:ring-2 focus:ring-tw-accent"
                  required
                />
              </div>

              <div className="mb-4">
                {/* <label htmlFor="email" className="block text-tw-white mb-2 text-xs font-object-regular">Email</label> */}
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Your email*"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-tw-white border border-tw-grey rounded-md focus:outline-none focus:ring-2 focus:ring-tw-accent"
                  required
                />
              </div>

              <div className="mb-6">
                {/* <label htmlFor="message" className="block text-tw-white mb-2 text-xs font-object-regular">How can I help?</label> */}
                <textarea
                  id="message"
                  value={message}
                  placeholder="How can I help?"
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full p-2 text-tw-white border border-tw-grey rounded-md focus:outline-none focus:ring-2 focus:ring-tw-accent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-tw-white text-tw-black font-object-bold cursor-pointer hover:bg-tw-accent py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 text-center h-12 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-tw-black"
                      xmlns="URL_ADDRESS.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                    </svg>
                  </>
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
