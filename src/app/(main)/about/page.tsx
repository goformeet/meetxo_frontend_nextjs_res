
export const metadata = {
  title: "About MeetXO – Connect, Learn & Grow",
  description:
    "Learn how MeetXO helps experts and users connect for 1:1 sessions, knowledge sharing, and growth - Meetxo.ai",
    keywords: "about MeetXO, what is MeetXO, MeetXO platform, expert marketplace, connect with experts online, find professionals online, virtual expert consultations, online learning platform, professional networking site, MeetXO services, how MeetXO works, MeetXO business model, why choose MeetXO, online mentorship platform, trusted expert network",
  metadataBase: new URL("https://meetxo.ai"),
  openGraph: {
  title: "About MeetXO – Connect, Learn & Grow",
    description:
    "Learn how MeetXO helps experts and users connect for 1:1 sessions, knowledge sharing, and growth - Meetxo.ai",
    url: "https://meetxo.ai",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "MeetXO Logo",
      },
    ],
  },

};



export default function AboutPage() {
    return (
        <div className="px-6 py-16 max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">About MeetXO</h1>
                <p className="text-lg max-w-5xl mx-auto text-gray-600 mb-2">
                    Access the Right People - Anytime, Anywhere.
                    We&apos;ve all had those moments when we needed expert advice—whether it&apos;s career guidance, business strategies, or specialized skills—but didn&apos;t know where to turn. That&apos;s where MeetXO comes in.
                    MeetXO makes it easy to book world-class experts for one-on-one video consultations, live sessions, and workshops. No gatekeepers, no waitlists—just instant access to the knowledge you need.

                </p>
            </div>

            {/* How It Started */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">How It All Started</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    &quot;What if you could get direct access to the right expert, at the right time—without months of networking or endless Google searches?&quot;
                </p>
                <p className="text-gray-600 mt-3">
                    One conversation can change everything. Our founder experienced this firsthand when a chance meeting with an industry leader shifted their entire perspective on entrepreneurship. That interaction planted the seed for MeetXO: a platform designed to make expert access effortless, empowering people to learn, grow, and succeed.
                </p>
            </div>

            {/* Belief Section */}
            <div className="bg-gray-100 rounded-xl p-10 text-center">
                <h2 className="text-3xl font-semibold mb-4">What We Believe</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    MeetXO isn&apos;t just a platform—it&apos;s a movement. A movement to break down barriers, unlock opportunities, and make expertise available to everyone, no matter whereever they are.
                </p>
            </div>

            {/* Why MeetXO Section */}
            <div className="mt-12 text-center">
                <h2 className="text-3xl font-semibold mb-6">Why MeetXO?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        "All the experts, One platform. Whether you’re looking for business advice, career coaching, or creative mentorship, MeetXO connects you with top professionals worldwide.",
                        "Seamless booking & payments. No back-and-forth emails. Just find your expert, book your session, and get insights, fast.",
                        "A new way to learn. Get personalized, actionable advice in real time, instead of wasting hours on generic content.",
                        "Your expertise, your business. If you're an expert, MeetXO helps you monetize your knowledge and build your brand with ease.",
                        "Host real-time webinars, workshops, and group coaching sessions, enabling you to connect and interact with your audience while sharing your expertise.",
                        "Your greatest asset is your network—each meeting is a step toward new opportunities, insights, and lasting impact."
                    ].map((item, index) => (
                        <div key={index} className="bg-white shadow-md p-6 rounded-lg">
                            <p className="text-gray-800 font-medium">{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-semibold mb-4">The Future of Expert Access</h2>
                <p className="text-lg max-w-3xl mx-auto text-gray-600 mb-6">
                    The world&apos;s top experts shouldn&apos;t be out of reach. MeetXO, is here to change that. Whether it’s a quick career tip, a deep-dive strategy session, or hands-on mentorship, we’re making it possible for anyone to learn from the best.

                </p>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                    Because sometimes, the right conversation at the right time can change everything.
                </p>
                <p>Join MeetXO—where every conversation opens a new door.</p>
            </div>
        </div>
    );
}
