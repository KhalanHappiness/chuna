import { Star, ChevronLeft, ChevronRight, Quote, Calculator, Play, Users, TrendingUp, DollarSign, Calendar, Percent, ExternalLink, Youtube, ArrowRight, Verified } from "lucide-react";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import youtubeimg from "../assets/youtubeimg.png";
import betty from "../assets/betty2.png";
import erick from "../assets/erick.png";
import dennis from "../assets/dennis.png";
import faith from "../assets/faith.jpg";
import harriet from "../assets/harriet2_0.png";
import lenah from "../assets/lenah.jpg";

const testimonials = [
  {
    id: 1,
    name: "David Warui",
    role: "Business Owner",
    content: "I always dreamed of owning my own taxi business but never had the capital to start. Chuna Sacco made it possible. The application process was straightforward and the staff walked me through every step with patience and professionalism. With my first loan, I purchased my first vehicle, and within a year I had paid it off and taken a second loan for another car. The low interest rates and flexible repayment schedule meant I could reinvest my earnings back into the business without feeling overwhelmed. Today I run a fleet of three taxis and employ two drivers, providing income for their families as well as my own. I also used my savings dividends to build a small home for my family in Nakuru. This SACCO didn't just give me a loan — they gave me a future, a home, and the confidence to keep dreaming bigger.",
    rating: 5,
    photo: betty,
    memberSince: "2018"
  },
  {
    id: 2,
    name: "Everlyne Kajuju",
    role: "Member",
    content: "Retiring comfortably was something I thought was only possible for the wealthy. Chuna Sacco changed that belief entirely. After years of consistent saving and faithful contributions, I was able to access a substantial loan that I used to purchase land and begin construction of my retirement home in the village. The staff guided me through the entire process, from loan application to disbursement, with transparency and genuine care. The repayment terms were structured in a way that never strained my monthly budget. Today, my home is complete, my family has a place to gather, and I sleep peacefully knowing my future is secure. Chuna Sacco didn't just help me build a house — they helped me build a legacy for my children and grandchildren to be proud of.",
    rating: 5,
    photo: dennis,
    memberSince: "2019"
  },
  {
    id: 3,
    name: "Matthew Owiti",
    content: "Winning a school construction tender was a milestone I had worked toward for years, but securing the upfront capital to execute the project was always the biggest obstacle. Chuna Sacco stepped in when I needed them most. The loan process was fast, transparent, and the repayment terms were structured around my project timelines, which made all the difference. With the funds disbursed on time, I was able to purchase materials, pay my crew, and deliver the project within the agreed deadline. That first tender opened doors to more contracts, and I have since completed three school construction projects across the county. My business has grown from a one-man operation to a team of fifteen skilled workers. Chuna Sacco believed in my vision before anyone else did, and for that I will always be grateful.",
    rating: 4,
    photo: lenah,
    memberSince: "2017"
  },
  {
    id: 4,
    name: "Charles makena",
    role: "Entrepreneur",
    content: "Starting a business from scratch with no external funding felt impossible until I discovered Chuna Sacco. I had the idea, the skills, and the drive, but what I lacked was capital. The moment I walked into their offices, I was met with professionalism and genuine interest in my goals. They helped me structure a loan that matched my business plan and repayment capacity. With the funds, I stocked my shop, paid the first months of rent, and covered all my startup costs without borrowing from family or friends. Within six months my business was profitable and I had already begun saving more aggressively through the SACCO. Today my shop is fully established, I have hired two employees, and I am already planning to open a second branch. Chuna Sacco gave me the foundation I needed to turn my dream into a real, thriving business.",
    rating: 5,
    photo: faith,
    memberSince: "2020"
   }
];

const StarRating = ({ rating, size = "w-4 h-4" }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} transition-all duration-300 ${
            i < rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};




const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [period, setPeriod] = useState('');
  const [interestRate, setInterestRate] = useState('');

  const monthlyPayment = loanAmount && period && interestRate
    ? (loanAmount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, period)) /
      (Math.pow(1 + interestRate / 100 / 12, period) - 1)
    : 0;
  const totalRepayment = monthlyPayment > 0 ? Math.round(monthlyPayment * period) : 0;


  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
     {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Loan Calculator</h3>
          <p className="text-gray-600 text-sm">Plan your finances with ease</p>
        </div>
      </div>

      {/* Calculator Form */}
      <div className="space-y-5 flex-1">

        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Loan Amount (KSh)
          </label>
          <input
            type="number"
            min="10000"
            max="8000000"
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 500,000"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Min: KSh 10,000</span>
            <span>Max: KSh 8,000,000</span>
          </div>
          {loanAmount > 0 && (
            <div className="mt-2 text-lg font-bold text-green-600">
              KSh {Number(loanAmount).toLocaleString()}
            </div>
          )}
        </div>

        {/* Loan Period */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Loan Period (Months)
          </label>
          <input
            type="number"
            min="1"
            max="84"
            step="1"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 12"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Min: 1 month</span>
            <span>Max: 84 months</span>
          </div>
          {period > 0 && (
            <div className="mt-2 text-lg font-bold text-blue-600">
              {period} months
            </div>
          )}
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            step="0.5"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 12"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Min: 1%</span>
            <span>Max: 100%</span>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-gray-700">Monthly Payment</span>
              </div>
              <div className="text-lg font-bold text-green-600">
                {monthlyPayment > 0 ? `KSh ${Math.round(monthlyPayment).toLocaleString()}` : '—'}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Percent className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-gray-700">Interest Rate</span>
              </div>
              <div className="text-lg font-bold text-emerald-600">
                {interestRate ? `${interestRate}% p.a.` : '—'}
              </div>
            </div>
            <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">Total Repayment</span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {totalRepayment > 0 ? `KSh ${totalRepayment.toLocaleString()}` : '—'}
            </div>
          </div>
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 transform shadow-lg text-sm">
            Apply for Loan
          </button>
        </div>
      </div>
    </div>
  );
}




