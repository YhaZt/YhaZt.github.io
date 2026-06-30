import { WEB3FORMS_ACCESS_KEY } from '@/lib/config';

export async function submitContactForm({ name, email, message }) {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error(
      'Contact form is not set up yet. Add a free Web3Forms key — see web3forms.com (takes ~1 minute).'
    );
  }

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
