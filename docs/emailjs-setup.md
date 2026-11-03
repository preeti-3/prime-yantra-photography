# EmailJS setup

Create an email template in your EmailJS dashboard. Paste the contents of `emailjs-template.html` into its HTML editor, or use this simple text body:

```text
New enquiry — Prime Yantra Photography

Name: {{from_name}}
Email: {{from_email}}
Service: {{inquiry_type}}
Submitted: {{submitted_at}}

Event details and location:
{{message}}
```

Template settings:

- To Email: `kumaraman50099@gmail.com`
- Subject: `New photography enquiry from {{from_name}}`
- From Name: `Prime Yantra Photography Website`
- From Email: use the default address from your connected EmailJS email service.
- Reply To: `{{reply_to}}`

Copy `.env.example` to `.env.local` and fill in your own EmailJS service ID, template ID and public key. Restart the app or rebuild after changing these values. In EmailJS, allow your deployed website domain.

When configured, the website sends these template parameters directly through EmailJS. Without configuration, it opens an email draft addressed to the studio instead; the visitor must send the draft.
