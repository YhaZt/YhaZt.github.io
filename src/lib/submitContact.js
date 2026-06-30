import { CONTACT_EMAIL, WEB3FORMS_ACCESS_KEY } from '@/lib/config';

export function buildContactMailto({ name, email, message }) {
  const subject = encodeURIComponent(`Portfolio message from ${name || 'Visitor'}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function openContactMailto(form) {
  const url = buildContactMailto(form);
  const link = document.createElement('a');
  link.href = url;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function submitViaWeb3Forms({ name, email, message }) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message,
      subject: `Portfolio message from ${name}`,
      from_name: 'Carpel SD Portfolio',
      replyto: email,
    }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Invalid response from mail service.');
  }

  if (!response.ok || !data?.success) {
    throw new Error(data?.message || 'Failed to send message.');
  }

  return { success: true, method: 'web3forms', data };
}

export async function submitContactForm(form) {
  if (WEB3FORMS_ACCESS_KEY) {
    try {
      return await submitViaWeb3Forms(form);
    } catch (err) {
      console.warn('Web3Forms failed, using mailto fallback:', err);
    }
  }

  openContactMailto(form);
  return { success: true, method: 'mailto' };
}
