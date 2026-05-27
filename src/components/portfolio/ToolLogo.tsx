export type ToolIconId =
  | "photoshop"
  | "lightroom"
  | "aftereffects"
  | "premiere"
  | "davinci"
  | "capcut"
  | "vn"
  | "vscode"
  | "nextjs";

const TOOL_IMAGES: Record<ToolIconId, string> = {
  photoshop: "/images/photoshop logo.png",
  lightroom: "/images/lightroom logo.png",
  aftereffects: "/images/after-effects.png",
  premiere: "/images/premiere-pro.png",
  davinci: "/images/davinci.png",
  capcut: "/images/Capcut.jpg",
  vn: "/images/vn.webp",
  vscode: "/images/vs-code logo.png",
  nextjs: "/images/nextjs.png",
};

type ToolLogoProps = {
  icon: ToolIconId;
  className?: string;
};

export function ToolLogo({ icon, className = "h-9 w-9" }: ToolLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={encodeURI(TOOL_IMAGES[icon])}
      alt=""
      className={`${className} object-contain`}
    />
  );
}
