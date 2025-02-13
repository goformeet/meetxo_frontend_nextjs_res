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
