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
    title: 'Product & interface design',
    promise: 'Interfaces that don’t need a manual. I hate manuals.',
    detail:
      'Structure first, then hierarchy, then the small motion decisions that make a screen feel alive instead of decorated. I design in the browser early, because a layout that only works in Figma is a drawing, not an interface. The flows get drawn for the admin as carefully as for the customer — half of every product is the person operating it.',
    deliverables: ['Flows & information architecture', 'High-fidelity screens', 'Prototype', 'Design system'],
  },
  {
    index: '03',
    title: 'Full-stack product build',
    promise: 'Front end, API, database. Shipped, not demoed.',
    detail:
      'Typed React on the front, Node on the back, Postgres underneath with real migrations. Auth, roles, dashboards, file uploads, background jobs: the unglamorous parts that decide whether a product survives its first month. I write the schema, the API contract and the tests, then deploy it somewhere it stays up. Everything documented, because you should be able to leave me.',
    deliverables: [
      'React + TypeScript front end',
      'Node API + Postgres schema',
      'Auth & roles',
      'Migrations, tests, deploy',
    ],
  },
  {
    index: '04',
    title: 'Messaging & notifications',
    promise: 'Reach everyone, without the bill.',
    detail:
      'Push notifications, email, in-app messaging and the targeting that makes them worth sending: who is in which group, which branch, which age band, which unit. Scheduled campaigns, templates, delivery records, and a preview that shows exactly what the phone will show. Built for the case where the obvious answer — SMS — costs more than the thing you are trying to fund.',
    deliverables: [
      'Push & email delivery',
      'Audience targeting & segments',
      'Scheduling & templates',
      'Delivery reporting',
    ],
  },
  {
    index: '05',
    title: 'Booking, payments & catalogues',
    promise: 'Deposits that reconcile. Webhooks that verify.',
    detail:
      'Availability across branches and staff, deposits, reschedules, and the confirmation receipt nobody notices until it is missing. Paystack and Flutterwave wired properly — server-side verification, idempotent writes, and a fallback for when the network drops mid-payment. The same discipline applies to a forty-SKU boutique or a three-hundred-product export catalogue.',
    deliverables: [
      'Availability engine',
      'Paystack / Flutterwave',
      'Catalogue architecture',
      'Email & WhatsApp receipts',
    ],
  },
];
