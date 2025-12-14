"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error("Failed to copy link.");
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-bold hover:bg-gray-800 transition-all active:scale-95"
        >
            <span>{copied ? "Copied!" : "Share this post"}</span>
        </button>
    );
}
