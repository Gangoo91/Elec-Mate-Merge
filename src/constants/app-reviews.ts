// Real Apple App Store reviews — captured from the ASC API.
//
// Used by <RecentReviews /> to satisfy Google's structured-data policy:
// aggregateRating on SoftwareApplication schema requires the individual
// reviews backing the aggregate to be visible on the same page.
//
// Refresh procedure (manual until automated):
//   mcp__appstoreconnect__asc_list_customer_reviews --territory GBR --limit 200
//   Copy the rows into APP_STORE_REVIEWS below.
//   Update APP_STORE_RATING in src/constants/app-ratings.ts to match.
//
// TODO: build-time script that hits ASC API and rewrites this file.

export interface AppStoreReview {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  reviewerNickname: string;
  territory: string;       // ISO-3
  createdDate: string;     // ISO timestamp
}

export const APP_STORE_REVIEWS: AppStoreReview[] = [
  {
    id: '00000192-dd5f-3903-4170-686b00000000',
    rating: 5,
    title: 'One App for Everything!',
    body:
      "Elec-Mate is my go to app for business and electrical work. It's feature rich without feeling cluttered. A true all in one app for quotes, certs, calculations, RAMS, EICRs, and more. I use it every day without fail, and it makes my workflow much smoother since I'm not jumping between apps anymore. The price-to-feature ratio is excellent. Any issues I've had, the developer responds within the hour and usually fixes them the same day. 100% recommend.",
    reviewerNickname: 'I.staffy',
    territory: 'GBR',
    createdDate: '2026-04-21T13:12:15-07:00',
  },
  {
    id: '00000192-dd5f-3903-3f96-5df400000000',
    rating: 5,
    title: 'Fantastic app for electricians',
    body:
      "I've used the app and the web based version for a while now and it's well worth the investment. If you're an apprentice or experienced Spark give it a go, you won't be disappointed.",
    reviewerNickname: 'Chief6uk',
    territory: 'GBR',
    createdDate: '2026-04-12T15:59:49-07:00',
  },
  {
    id: '00000192-dd5f-3903-3ee7-1cbf00000000',
    rating: 5,
    title: 'Absolutely amazing',
    body:
      "I've been using Elec-Mate for a while now, and honestly, it's one of the best apps I've ever downloaded. Every aspect of it feels thoughtfully designed, from the clean and intuitive interface to the powerful features that make everything so easy to manage. It's clear that a lot of care and attention went into building this app, and it shows in every detail.",
    reviewerNickname: 'COLE12345789101112131415',
    territory: 'GBR',
    createdDate: '2026-04-09T11:40:50-07:00',
  },
  {
    id: '00000192-dd5f-3903-3c5d-93d000000000',
    rating: 5,
    title: 'Sparks best mate',
    body:
      'Absolutely superb as an app, I can invoice, complete testing certs and reports as well as track my cpd. Everything in one place is exactly what I need, worth every penny.',
    reviewerNickname: 'Jayecco',
    territory: 'GBR',
    createdDate: '2026-03-28T14:33:40-07:00',
  },
  {
    id: '00000192-dd5f-3903-3c5a-060f00000000',
    rating: 5,
    title: 'Amazing App and Value',
    body:
      'The amount of features inside the app is mind boggling, incredible value and incredible features. A complete game changer!',
    reviewerNickname: 'Beckywaddington33',
    territory: 'GBR',
    createdDate: '2026-03-28T13:02:31-07:00',
  },
];
