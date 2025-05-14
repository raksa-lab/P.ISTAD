import React from "react";
import { CiSearch } from "react-icons/ci";
export default function FAQsPage() {
  const QuestionItem = ({ question, answer }) => {
    return (
      <article className="mb-8  ">
        <h3 className="mb-4 text-lg font-medium leading-7 text-gray-900 max-sm:text-base">
          {question}
        </h3>
        <p className="text-base leading-6 text-gray-500 max-sm:text-sm">
          {answer}
        </p>
      </article>
    );
  };

  const FAQ = () => {
    // FAQ data structure
    const faqData = {
      leftColumn: [
        {
          question: "What types of products does your e-commerce website sell?",
          answer:
            "We sell a wide range of electronics, including smartphones, laptops, desktop computers, keyboards, mice, speakers, and headphones.",
        },
        {
          question: "Do you provide product warranties?",
          answer:
            "Yes, all new products come with a manufacturer's warranty, and refurbished products may have a limited warranty depending on the seller.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We have bakong KH QR for bank transfers, and installment plans through selected payment providers that make our costumers easy to process.",
        },
        {
          question: "Can I cancel or modify my order after placing it?",
          answer:
            "You can cancel or modify your order place before you paid the money.",
        },
        {
          question: "How can I track my order?",
          answer:
            "After placing your order, you will receive a tracking recipe paper via your email for detail that you go to pick up your product.",
        },
        {
          question: "Do you offer discounts or promotions?",
          answer:
            "Yes! We regularly have special deals, discounts, and seasonal promotions. Sign up for our newsletter to stay updated.",
        },
        {
          question: "How long does shipping take?",
          answer:
            "Shipping times vary based on location and product availability. Standard delivery processing takes 1-3 business days.",
        },
      ],
      rightColumn: [
        {
          question: "Is there free for delivery available?",
          answer: "We offer free delivery on orders in Cambodia.",
        },
        {
          question: "How do I request a refund?",
          answer:
            "You can request a refund by logging into your account, going to the order history, and selecting the return/refund option.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Refunds are processed within 5-10 business days after the returned product is received and inspected.",
        },
        {
          question: "Do your laptops come with pre-installed software?",
          answer:
            "Yes, most laptops come with Windows or macOS pre-installed. Some may also include Microsoft Office trials or other software bundles.",
        },
        {
          question: "Can I customize a desktop?",
          answer:
            "Yes, we offer custom-built desktops where you can choose the processor, RAM, storage, graphics card, and other components.",
        },
      ],
    };

    return (
      <main className="flex flex-col gap-20 items-center w-full pt-[32px] lg:px-[100px] sm:px-[50px]">
        <FaqHeader />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Open+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <section className="px-5 py-10 mx-auto my-0 max-w-[1440px] max-sm:px-4 max-sm:py-5">
          <header className="mb-4">
            <h2 className="mb-2 text-5xl font-bold text-gray-900 leading-[72px] max-md:text-4xl max-sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="text-lg leading-7 text-gray-500 max-sm:text-base">
              All types of businesses need access to development resources, so
              we give you the option to decide how much you need to use.
            </p>
          </header>

          <hr className="mx-0 my-4 h-px bg-gray-200" />

          <div className="flex gap-10 justify-between pt-4 max-md:flex-col max-md:gap-5">
            <div className="flex-1 max-w-[700px] max-md:max-w-full">
              {faqData.leftColumn.map((item, index) => (
                <QuestionItem
                  key={`left-${index}`}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>

            <div className="flex-1 max-w-[700px] max-md:max-w-full">
              {faqData.rightColumn.map((item, index) => (
                <QuestionItem
                  key={`right-${index}`}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </section>
        <StillHaveQuestions />
      </main>
    );
  };

  function FaqHeader() {
    return (
      <header className="flex flex-col gap-6 items-center px-0 py-12 w-full bg-zinc-300 max-sm:px-0 max-sm:py-8">
        <div className="flex flex-col gap-6 items-center px-6 py-0 w-full max-w-[941px] max-md:px-5 max-md:py-0 max-sm:px-4 max-sm:py-0">
          <div className="flex flex-col gap-7 items-center w-full max-md:gap-5 max-sm:gap-4">
            <div className="flex flex-col gap-1.5 items-center w-full max-w-[565px] max-md:items-center">
              <p className="text-xs font-bold leading-5 text-center text-gray-600">
                FAQs
              </p>
              <h1 className="text-4xl font-bold tracking-tighter leading-10 text-center text-blue-950 max-sm:text-3xl max-sm:leading-9">
                Ask us anything
              </h1>
            </div>
            <p className="w-full text-base leading-6 text-center text-gray-600 max-w-[565px] max-sm:text-sm">
              Have any questions? We're here to assist you.
            </p>
          </div>
          <SearchInput />
        </div>
      </header>
    );
  }

  function SearchInput() {
    return (
      <div className="flex flex-col items-start w-[235px] max-sm:w-full max-sm:max-w-[300px]">
        <div className="flex flex-col gap-1 items-start w-full">
          <div className="flex gap-1.5 items-center px-3 py-2.5 w-full bg-white rounded-md shadow-sm">
            <div>
            <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search here"
              className="flex-1 text-xs leading-5 text-gray-600 bg-transparent border-none outline-none"
              aria-label="Search FAQs"
            />
          </div>
        </div>
      </div>
    );
  }

  function StillHaveQuestions() {
    return (
      <section className="flex justify-between items-center p-6 w-full rounded-xl bg-zinc-300 max-w-[894px] max-md:flex-col max-md:gap-5 max-md:p-5 max-md:text-center max-sm:p-4 max-sm:mx-4 max-sm:my-0 max-sm:w-[calc(100%_-_30px)]">
        <div className="flex flex-col gap-1.5 items-center w-full max-w-[565px] max-md:items-center">
          <h2 className="text-base font-bold text-blue-950">
            Still have questions?
          </h2>
          <p className="text-sm text-gray-600">
            Can't find the answer you're looking for? Please contact to our
            friendly team.
          </p>
        </div>
        <button
          className="px-3.5 py-2 text-xs font-bold leading-5 text-white bg-gray-600 rounded-md shadow-sm cursor-pointer max-sm:w-full"
          aria-label="Get in touch with our team"
        >
          Get in touch
        </button>
      </section>
    );
  }

  return <FAQ />;
}
