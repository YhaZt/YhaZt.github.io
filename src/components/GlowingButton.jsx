export default function GlowingButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}) {
  const classes = `glow-btn ${variant === 'outline' ? 'glow-btn-outline' : 'glow-btn-primary'} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
