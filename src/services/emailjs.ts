import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_8fg8368';
const TEMPLATE_ID = 'template_giqs2yv';
const PUBLIC_KEY = 'IzY6dOaqjKzNK5789';

emailjs.init(PUBLIC_KEY);

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  reason: string;
  consentUpdates: boolean;
  consentPrivacy: boolean;
}

export function sendLeadEmail(data: LeadData): Promise<unknown> {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    city: data.city,
    reason: data.reason,
    consentUpdates: data.consentUpdates ? 'Yes' : 'No',
    consentPrivacy: data.consentPrivacy ? 'Yes' : 'No',
  });
}
