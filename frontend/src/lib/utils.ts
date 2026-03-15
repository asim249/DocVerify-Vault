
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CryptoJS from 'crypto-js'; // Library import karein

// 1. Tailwind classes merge karne ke liye (UI ke liye)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 2. File size readable banane ke liye
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 3. Crypto-JS use karte hue SHA-256 Hash nikalne ke liye
export const calculateHash = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binary = event.target?.result;
      if (binary) {
        // Crypto-JS WordArray create karta hai binary data se
        const wa = CryptoJS.lib.WordArray.create(binary as any);
        // SHA-256 algorithm apply hota hai
        const hash = CryptoJS.SHA256(wa).toString();
        resolve(hash);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};