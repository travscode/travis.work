import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | Travis Weerts",
  description:
    "Privacy Policy for Travis Weerts — covering all public projects, websites, and apps published under my name including App Store submissions.",
  alternates: {
    canonical: "https://travis.work/privacy",
  },
};

/**
 * PrivacyPolicyPage - Renders the privacy policy page for travis.work
 * Covers all public-facing products: websites, apps (iOS/Android/App Store),
 * and open-source projects published by Travis Weerts.
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-t-black text-tw-white font-object-regular">
      <Header title="Privacy Policy" />

      <section className="pt-40 pb-8 px-8 md:px-16 lg:px-32 bg-tw-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-object-bold mb-4 text-tw-white">
            Privacy Policy
          </h1>
          <p className="text-tw-grey text-sm md:text-base mb-12">
            Last updated: 24 September 2026
          </p>

          <div className="space-y-12 text-tw-white text-sm md:text-base leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome. This Privacy Policy applies to all websites,
                applications (including those submitted to the Apple App Store
                and Google Play Store), software, products, and open-source
                projects (&quot;Services&quot;) made available by Travis Weerts
                (&quot;I&quot;, &quot;me&quot;, &quot;my&quot;, or
                &quot;myself&quot;), whether published under my personal name,
                through travis.work, or under associated project names.
              </p>
              <p className="mb-4">
                I respect your privacy and am committed to being transparent
                about how I handle information. Because I publish a variety of
                independent projects — some of which collect data and some of
                which do not — this policy describes the general framework that
                applies across all Services. Where a specific project has
                unique or additional privacy practices, those will be disclosed
                within that project itself (e.g., within the app, on its
                project page, or in its own supplementary privacy notice).
              </p>
              <p>
                By accessing or using any of my Services, you acknowledge that
                you have read and understood this Privacy Policy.
              </p>
            </section>

            {/* Operator & Contact */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                2. Who I Am &amp; How to Contact Me
              </h2>
              <p className="mb-4">
                The controller responsible for your information under this
                Privacy Policy is:
              </p>
              <div className="bg-tw-grey-dark/30 p-6 rounded-lg mb-4 border border-tw-grey-dark">
                <p className="font-object-bold mb-2">Travis Weerts</p>
                <p>Gooseberry Hill, Western Australia, 6076</p>
                <p>Australia</p>
                <p className="mt-4">
                  Email:{" "}
                  <a
                    href="mailto:travisaweerts@gmail.com"
                    className="text-tw-accent underline hover:text-tw-white transition-colors"
                  >
                    travisaweerts@gmail.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <Link
                    href="/"
                    className="text-tw-accent underline hover:text-tw-white transition-colors"
                  >
                    https://travis.work
                  </Link>
                </p>
              </div>
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or your personal information, please contact me
                using the details above.
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                3. What Information I May Collect
              </h2>
              <p className="mb-4">
                Not every Service collects information. Many of my projects
                (particularly open-source tools, demo apps, and certain
                standalone experiences) are designed to function entirely on
                your device and transmit nothing back to me. Others may collect
                limited information to operate, improve, or understand usage of
                the Service.
              </p>
              <p className="mb-4">
                Where a Service does collect information, it will typically
                fall into one or more of the following categories:
              </p>

              <div className="mb-4">
                <h3 className="font-object-bold text-lg mb-2 text-tw-white">
                  3.1 Information you provide voluntarily
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-tw-grey">
                  <li>
                    Contact details (such as name, email address) when you
                    reach out to me via email, contact forms, or support
                    channels.
                  </li>
                  <li>
                    Account or profile information if you create an account
                    within a Service (only applicable where accounts exist).
                  </li>
                  <li>
                    Content, feedback, or messages you submit voluntarily
                    through forms, surveys, or in-app submissions.
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-object-bold text-lg mb-2 text-tw-white">
                  3.2 Information collected automatically
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-tw-grey">
                  <li>
                    <strong>Log &amp; usage data:</strong> Some Services may
                    automatically record basic information about how you use
                    them, such as device type, operating system, app version,
                    IP address (which may be anonymised where feasible),
                    referring URLs, pages viewed, and the dates/times of
                    access. This helps me understand whether the Service is
                    working and how to improve it.
                  </li>
                  <li>
                    <strong>Analytics:</strong> A Service may use privacy-aware
                    analytics (such as anonymised, aggregated usage metrics) to
                    track performance, crashes, and engagement. Where
                    analytics are used, they are configured to minimise the
                    collection of personally identifiable information.
                  </li>
                  <li>
                    <strong>Cookies &amp; similar technologies:</strong> My
                    website travis.work and any web-based Services may use a
                    small number of cookies or local storage for basic
                    functionality (e.g., remembering preferences) and
                    analytics. You can control cookies through your browser
                    settings.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-object-bold text-lg mb-2 text-tw-white">
                  3.3 Information collected by specific apps &amp; projects
                </h3>
                <p className="text-tw-grey">
                  For apps distributed through the Apple App Store, Google
                  Play, or other marketplaces, any personal information
                  collected by the app is disclosed in the app&apos;s privacy
                  metadata (the &quot;Privacy Nutrition Label&quot; or
                  equivalent) and, where appropriate, within the app itself. If
                  a specific project collects data beyond the general
                  categories above, that project will include its own clear
                  disclosure about what is collected and why.
                </p>
              </div>
            </section>

            {/* How I Use Information */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                4. How I Use Your Information
              </h2>
              <p className="mb-4">
                If and when information is collected, I use it only for
                legitimate, clearly disclosed purposes. These may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-tw-grey">
                <li>
                  <strong>Providing &amp; operating the Service:</strong>{" "}
                  Running the website, app, or project and enabling the
                  features you requested.
                </li>
                <li>
                  <strong>Maintenance &amp; improvement:</strong> Fixing bugs,
                  optimising performance, evaluating features, and improving
                  the overall quality of the Service.
                </li>
                <li>
                  <strong>Support &amp; communication:</strong> Responding to
                  your questions, feedback, or support requests, and (only if
                  you have explicitly opted in) providing updates about
                  projects.
                </li>
                <li>
                  <strong>Security &amp; integrity:</strong> Protecting the
                  Service and users from abuse, fraud, spam, and unauthorised
                  access.
                </li>
                <li>
                  <strong>Compliance:</strong> Complying with applicable laws,
                  regulations, and legal obligations, including those required
                  by platform operators such as Apple and Google for
                  apps listed in their stores.
                </li>
                <li>
                  <strong>Aggregated insights:</strong> Creating anonymised,
                  aggregated statistics and reports about how Services are
                  used, which cannot reasonably be used to re-identify any
                  individual.
                </li>
              </ul>
            </section>

            {/* No Third-Party Sharing */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                5. I Do Not Sell or Share Your Information with Third Parties
              </h2>
              <p className="mb-4">
                I do not sell, rent, trade, or otherwise share your personal
                information with any third parties for their own commercial or
                marketing purposes — period.
              </p>
              <p className="mb-4">
                In the limited circumstances where information is processed by
                an external provider, it is only so that the provider can
                perform services on my behalf (for example: hosting,
                infrastructure, analytics, or email delivery), and only under
                strict obligations of confidentiality and security. These
                processors are not permitted to use your information for any
                purpose other than what I instruct.
              </p>
              <p>
                Any such third-party processing is kept to a minimum and, where
                possible, I prefer self-hosted, open-source, or
                privacy-preserving alternatives that do not expose your
                information to third parties at all.
              </p>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                6. Legal Basis for Processing (Where Applicable)
              </h2>
              <p className="mb-4">
                To the extent that laws such as the European General Data
                Protection Regulation (GDPR) or the UK GDPR apply to the
                processing of your information, I rely on the following legal
                bases, as appropriate:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-tw-grey">
                <li>
                  <strong>Consent:</strong> Where you have expressly consented
                  to processing for a specific purpose (e.g., opting in to
                  receive updates). You can withdraw your consent at any time.
                </li>
                <li>
                  <strong>Performance of a contract:</strong> Where processing
                  is necessary to deliver a Service you have requested.
                </li>
                <li>
                  <strong>Legitimate interests:</strong> Where processing is in
                  my legitimate interests and is not overridden by your rights
                  and interests, such as to improve and secure the Services.
                </li>
                <li>
                  <strong>Legal obligation:</strong> Where processing is
                  required to comply with a legal or regulatory obligation.
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                7. Your Rights Over Your Information
              </h2>
              <p className="mb-4">
                Depending on where you reside, you may have certain rights
                regarding your personal information, including the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-tw-grey mb-4">
                <li>
                  Request access to the personal information I hold about you.
                </li>
                <li>
                  Request correction of any inaccurate or incomplete personal
                  information.
                </li>
                <li>
                  Request erasure of your personal information (&quot;right to
                  be forgotten&quot;), where permitted by law.
                </li>
                <li>
                  Restrict or object to certain types of processing.
                </li>
                <li>
                  Receive your personal information in a portable format
                  (data portability).
                </li>
                <li>
                  Withdraw any consent you have previously given.
                </li>
                <li>
                  Lodge a complaint with a supervisory authority if you
                  believe your rights have been infringed.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact me at the
                email address listed in Section 2 above. I will respond to all
                legitimate requests within a reasonable timeframe and in
                accordance with applicable law.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                8. Retention of Your Information
              </h2>
              <p className="mb-4">
                I only retain personal information for as long as it is
                necessary for the purposes for which it was collected, or as
                required by applicable law, regulation, or legal obligation.
              </p>
              <p>
                When information is no longer required, I will securely delete
                or anonymise it, taking into account the nature of the
                information, the sensitivity of the processing, and the risk
                to individuals if the information were compromised.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                9. Security
              </h2>
              <p className="mb-4">
                I take the security of information seriously and implement
                reasonable technical and organisational measures to protect any
                information I hold. These measures may include encryption,
                access controls, secure hosting, regular updates, and secure
                development practices.
              </p>
              <p>
                That said, no method of transmission over the internet or
                electronic storage is 100% secure. While I strive to use
                commercially acceptable means to protect your information, I
                cannot guarantee its absolute security. If I become aware of a
                security incident that affects your information, I will notify
                you and any relevant authorities as required by applicable
                law.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                10. Children&apos;s Privacy
              </h2>
              <p className="mb-4">
                My Services are not directed at children under the age of 13
                (or the applicable age of digital majority in your
                jurisdiction), and I do not knowingly collect personal
                information from children.
              </p>
              <p>
                If you are a parent or guardian and believe your child has
                provided personal information to me, please contact me using
                the details in Section 2 above. I will take reasonable steps
                to promptly delete any such information from my systems.
              </p>
            </section>

            {/* App Store / Third-Party Platforms */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                11. Third-Party Platforms &amp; App Stores
              </h2>
              <p className="mb-4">
                Some of my Services are distributed through third-party
                platforms, such as the Apple App Store or Google Play. These
                platforms operate their own privacy policies and practices and
                may collect certain information about you according to their
                own terms. Platform-level information (such as your Apple ID,
                Google Account, or purchase/installation metadata) is
                controlled by the platform provider and is not processed by me.
              </p>
              <p>
                I encourage you to review the privacy policies of Apple,
                Google, and any other platform from which you download or
                access my Services to understand how they handle your
                information.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                12. International Transfers
              </h2>
              <p className="mb-4">
                I am based in Australia. Information I collect may be stored,
                processed, and transferred between Australia and other
                countries in which I or my service providers operate. By using
                a Service, you acknowledge that your information may be
                transferred to countries that may have different data
                protection laws from the country in which you reside.
              </p>
              <p>
                Where personal information is transferred internationally, I
                will take reasonable steps to ensure that appropriate
                safeguards are in place to protect it.
              </p>
            </section>

            {/* Do Not Track */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                13. Do Not Track Signals
              </h2>
              <p>
                Browsers may offer &quot;Do Not Track&quot; (DNT) signals.
                Because there is currently no universally accepted standard
                for how to interpret DNT signals, and because I do not engage
                in cross-site tracking across unrelated third-party services,
                I generally do not alter my behaviour in response to DNT
                headers. However, you can always control how information is
                collected through your browser, device, and in-app settings.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                14. Changes to This Privacy Policy
              </h2>
              <p className="mb-4">
                I may update this Privacy Policy from time to time to reflect
                changes in my practices, to cover new Services, or to comply
                with updated legal or regulatory requirements. When I do, I
                will revise the &quot;Last updated&quot; date at the top of
                this page and, where the changes are material, I will make
                reasonable efforts to provide a more prominent notice (such as
                a banner on my website or a notice within an affected app).
              </p>
              <p>
                Your continued use of any Service after the revised Privacy
                Policy takes effect constitutes your acceptance of the changes.
              </p>
            </section>

            {/* Summary */}
            <section className="border-t border-tw-grey-dark pt-12">
              <h2 className="text-xl md:text-2xl font-object-bold mb-4 text-tw-accent">
                15. In Short
              </h2>
              <p className="mb-2">
                <strong className="text-tw-white">My approach:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-tw-grey">
                <li>
                  Many of my projects collect no information at all — they
                  run entirely on your device.
                </li>
                <li>
                  When a Service does collect information, it is only what is
                  reasonably necessary, and only for the purposes described
                  above.
                </li>
                <li>
                  I do <em className="text-tw-white">not</em> sell your
                  information or share it with third parties for their own
                  purposes.
                </li>
                <li>
                  If you ever have questions or want your information removed,
                  email me — I&apos;ll be happy to help.
                </li>
              </ul>
            </section>

            <div className="pt-8 border-t border-tw-grey-dark">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-tw-accent text-tw-black font-object-bold rounded-full hover:bg-tw-white transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
