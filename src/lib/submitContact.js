import { CONTACT_EMAIL } from '@/lib/config';

function isFormSubmitSuccess(value) {
  return value === true || value === 'true';
}

export async function submitContactForm({ name, email, message }) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio message from ${name}`,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Invalid response from mail service.');
  }

  if (!response.ok || !isFormSubmitSuccess(data?.success)) {
    throw new Error(data?.message || 'Failed to send message.');
  }

  return data;
}
