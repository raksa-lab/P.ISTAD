import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6  rounded-lg">
        <h1 className="text-3xl font-OpenSanBold mb-6 text-center">
          Privacy Policy
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            This Privacy Policy outlines how iShop collects, uses, and shares
            your personal information when you visit or make a purchase from our
            website,{" "}
            <a
              href="https://www.ishop.com"
              className="text-blue-500 hover:underline"
            >
              www.ishop.com
            </a>
            . Your privacy is important to us, and we are committed to
            protecting your personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            Personal Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            When you visit iShop, we automatically gather certain information
            about your device and how you interact with our website. This
            includes:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Device Information:</strong> Details about your web
              browser, IP address, time zone, and cookies installed on your
              device.
            </li>
            <li>
              <strong>Interaction Data:</strong> Information about the pages or
              products you view, the websites or search terms that referred you
              to iShop, and how you interact with the site.
            </li>
          </ul>
          <p className="text-gray-700 mb-4">
            We collect this data using technologies like:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Cookies:</strong> Small data files stored on your device
              with a unique identifier.
            </li>
            <li>
              <strong>Log Files:</strong> Track actions on the site, including
              your IP address, browser type, and timestamps.
            </li>
            <li>
              <strong>Web Beacons, Tags, and Pixels:</strong> Electronic files
              used to record how you browse the site.
            </li>
          </ul>
          <p className="text-gray-700 mb-4">
            When you make a purchase or attempt to make a purchase on iShop, we
            collect:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Your name, billing address, shipping address, payment information
              (e.g., credit card numbers), email address, and phone number.
            </li>
          </ul>
          <p className="text-gray-700 mb-4">
            This information is referred to as{" "}
            <strong>"Order Information."</strong> In this Privacy Policy,{" "}
            <strong>"Personal Information"</strong> refers to both Device
            Information and Order Information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            How We Use Your Personal Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use your personal information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Order Fulfillment:</strong> To process and fulfill your
              orders, including payment processing, shipping arrangements, and
              sending order confirmations or invoices.
            </li>
            <li>
              <strong>Communication:</strong> To communicate with you about your
              orders, provide customer support, and respond to inquiries.
            </li>
            <li>
              <strong>Fraud Prevention:</strong> To screen orders for potential
              risks or fraud, particularly using your IP address and payment
              details.
            </li>
            <li>
              <strong>Personalized Advertising:</strong> To provide you with
              information or advertising about our products and services, based
              on the preferences you’ve shared with us.
            </li>
            <li>
              <strong>Site Improvement:</strong> To analyze how customers browse
              and interact with iShop, optimize our website, and evaluate the
              success of our marketing campaigns.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            Sharing Your Personal Information
          </h2>
          <p className="text-gray-700 mb-4">
            We may share your personal information with third parties to help us
            use it as described above. For example:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              <strong>Payment Processors:</strong> To handle payment
              transactions securely.
            </li>
            <li>
              <strong>Shipping Providers:</strong> To deliver your orders.
            </li>
            <li>
              <strong>Analytics Tools:</strong> To understand how customers use
              our site and improve its functionality.
            </li>
          </ul>
          <p className="text-gray-700 mb-4">
            We will never sell your personal information to third parties for
            their own marketing purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access the personal information we hold about you.</li>
            <li>Request corrections or deletions of your data.</li>
            <li>Opt out of receiving marketing communications.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:support@ishop.com"
              className="text-blue-500 hover:underline"
            >
              support@ishop.com
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            Changes to This Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. Any updates will be
            posted on this page.
          </p>
        </section>

        <section>
          <p className="text-gray-700">
            This policy ensures transparency about how iShop handles your data,
            builds trust, and complies with privacy laws. If you have any
            questions, feel free to reach out to our customer support team!
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
