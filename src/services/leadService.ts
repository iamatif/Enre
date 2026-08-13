// Replace with the Web App URL from your Google Apps Script deployment.
// See scripts/GoogleAppsScript.gs for deployment instructions.
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlgk6T5LNCU7xWXqfF2DhC5pQvvB8kU5xj5kJHkOvwCajJO9kwAybWWsDMIF-MV-7Ovw/exec';

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  reason: string;
  consentUpdates: boolean;
  consentPrivacy: boolean;
  type?: string;
}

export function sendLeadEmail(data: LeadData): Promise<unknown> {
  return fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data),
  }).then(() => ({ success: true }));
}
