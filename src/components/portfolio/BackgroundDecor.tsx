export function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 wave-bg opacity-40" />
      <div className="pointer-events-none fixed -right-32 -top-32 -z-10 h-[420px] w-[420px] rounded-full bg-orange/10 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-40 -left-32 -z-10 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[100px]" />
      <div className="grain" aria-hidden />
    </>
  );
}
