import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PromptPal Privacy Policy - How we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-slate max-w-3xl mx-auto">
      <h1>Privacy Policy</h1>
      <p className="lead text-muted-foreground">
        Last updated: January 9, 2025
      </p>

      <p>
        At PromptPal ("we," "us," or "our"), we are committed to protecting your privacy
        and ensuring the security of your personal information. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you use our
        AI-powered content creation platform.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>1.1 Information You Provide</h3>
      <ul>
        <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
        <li><strong>Payment Information:</strong> Credit card details and billing address (processed securely via Stripe)</li>
        <li><strong>Content:</strong> Prompts you create, images and videos you generate, and content you save</li>
        <li><strong>Communications:</strong> Messages you send to our support team</li>
      </ul>

      <h3>1.2 Automatically Collected Information</h3>
      <ul>
        <li><strong>Usage Data:</strong> Features used, generation history, and platform interactions</li>
        <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
        <li><strong>Log Data:</strong> IP address, access times, and pages viewed</li>
        <li><strong>Cookies:</strong> Session cookies and analytics cookies (see Section 5)</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the collected information to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process your transactions and manage your account</li>
        <li>Send you service-related notifications and updates</li>
        <li>Respond to your inquiries and support requests</li>
        <li>Analyze usage patterns to enhance user experience</li>
        <li>Prevent fraud and ensure platform security</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. AI-Generated Content</h2>
      <p>
        When you use PromptPal to generate content:
      </p>
      <ul>
        <li>Your prompts are processed by third-party AI services (including Hugging Face, OpenAI, and Stability AI)</li>
        <li>Generated content is stored in your account and associated with your user profile</li>
        <li>We may use anonymized prompt data to improve our prompt suggestion algorithms</li>
        <li>We do not claim ownership of content you generate—you retain full rights to your creations</li>
      </ul>

      <h2>4. Information Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li><strong>Service Providers:</strong> Third parties who help us operate our platform (payment processors, cloud hosting, AI model providers)</li>
        <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
      </ul>
      <p>
        We <strong>do not</strong> sell your personal information to third parties.
      </p>

      <h2>5. Cookies and Tracking</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Keep you signed in to your account</li>
        <li>Remember your preferences</li>
        <li>Analyze platform usage (via privacy-respecting analytics)</li>
      </ul>
      <p>
        You can control cookies through your browser settings. Disabling cookies may affect
        some platform features.
      </p>

      <h2>6. Data Security</h2>
      <p>We implement industry-standard security measures including:</p>
      <ul>
        <li>TLS 1.3 encryption for data in transit</li>
        <li>AES-256 encryption for sensitive data at rest</li>
        <li>Regular security audits and penetration testing</li>
        <li>Access controls and authentication requirements</li>
        <li>Secure payment processing via Stripe (PCI-DSS compliant)</li>
      </ul>

      <h2>7. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active. Generated content is
        retained for 90 days by default, after which it may be automatically deleted.
        You can request deletion of your data at any time.
      </p>

      <h2>8. Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access and download your personal data</li>
        <li>Correct inaccurate information</li>
        <li>Delete your account and associated data</li>
        <li>Object to certain processing activities</li>
        <li>Data portability</li>
      </ul>
      <p>
        To exercise these rights, contact us at privacy@promptpal.ai.
      </p>

      <h2>9. International Data Transfers</h2>
      <p>
        Your data may be transferred to and processed in countries outside your residence.
        We ensure appropriate safeguards are in place, including Standard Contractual Clauses
        for EU data transfers.
      </p>

      <h2>10. Children's Privacy</h2>
      <p>
        PromptPal is not intended for users under 13 years of age. We do not knowingly
        collect information from children under 13.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. We will notify you of significant
        changes via email or platform notification. Continued use after changes constitutes
        acceptance of the updated policy.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        For questions about this Privacy Policy or our data practices, contact us at:
      </p>
      <ul>
        <li>Email: privacy@promptpal.ai</li>
        <li>Address: PromptPal, 123 AI Street, San Francisco, CA 94102</li>
      </ul>
    </article>
  );
}
