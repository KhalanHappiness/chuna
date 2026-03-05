import { useState } from "react";

const faqs = [
  {
    category: "About Chuna Sacco",
    icon: "🏦",
    color: "from-emerald-500 to-teal-600",
    questions: [
      {
        q: "What is Chuna Sacco?",
        a: "Chuna Sacco Society Limited is a savings and credit cooperative (SACCO) that was established in 1976. Originally founded to serve University of Nairobi employees, it has grown into one of Kenya's most inclusive SACCOs — now open to all Kenyan citizens regardless of where they live or work!"
      },
      {
        q: "Is Chuna Sacco regulated?",
        a: "Yes! Chuna Sacco is regulated by the Sacco Societies Regulatory Authority (SASRA), which sets minimum standards to ensure your money is safe and well-managed. You can bank with us with full confidence."
      },
      {
        q: "What services does Chuna Sacco offer?",
        a: "We offer a full range of financial services through two main channels: BOSA (Back Office Service Activities) for savings and credit products, and FOSA (Front Office Service Activities) for everyday banking needs like deposits, withdrawals, and transfers."
      },
      {
        q: "Where is Chuna Sacco located?",
        a: "Our headquarters is at Harry Thuku Road, University of Nairobi. But you don't always have to visit us in person — you can access many of our services online, via M-Chuna app, or by dialing *670# from your phone!"
      }
    ]
  },
  {
    category: "Membership",
    icon: "👋",
    color: "from-blue-500 to-indigo-600",
    questions: [
      {
        q: "Who can join Chuna Sacco?",
        a: "Great news — Chuna Sacco is open to all members of the public! Whether you're a student, a professional, a business owner, or retired, you can become a member and start enjoying our financial services. We welcome everyone with open arms!"
      },
      {
        q: "How do I join Chuna Sacco?",
        a: "Joining is easy and quick! You can apply online at applications.chunasacco.co.ke or visit our office in person. You'll need a copy of your National ID or valid passport, a recent passport-size photo, membership fee of Ksh. 500, KRA pin and proof of income (if employed). Once your application is approved, you'll receive your membership number — online applicants get theirs within about 5 minutes!"
      },
      {
        q: "How much does it cost to join?",
        a: "There's a one-time membership fee of Ksh 500."
      },
     
      {
        q: "Can I cancel my membership?",
        a: "Yes, you can cease your membership if you ever need to. The process involves notifying the SACCO of your intention, settling any outstanding loans or fees, and closing your account. We're always happy to chat with you first to see if there's anything we can do to help!"
      }
    ]
  },
  {
    category: "Savings & Deposits",
    icon: "💰",
    color: "from-amber-500 to-orange-500",
    questions: [
      {
        q: "What types of savings accounts are available?",
        a: "We offer a variety of savings accounts designed to fit your goals, including a Holiday Savings Account, Fixed Deposit Account, Junior Account and an Education Savings Account (ideal for saving up school fees). Each account has its own features and benefits, so you can choose the one that best suits your needs!"
      },
      {
        q: "How do I deposit money into my account?",
        a: "You have several convenient options! You can deposit via M-Pesa using our Paybill number 561999, or visit our office to make a cash deposit. Our mobile banking platform (*670#) also lets you manage your account on the go."
      },
      {
        q: "What interest rate do I earn on my savings?",
        a: "Your savings earn a minimum interest rate of 10% annually — that's highly competitive! The exact rate may vary depending on the account type and prevailing conditions."
      },
      {
        q: "How many times can I withdraw from my savings account?",
        a: "FOSA savings accounts allow up to three withdrawals per year. This encourages healthy saving habits while still giving you access to your funds when you truly need them."
      },
      {
        q: "How do I use M-Pesa to deposit or pay loans?",
        a: "It's simple! Open M-Pesa on your Safaricom app or SIM toolkit, select 'Lipa na M-Pesa', then 'Pay Bill', enter our Paybill number 561999, enter your Chuna membership number as the account number, enter the amount, confirm your PIN, and send. You'll receive a confirmation message from both Safaricom and Chuna Sacco. Easy!"
      }
    ]
  },
  {
    category: "Loans & Borrowing",
    icon: "📋",
    color: "from-purple-500 to-violet-600",
    questions: [
      {
        q: "What loan products does Chuna Sacco offer?",
        a: "We have a great range of loan products to suit different needs! These include Normal Loans, Premium Loans, Jijenge Loans, Emergency Loans (Karibu), M-Chuna mobile loans, and more. Each product is designed with your specific financial situation in mind."
      },
      {
        q: "What is M-Chuna and how does it work?",
        a: "M-Chuna is our revolutionary mobile banking loan product! It lets you borrow up to Ksh 50,000 directly from your phone, anytime and anywhere. No guarantors needed, and approval is instant. Just dial *670# or use our mobile banking app, follow the prompts, and the funds land right in your pocket. Perfect for emergencies or urgent needs!"
      },
      {
        q: "Do I need guarantors to get a loan?",
        a: "It depends on the loan type. For M-Chuna mobile loans, no guarantors are required at all! For larger BOSA loans, guarantors may be needed. You can also download a Loan Guarantee Form from our website if required."
      },
      {
        q: "Can I use a Chuna Sacco loan to clear debts from other banks?",
        a: "Yes you can! We offer external loan clearance facilities to help you clear debts from banks or other lenders. There's a 10% clearance fee for this service. It's a great way to consolidate your debts and enjoy our more affordable repayment terms."
      },
      {
        q: "What is loan restructuring?",
        a: "If you're having difficulty repaying your loan, we can work with you to restructure it — adjusting the repayment schedule to something more manageable. Just download the Loan Restructuring Form from our website or come speak to us. We're here to help!"
      },
      {
        q: "How quickly are loans approved?",
        a: "Most loans are processed very quickly. M-Chuna loans get instant approval via your phone. For other loan products, turnaround is typically within 24 hours — making us one of the fastest SACCOs in Kenya!"
      }
    ]
  },
  {
    category: "Mobile Banking & Digital Services",
    icon: "📱",
    color: "from-cyan-500 to-sky-600",
    questions: [
      {
        q: "How do I access Chuna Sacco mobile banking?",
        a: "Just dial *670# from your phone! Our USSD platform lets you check balances, make deposits, withdraw cash, pay loans, transfer funds, and access M-Chuna loans — all without needing a smartphone or internet connection."
      },
      {
        q: "What can I do on the mobile banking platform?",
        a: "Quite a lot! You can check your account balance, make cash withdrawals, deposit money, pay your loan, access M-Chuna credit, and transfer funds between accounts. It's your full Chuna Sacco branch in your pocket."
      },
      {
        q: "Does Chuna Sacco have ATM services?",
        a: "Yes! We collaborate with Co-operative Bank to offer ATM and mobile banking services, giving you even more ways to access your money conveniently."
      }
    ]
  },
  {
    category: "Dividends & Returns",
    icon: "📈",
    color: "from-rose-500 to-pink-600",
    questions: [
      {
        q: "Do members earn dividends?",
        a: "Yes! As a Chuna Sacco member, you're entitled to competitive dividends on your deposits and shares. Dividends are declared at the Annual Delegate Meeting (ADM) based on the SACCO's performance for the year."
      },
      {
        q: "How do I increase my share capital?",
        a: "You can contribute additional share capital by paying cash at our office, or by setting up a monthly salary deduction (starting from as low as Ksh 500/month). More shares mean greater returns and higher loan limits — it's a win-win!"
      }
    ]
  },
  {
    category: "Security & Support",
    icon: "🔒",
    color: "from-slate-600 to-gray-700",
    questions: [
      {
        q: "Is my data safe with Chuna Sacco?",
        a: "Absolutely! We comply with Kenya's Data Protection Act to ensure your personal information is kept secure and private. We take your data privacy very seriously."
      },
      {
        q: "What should I do if I notice suspicious activity on my account?",
        a: "Please report it to us immediately! Never share your PIN or account details with anyone. If you notice anything suspicious, contact us right away at chunasacco@uonbi.ac.ke or visit our offices. The sooner you report, the faster we can help."
      },
      {
        q: "How do I contact Chuna Sacco?",
        a: "You can reach us by email at chunasacco@uonbi.ac.ke, visit us at Harry Thuku Road (University of Nairobi), dial *670# for mobile banking, or use M-Pesa Paybill 561999 for deposits and loan payments. Our team is always happy to assist!"
      },
      {
        q: "Where can I download official Chuna Sacco forms?",
        a: "All official forms are available for download on our website at chunasacco.co.ke/downloads. Forms include the Membership Application Form, Loan Application Form, Emergency Loan Form, Education Account Opening Form, Holiday Savings Application Form, and many more."
      }
    ]
  }
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${open ? "shadow-md" : "shadow-sm hover:shadow-md"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-800 text-base leading-snug">{question}</span>
        <span className={`text-2xl text-emerald-500 transition-transform duration-300 flex-shrink-0 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1 bg-gray-50 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}

function CategorySection({ category, icon, color, questions }) {
  const [activeFilter, setActiveFilter] = useState(null);
  return (
    <div className="mb-10">
      <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${color} text-white px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-sm`}>
        <span>{icon}</span>
        <span>{category}</span>
      </div>
      <div className="flex flex-col gap-3">
        {questions.map((item, i) => (
          <FAQItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </div>
  );
}

export default function ChunaSaccoFAQ() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...faqs.map(f => f.category)];

  const filtered = faqs
    .filter(section => activeCategory === "All" || section.category === activeCategory)
    .map(section => ({
      ...section,
      questions: section.questions.filter(
        item =>
          search === "" ||
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter(section => section.questions.length > 0);

  const totalResults = filtered.reduce((acc, s) => acc + s.questions.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 font-sans">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white pt-16 pb-24 px-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/4"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-5xl mb-4">🌿</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">Chuna Sacco FAQ</h1>
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            Got questions? We've got answers! Browse everything you need to know about saving, borrowing, and growing with us.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl text-gray-800 text-base shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 pb-20">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-center text-sm text-gray-500 mb-6">
            Found <span className="font-bold text-emerald-600">{totalResults}</span> result{totalResults !== 1 ? "s" : ""} for "<em>{search}</em>"
          </p>
        )}

        {/* FAQ sections */}
        {filtered.length > 0 ? (
          filtered.map((section, i) => (
            <CategorySection key={i} {...section} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🤔</div>
            <p className="text-xl font-semibold text-gray-500">No results found</p>
            <p className="text-sm mt-2">Try a different search term or browse all categories.</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-center text-white shadow-lg">
          <div className="text-4xl mb-3">💬</div>
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-emerald-100 mb-6 text-sm max-w-md mx-auto">
            Our team is always ready to help. Reach out to us and we'll get back to you as soon as possible!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:chunasacco@uonbi.ac.ke" className="bg-white text-emerald-700 font-bold px-5 py-3 rounded-xl text-sm hover:bg-emerald-50 transition-colors shadow">
              ✉️ Email Us
            </a>
            <a href="https://www.chunasacco.co.ke" target="_blank" rel="noreferrer" className="bg-emerald-800 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-emerald-900 transition-colors shadow">
              🌐 Visit Website
            </a>
            <a href="tel:*670#" className="bg-white text-emerald-700 font-bold px-5 py-3 rounded-xl text-sm hover:bg-emerald-50 transition-colors shadow">
              📞 Dial *670#
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}