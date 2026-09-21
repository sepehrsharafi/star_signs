export type NavItem = {
  href: string;
  label: string;
  index: string;
  blurb: string;
};

export const navItems: NavItem[] = [
  { href: "/work", label: "Work", index: "01", blurb: "Signs we have built" },
  {
    href: "/services",
    label: "Services",
    index: "02",
    blurb: "What we fabricate",
  },
  {
    href: "/process",
    label: "Process",
    index: "03",
    blurb: "Survey to service",
  },
  { href: "/about", label: "About", index: "04", blurb: "The shop and crew" },
  {
    href: "/journal",
    label: "Journal",
    index: "05",
    blurb: "Notes from the trade",
  },
  { href: "/faq", label: "FAQ", index: "06", blurb: "Asked and answered" },
  {
    href: "/contact",
    label: "Contact",
    index: "07",
    blurb: "Start a project",
  },
];

/** Longest-prefix match so /work/ardent-coffee still reports "Work". */
export function labelForPath(pathname: string): string {
  if (pathname === "/") return "Index";
  const hit = navItems
    .filter((n) => pathname === n.href || pathname.startsWith(n.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return hit?.label ?? "Star Signs";
}
