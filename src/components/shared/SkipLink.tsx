type Props = {
  label: string;
  href?: string;
};

export function SkipLink({ label, href = "#main" }: Props) {
  return (
    <a href={href} className="skip-link">
      {label}
    </a>
  );
}
