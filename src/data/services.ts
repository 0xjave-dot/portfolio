export interface Service {
  index: string;
  title: string;
  promise: string;
  detail: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    index: '01',
    title: 'Brand identity',
    promise: 'A mark that survives a favicon.',
    detail:
      'Before a website can look expensive, the thing underneath it has to hold. I build the system first — type, colour, spacing, image rules — so the site is a consequence of the brand and not a container for a logo. If your logo only works at 800px, it does not work.',
    deliverables: ['Wordmark & mark', 'Type + colour system', 'Usage rules', 'Favicon that reads at 16px'],
  },
  {
    index: '02',
    title: 'UI/UX design',
    promise: 'Interfaces that don’t need a manual. I hate manuals.',
    detail:
      'Structure first, then hierarchy, then the small motion decisions that make a page feel alive instead of decorated. I design in the browser early, because a layout that only works in Figma is a drawing, not an interface.',
    deliverables: ['Sitemap & flows', 'High-fidelity screens', 'Prototype', 'Design system'],
  },
  {
    index: '03',
    title: 'Full-stack web apps',
    promise: 'React up front, Firebase behind. Shipped, not demoed.',
    detail:
      'Typed React, Firebase Auth / Firestore / Storage, and a Node layer where it earns its place. Auth, roles, dashboards, email, file uploads: the unglamorous parts that decide whether a product survives its first month. Everything documented, because you should be able to leave me.',
    deliverables: ['React + TypeScript', 'Firebase / Node APIs', 'Admin dashboards', 'Handover docs'],
  },
  {
    index: '04',
    title: 'Booking & payments',
    promise: 'Deposits that reconcile. Webhooks that verify.',
    detail:
      'Availability across branches and staff, deposits, reschedules, and the confirmation receipt nobody notices until it is missing. Paystack and Flutterwave wired properly — server-side verification, idempotent writes, and a fallback for when the network drops mid-payment.',
    deliverables: ['Availability engine', 'Paystack / Flutterwave', 'Email & WhatsApp receipts', 'Staff calendar'],
  },
  {
    index: '05',
    title: 'Ecommerce & catalogues',
    promise: 'Catalogues that don’t lose the sale at checkout.',
    detail:
      'A 23-product export catalogue or a boutique with forty SKUs, the rules are the same: honest photography, prices people can find, and a checkout with as few decisions as possible. Fewer fields, fewer abandoned carts, fewer sad emails.',
    deliverables: ['Catalogue architecture', 'Cart & checkout', 'Order management', 'Shipping logic'],
  },
];
