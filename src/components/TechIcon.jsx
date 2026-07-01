import { useState } from 'react';

// Maps a skill name to a devicon CDN path (folder/file without extension).
const DEVICON = {
  React: 'react/react-original',
  Vue: 'vuejs/vuejs-original',
  Quasar: 'quasar/quasar-original',
  'Node.js': 'nodejs/nodejs-original',
  Express: 'express/express-original',
  Laravel: 'laravel/laravel-original',
  'CodeIgniter 4': 'codeigniter/codeigniter-plain',
  CodeIgniter: 'codeigniter/codeigniter-plain',
  Firebase: 'firebase/firebase-plain',
  Supabase: 'supabase/supabase-original',
  'Digital Ocean': 'digitalocean/digitalocean-original',
  DigitalOcean: 'digitalocean/digitalocean-original',
  PostgreSQL: 'postgresql/postgresql-original',
  MongoDB: 'mongodb/mongodb-original',
  MySQL: 'mysql/mysql-original',
  JavaScript: 'javascript/javascript-original',
  TypeScript: 'typescript/typescript-original',
  HTML: 'html5/html5-original',
  CSS: 'css3/css3-original',
  Tailwind: 'tailwindcss/tailwindcss-original',
  PHP: 'php/php-original',
};

// Logos that render dark/black and need inverting on a dark background.
const INVERT = new Set(['Express']);

export function techIconUrl(name) {
  const key = DEVICON[name];
  return key ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key}.svg` : null;
}

export default function TechIcon({ name, size = 40, className = '' }) {
  const url = techIconUrl(name);
  const [errored, setErrored] = useState(false);

  if (!url || errored) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-md bg-primary/15 font-bold text-primary ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        title={name}
      >
        {name?.[0] ?? '?'}
      </span>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      title={name}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`object-contain pointer-events-none ${INVERT.has(name) ? 'invert' : ''} ${className}`}
    />
  );
}
