"use client"
import React, { useState } from "react";
import "./index.css"
import { faqData } from "@/constants";


interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  users: FaqItem[];
  hosts: FaqItem[];
}



// export const metadata = {
//   title: "MeetXO FAQs – How MeetXO Works?",
//   description:
//     "Find answers about MeetXO, expert bookings, payments, and more in our detailed FAQ section - Meetxo.ai",
//     keywords: "MeetXO FAQ, frequently asked questions MeetXO, how to use MeetXO, MeetXO expert signup, MeetXO user guide, MeetXO pricing details, MeetXO consultation process, MeetXO refund queries, MeetXO payment options, how MeetXO works for experts, MeetXO customer support, setting up a MeetXO profile, MeetXO verification process, troubleshooting MeetXO issues, MeetXO account management",
//   metadataBase: new URL("https://meetxo.ai"),
//   openGraph: {
//   title: "MeetXO FAQs – How MeetXO Works?",
//     description:
//     "Find answers about MeetXO, expert bookings, payments, and more in our detailed FAQ section - Meetxo.ai",
//     url: "https://meetxo.ai",
//     images: [
//       {
//         url: "/og_image.png",
//         width: 1200,
//         height: 630,
//         alt: "MeetXO Logo",
//       },
//     ],
//   },

// };

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof FaqData>("users");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const questions = faqData[selectedCategory];

  return (
    <div className="py-20 px-4 md:px-7 lg:px-10">
      <h1 className="headingFaq">
        Frequently <span className="headingFaq1">Asked Questions</span>
      </h1>
      <p className="paraFaq">
        MeetXO makes scheduling meetings effortless, fitting your comfort and time frame. Even if you&apos;re swamped,
        MeetXO&apos;s got your back!
      </p>
      <div className="chooses">
        <button
          onClick={() => setSelectedCategory("users")}
          className={`Faqoption ${selectedCategory === "users" ? "active" : ""}`}
        >
          User
        </button>
        <button
          onClick={() => setSelectedCategory("hosts")}
          className={`Faqoption ${selectedCategory === "hosts" ? "active" : ""}`}
        >
          Expert
        </button>
      </div>
      <div className="faqList mx-auto">
        {questions.length > 0 ? (
          questions.map((item, index) => (
            <div key={index} className="faqItem">
              <div
                className="question"
                onClick={() => toggleAnswer(index)}
                role="button"
                tabIndex={0}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h2 className="questionfront">{`${index + 1}. ${item.question}`}</h2>
                <span
                  className="icon"
                  style={{ transform: expandedIndex === index ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  {expandedIndex === index ? "▲" : "▼"}
                </span>
              </div>
              <div
                id={`faq-answer-${index}`}
                className={`answer ${expandedIndex === index ? "show" : ""}`}
                role="region"
                aria-hidden={expandedIndex !== index}
              >
                <hr className="line23" />
                <p>{item.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No FAQs available for the selected category.</p>
        )}
      </div>
    </div>
  );
};

export default Faq;
