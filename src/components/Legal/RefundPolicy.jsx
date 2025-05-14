import React from "react";

const RefundPolicy = () => {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6  rounded-lg">
        <h1 className="text-3xl font-OpenSanBold mb-6 text-center">
          Refund Policy
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            1.30-Day Return Policy
          </h2>
          <p className="text-gray-700 mb-4">
            iShop offers a 30-day return policy for electronics. If you're
            dissatisfied with your purchase, you can return the product within
            30 days for a full refund. The product must be unused, in its
            original condition, and include all original packaging and
            accessories. A return label is provided for free returns.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            2.Eligibility for Returns
          </h2>
          <p className="text-gray-700 mb-4">
            To be eligible for a return, the item must be in the same condition
            as when you received it. This means it should be unused, with all
            original packaging and components intact. If the item is damaged or
            missing parts due to reasons not related to iShop's error, only a
            partial refund may be granted.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">3.Refund Process</h2>
          <p className="text-gray-700 mb-4">
            Once iShop receives and inspects the returned item, they will notify
            you via email about the status of your refund. If approved, the
            refund will be processed and credited back to your original payment
            method. This process typically takes a few business days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            4.Late or Missing Refunds
          </h2>
          <p className="text-gray-700 mb-4">
            If you haven't received your refund within 14 business days after
            the return is processed, you should contact iShop's customer service
            at{" "}
            <a
              href="mailto:sales@ishop.com"
              className="text-blue-500 hover:underline"
            >
              sales@ishop.com
            </a>{" "}
            for assistance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">5.Exchanges</h2>
          <p className="text-gray-700 mb-4">
            If you received a defective or incorrect item, iShop may offer an
            exchange. You would need to contact their customer service to
            arrange this, providing details of the issue and possibly returning
            the original item.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">6.Shipping</h2>
          <p className="text-gray-700 mb-4">
            iShop provides a return shipping label for free returns. However, if
            you choose to use your own shipping method, you may be responsible
            for the return shipping costs unless the return is due to an error
            on iShop's part (e.g., wrong item shipped).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-OpenSanBold mb-4">
            7.Non-Returnable Items
          </h2>
          <p className="text-gray-700 mb-4">
            Some items, such as software, downloadable content, or personalized
            electronics, may not be eligible for return unless they are
            defective.
          </p>
        </section>

        <section>
          <p className="text-gray-700">
            This policy ensures that customers have a clear understanding of
            their rights and responsibilities when purchasing from iShop,
            helping to build trust and ensure a positive shopping experience.
            Always check the specific terms on iShop's website for the most
            accurate and detailed information.
          </p>
        </section>
      </div>
    </main>
  );
};

export default RefundPolicy;