const YouTubeVideoCard = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* Modal rendered outside the card via portal-like pattern */}
      {videoOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[9999]"
          onClick={() => setVideoOpen(false)} // click backdrop to close
        >
          <div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden w-[90%] max-w-5xl relative"
            onClick={e => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 bg-black text-white w-8 h-8 rounded-full text-lg font-bold z-10 hover:bg-gray-800 flex items-center justify-center"
            >
              ✕
            </button>

            {/* YouTube iframe */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/K9jOswGlNoA?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full group flex flex-col">
        {/* Video Thumbnail */}
        <div className="relative h-50 overflow-hidden">
          <img
            src={youtubeimg}
            alt="Chuna Sacco Success Stories"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setVideoOpen(true)}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-700 transition-colors duration-300 hover:scale-110 transform cursor-pointer"
            >
              <Play className="w-6 h-6 text-white ml-0.5" />
            </button>
          </div>

          {/* YouTube Badge */}
          <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Youtube className="w-3 h-3" />
            <span>YouTube</span>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            0:52
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Success Stories</h3>
              <p className="text-gray-600 text-sm">Watch real member journeys</p>
            </div>
          </div>

          <p className="text-gray-600 mb-5 leading-relaxed text-sm flex-1">
            Discover how Chuna Sacco has transformed lives through our member success stories. From small business loans to homeownership dreams - watch real testimonials from our community.
          </p>

          {/* CTA Button — now opens modal instead of new tab */}
          <button
            onClick={() => setVideoOpen(true)}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 transform shadow-lg flex items-center justify-center gap-2 group text-sm"
          >
            <Youtube className="w-4 h-4" />
            Watch Stories
            <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </>
  );
};

const TestimonialsScroller = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-xl text-white overflow-hidden h-full relative flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <Quote className="absolute top-4 left-4 w-12 h-12" />
        <Quote className="absolute bottom-4 right-4 w-10 h-10 rotate-180" />
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Member Stories</h3>
            <p className="text-green-100 text-sm">Real experiences, real impact</p>
          </div> 
        </div>

        {/* Testimonial Content */}
        <div className="flex-1 flex flex-col">
          {/* Member Photo and Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              {/* <img
                src={currentTestimonial.photo}
                alt={currentTestimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              /> */}
              {/* <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <Verified className="w-2.5 h-2.5 text-white" />
              </div> */}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{currentTestimonial.name}</h4>
              <p className="text-green-200 text-sm">{currentTestimonial.role}</p>
              {currentTestimonial.business && (
                <p className="text-green-100 text-xs">{currentTestimonial.business}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={currentTestimonial.rating} size="w-4 h-4" />
          </div>

          {/* Testimonial Text */}
          <blockquote className="flex-1 mb-4 min-h-[120px]">
            <p className="text-sm leading-relaxed text-white/95 line-clamp-none">
              "{currentTestimonial.content}"
            </p>
          </blockquote>

          {/* Member Since Badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
              <Calendar className="w-3 h-3" />
              Member since {currentTestimonial.memberSince}
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-6 h-2 bg-white"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemberTestimonials = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    //In a real app, you would initialize AOS here:
    AOS.init({
      duration: 500,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
      delay: 100,
    });
    
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 py-20 px-5 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-200/15 to-emerald-200/15 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000"
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div 
              data-aos="zoom-in" 
              data-aos-delay="200"
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div 
              data-aos="fade-left" 
              data-aos-delay="400"
              className="h-1 w-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
            ></div>
          </div>
          
          <h2 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="text-3xl lg:text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent"
          >
            Member Success Hub
          </h2>
          <p 
            data-aos="fade-up" 
            data-aos-delay="400"
            className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Calculate your loan, watch inspiring stories, and read testimonials from our thriving community
          </p>
        </div>

        {/* Three Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Testimonials Scroller Card */}
          <div 
            data-aos="flip-left"
            data-aos-delay="200"
            data-aos-duration="800"
            className="min-h-[500px] transform hover:scale-105 transition-all duration-300"
          >
            <TestimonialsScroller />
          </div>

          {/* YouTube Video Card */}
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="800"
            className="min-h-[500px] transform hover:scale-105 transition-all duration-300"
          >
            <YouTubeVideoCard />
          </div>

          {/* Loan Calculator Card */}
          <div 
            data-aos="flip-right"
            data-aos-delay="600"
            data-aos-duration="800"
            className="min-h-[500px] transform hover:scale-105 transition-all duration-300"
          >
            <LoanCalculator />
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="1000"
          className="text-center"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl">
            <h3 
              data-aos="fade-up" 
              data-aos-delay="900"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Ready to Start Your Success Story?
            </h3>
            <p 
              data-aos="fade-up" 
              data-aos-delay="1000"
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of satisfied members who have achieved their financial goals with Chuna Sacco
            </p>
            <div 
              data-aos="zoom-in" 
              data-aos-delay="1100"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://applications.chunasacco.co.ke/index.php?r=new-membership"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 transform shadow-lg flex items-center justify-center gap-2"
              >
                Become a Member
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+254-XX-XXXXXXX"
                className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 transform shadow-lg border border-gray-200"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberTestimonials;