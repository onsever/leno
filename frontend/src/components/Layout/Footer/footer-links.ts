export type FooterPath = {
  link: string;
  path: string;
};

export type FooterLink = {
  title: string;
  links: FooterPath[];
};

export const footerLinks: FooterLink[] = [
  {
    title: "Help & Information",
    links: [
      {
        link: "Help Center",
        path: "/",
      },
      {
        link: "Terms and Conditions",
        path: "/",
      },
      {
        link: "Privacy Policy",
        path: "/",
      },
      {
        link: "Cookie Statement",
        path: "/",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        link: "About Us",
        path: "/",
      },
      {
        link: "Blog",
        path: "/",
      },
      {
        link: "Vacancies",
        path: "/",
      },
      {
        link: "Sitemap",
        path: "/",
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        link: "Women",
        path: "/",
      },
      {
        link: "Men",
        path: "/",
      },
      {
        link: "Kids",
        path: "/",
      },
    ],
  },
];
