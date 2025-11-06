import SafaricomLogo from '../assets/safaricom.png'
import TheStandard from '../assets/TheStandard.png'
import InternationalCorp from '../assets/InternationalCoporative.png'
import UonLogo from '../assets/Uon.png'
import SaccoLogo from '../assets/Sacco-Societies.png'
import familyLogo from '../assets/familybank.png'




const partners = [
  { name: "Safaricom", logo: SafaricomLogo },
  { name: "TheStandard", logo: TheStandard},
  { name: "InternationalCorp", logo: InternationalCorp },
  { name: "UON", logo: UonLogo },
  { name: "SaccoLogo", logo: SaccoLogo },
  {name: "familybank", logo: familyLogo},
  {name: "CooperativeBank", logo: "https://www.chunasacco.co.ke/sites/default/files/partners/coop_0.jpg"}
];

const OurPartners = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
      

        {/* Scrolling wrapper */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee space-x-12">
            {partners.concat(partners).map((partner, index) => (
              <img
                key={index}
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default OurPartners;
