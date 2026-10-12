// Live map content. Save this file and the open page reloads within a second.
// Field reference: ../reference/data-format.md
window.MAP = {
  lang: 'en', // 'en' | 'zh-Hant' | 'zh-Hans' (labels only; write content in the user's language)
  title: 'Sample: add sign-in to a small web app',
  tree: {
    t: 'Sign-in',
    ex: [['n', 'People sign in with email. No passwords to forget.']],
    kids: [
      {
        t: 'How people sign in',
        mark: 'set',
        ex: [['u', 'Email or Google?'], ['a', 'Email link first. Google later if people ask.']],
        flow: [
          { role: 'Steps', items: [0, 1] },
          { rel: 'then', items: [2] }
        ],
        base: { rel: 'needs', items: [3] },
        kids: [
          { t: 'Enter email', mark: 'set', ex: [['n', 'One field, one button.']] },
          { t: 'Get link', mark: 'set', links: [[2, 0]], ex: [['n', 'Link works for 15 minutes.']] },
          { t: 'Signed in', mark: 'draft', ex: [['n', 'Stay signed in for 30 days.']], was: { from: '7 days', to: '30 days, fewer emails' } },
          { t: 'Email sender', mark: 'res', ex: [['n', 'A transactional email service.']] }
        ]
      },
      {
        t: 'Accounts',
        mark: 'draft',
        cmp: { them: 'Most small apps make the account on first sign-in.', us: 'No accounts yet.', st: 'bad' },
        kids: [
          { t: 'Create on first sign-in', mark: 'draft', ex: [['n', 'No separate sign-up page.']] },
          { t: 'Delete account', mark: 'later', ex: [['n', 'Needed before launch, not now.']] }
        ]
      },
      {
        t: 'Safety',
        mark: 'core',
        kids: [
          { t: 'Rate limit', mark: 'draft', ex: [['n', 'Max 5 links per email per hour.']] },
          { t: 'Log sign-ins', mark: 'later', ex: [['n', 'Who, when, from where.']] }
        ]
      }
    ]
  }
};
