import type { SVGProps } from "react";

type ServiceIconProps = SVGProps<SVGSVGElement> & {
  id: "camera" | "palette" | "code" | "video";
};

function IconDefs() {
  return (
    <defs>
      <linearGradient id="service-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F6E8D5" />
        <stop offset="45%" stopColor="#F5B041" />
        <stop offset="100%" stopColor="#FF8C42" />
      </linearGradient>
      <linearGradient id="service-gold-soft" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F5B041" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FF8C42" stopOpacity="0.55" />
      </linearGradient>
    </defs>
  );
}

function PhotographyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <IconDefs />
      <circle cx="24" cy="24" r="17" stroke="url(#service-gold-soft)" strokeWidth="1" />
      <circle cx="24" cy="24" r="11.5" stroke="url(#service-gold)" strokeWidth="1.2" />
      <path
        d="M24 12.5v4M24 31.5v4M12.5 24h4M31.5 24h4M16.8 16.8l2.8 2.8M28.4 28.4l2.8 2.8M31.2 16.8l-2.8 2.8M19.6 28.4l-2.8 2.8"
        stroke="url(#service-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="4.5" fill="url(#service-gold-soft)" stroke="url(#service-gold)" strokeWidth="1.2" />
      <path d="M14 34l4-7h12l4 7" stroke="url(#service-gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DesignIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <IconDefs />
      <path
        d="M10 30c0-8.8 7.2-16 16-16 3.2 0 6.1 1 8.5 2.6"
        stroke="url(#service-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M38 18l-8 8-4-2-2 4 6 6"
        stroke="url(#service-gold)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 34h20"
        stroke="url(#service-gold-soft)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="17" cy="17" r="2.5" fill="url(#service-gold)" />
      <path
        d="M24 8l2.5 5 5.5.8-4 3.9.9 5.5L24 21l-4.9 2.7.9-5.5-4-3.9 5.5-.8L24 8z"
        stroke="url(#service-gold)"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <IconDefs />
      <rect x="9" y="11" width="30" height="26" rx="6" stroke="url(#service-gold-soft)" strokeWidth="1" />
      <rect x="11.5" y="13.5" width="25" height="21" rx="4.5" stroke="url(#service-gold)" strokeWidth="1.2" />
      <path
        d="M19 24l-4.5-4.5M19 24l-4.5 4.5M29 24l4.5-4.5M29 24l4.5 4.5"
        stroke="url(#service-gold)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 19v10" stroke="url(#service-gold-soft)" strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 2.5" />
    </svg>
  );
}

function VideoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <IconDefs />
      <rect x="8" y="14" width="22" height="20" rx="4" stroke="url(#service-gold)" strokeWidth="1.2" />
      <path
        d="M30 20l10-5v18l-10-5V20z"
        stroke="url(#service-gold)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M14 18h8M14 22h12M14 26h6" stroke="url(#service-gold-soft)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="36" cy="12" r="2" fill="url(#service-gold)" />
    </svg>
  );
}

const ICONS = {
  camera: PhotographyIcon,
  palette: DesignIcon,
  code: CodeIcon,
  video: VideoIcon,
};

export function ServiceIcon({ id, className, ...props }: ServiceIconProps) {
  const Icon = ICONS[id];
  return <Icon className={className} {...props} />;
}
