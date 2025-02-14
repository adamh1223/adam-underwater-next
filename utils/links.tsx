type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/favorites", label: "Your favorites" },
  { href: "/reviews", label: "Your reviews" },
  { href: "/orders", label: "your orders" },
  { href: "/admin/sales", label: "Admin Dashboard" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "sales" },
  { href: "/admin/products", label: "my products" },
  { href: "/admin/products/create", label: "create product" },
  { href: "/admin/EProducts/create", label: "create EProduct" },
];
