import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PromptPal Terms of Service - Rules and guidelines for using our platform.',
};

export default function TermsOfServicePage() {
  return (
    <article className="prose prose-slate max-w-3xl mx-auto">
      <h1>Terms of Service</h1>
      <p className="lead text-muted-foreground">
        Last updated: January 9, 2025
      </p>

      <p>
        Welcome to PromptPal. By accessing or using our AI-powered content creation platform
        ("Service"), you agree to be bound by these Terms of Service ("Terms"). Please read
        them carefully before using our Service.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By creating an account or using PromptPal, you acknowledge that you have read,
        understood, and agree to be bound by these Terms and our Privacy Policy. If you
        do not agree, you may not use our Service.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        PromptPal is an AI-powered platform that enables users to:
      </p>
      <ul>
        <li>Generate images, videos, and other creative content using AI models</li>
        <li>Receive intelligent prompt suggestions and enhancements</li>
        <li>Save, organize, and manage generated content</li>
        <li>Access prompt templates and community resources</li>
      </ul>

      <h2>3. Account Registration</h2>
      <h3>3.1 Eligibility</h3>
      <p>
        You must be at least 13 years old to use PromptPal. By registering, you represent
        that you meet this age requirement and have the legal capacity to enter into these Terms.
      </p>
      <h3>3.2 Account Security</h3>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials
        and for all activities under your account. Notify us immediately of any unauthorized
        access at support@promptpal.ai.
      </p>

      <h2>4. Credits and Payments</h2>
      <h3>4.1 Credit System</h3>
      <ul>
        <li>Credits are required to generate content on PromptPal</li>
        <li>Free credits are provided upon registration (subject to change)</li>
        <li>Additional credits can be purchased through our credit packages</li>
        <li>Credits do not expire while your account remains active</li>
      </ul>
      <h3>4.2 Purchases</h3>
      <ul>
        <li>All purchases are processed securely via Stripe</li>
        <li>Prices are displayed in USD unless otherwise specified</li>
        <li>All sales are final; refunds are provided at our discretion</li>
        <li>We reserve the right to modify pricing with reasonable notice</li>
      </ul>

      <h2>5. Acceptable Use Policy</h2>
      <p>You agree NOT to use PromptPal to:</p>
      <ul>
        <li>Generate illegal, harmful, or obscene content</li>
        <li>Create content that infringes on intellectual property rights</li>
        <li>Generate deepfakes or non-consensual intimate imagery</li>
        <li>Produce content promoting violence, hate speech, or discrimination</li>
        <li>Create misleading content intended to deceive (e.g., fake news)</li>
        <li>Attempt to circumvent our content moderation systems</li>
        <li>Use automated systems to access the Service without permission</li>
        <li>Resell or redistribute our Service without authorization</li>
      </ul>
      <p>
        We reserve the right to suspend or terminate accounts that violate these policies.
      </p>

      <h2>6. Intellectual Property</h2>
      <h3>6.1 Your Content</h3>
      <p>
        You retain ownership of content you create using PromptPal, subject to the rights
        of any underlying models or datasets. You grant us a limited license to store,
        display, and process your content to provide the Service.
      </p>
      <h3>6.2 Our Platform</h3>
      <p>
        PromptPal, including its design, features, and branding, is owned by us and protected
        by intellectual property laws. You may not copy, modify, or distribute our platform
        without permission.
      </p>
      <h3>6.3 AI Model Terms</h3>
      <p>
        Content generated through our platform is also subject to the terms of the underlying
        AI model providers (e.g., Stability AI, OpenAI). You agree to comply with their
        respective usage policies.
      </p>

      <h2>7. Content Moderation</h2>
      <p>
        We employ automated and manual content moderation to enforce our Acceptable Use Policy.
        We may remove content or restrict account access without prior notice if we determine
        a violation has occurred.
      </p>

      <h2>8. Service Availability</h2>
      <p>
        We strive for high availability but do not guarantee uninterrupted access. The Service
        may be temporarily unavailable due to maintenance, updates, or circumstances beyond
        our control. We are not liable for any losses resulting from service interruptions.
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
        EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, SECURE,
        OR MEET YOUR SPECIFIC REQUIREMENTS.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROMPTPAL SHALL NOT BE LIABLE FOR ANY
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM
        YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU
        PAID US IN THE PAST 12 MONTHS.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless PromptPal and its affiliates from any
        claims, damages, or expenses arising from your use of the Service, your content,
        or your violation of these Terms.
      </p>

      <h2>12. Termination</h2>
      <p>
        We may suspend or terminate your account at our discretion if you violate these Terms.
        You may also delete your account at any time through your account settings. Upon
        termination, your right to use the Service ceases immediately.
      </p>

      <h2>13. Modifications to Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of material changes
        via email or platform notification. Continued use after changes constitutes acceptance
        of the modified Terms.
      </p>

      <h2>14. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the State of California, USA, without regard
        to conflict of law principles. Any disputes shall be resolved in the courts of
        San Francisco, California.
      </p>

      <h2>15. Contact Information</h2>
      <p>
        For questions about these Terms, contact us at:
      </p>
      <ul>
        <li>Email: legal@promptpal.ai</li>
        <li>Address: PromptPal, 123 AI Street, San Francisco, CA 94102</li>
      </ul>
    </article>
  );
}
