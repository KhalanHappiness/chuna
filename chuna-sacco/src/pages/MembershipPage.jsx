import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Award, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  UserCheck,
  Shield,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';

export default function MembershipPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [counters, setCounters] = useState({ members: 0, assets: 0, dividend: 0, years: 0 });

  // Animated counters for stats
  useEffect(() => {
    const animateCounters = () => {
      const targets = { members: 5000, assets: 2, dividend: 12, years: 15 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          members: Math.floor(targets.members * progress),
          assets: Math.floor(targets.assets * progress * 10) / 10,
          dividend: Math.floor(targets.dividend * progress),
          years: Math.floor(targets.years * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(targets);
        }
      }, stepTime);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
   
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          
       

          {/* Benefits Overview Cards */}
          <section className="grid md:grid-cols-3 gap-6 mt-40">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-8 rounded-xl shadow-lg">
              <DollarSign className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Competitive Rates</h3>
              <p className="text-emerald-100 mb-4">Enjoy up to 12% dividend on shares and low interest rates on loans</p>
              <div className="text-2xl font-bold">12%</div>
              <div className="text-sm text-emerald-100">Annual Dividend</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexible Loans</h3>
              <p className="text-blue-100 mb-4">Access loans up to 4x your savings with flexible repayment terms</p>
              <div className="text-2xl font-bold">4X</div>
              <div className="text-sm text-blue-100">Loan Multiplier</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-8 rounded-xl shadow-lg">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-purple-100 mb-4">Join a supportive community of over 5,000 active members</p>
              <div className="text-2xl font-bold">5K+</div>
              <div className="text-sm text-purple-100">Members</div>
            </div>
          </section>
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-full max-w-md mx-auto h-48 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-white">
                  <Building2 className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Your Financial Future</p>
                  <p className="text-sm opacity-90">Starts Here</p>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Who Can Join Chuna SACCO?</h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg text-center max-w-3xl mx-auto">
                <strong>At Chuna SACCO, we believe in inclusivity and welcome individuals from diverse 
                backgrounds to become part of our thriving financial community.</strong> Our membership is open to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500">
                  <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    Individual Members
                  </h3>
                  <p className="text-emerald-700">
                    Whether you're a salaried employee, self-employed professional, or student, 
                    you are welcome to join Chuna SACCO. We value financial discipline and 
                    commitment to our shared goals.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Partner Organization Employees
                  </h3>
                  <p className="text-blue-700">
                    Employees of organizations partnered with Chuna SACCO enjoy special 
                    membership benefits, preferential rates, and potential employer 
                    contributions to savings.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Community Members
                  </h3>
                  <p className="text-purple-700">
                    We extend membership to residents of communities where Chuna SACCO 
                    operates, fostering local economic development and shared prosperity.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Family Members
                  </h3>
                  <p className="text-orange-700">
                    Family members of existing Chuna SACCO members are eligible to join, 
                    promoting family financial planning and building generational wealth.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg text-lg">
                START YOUR MEMBERSHIP JOURNEY
              </button>
            </div>
          </section>

          {/* How To Join Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How To Join</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Joining Chuna SACCO is a straightforward process designed to get you started 
                  on your financial journey quickly and efficiently.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Follow these simple steps to become a member:
                </p>
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Simple Application Process</p>
                  <p className="text-sm opacity-90">Quick & Easy</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-l-4 border-emerald-500">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Submit Your Application</h3>
                  <p className="text-gray-600">
                    Complete our membership application form and submit it along with 
                    the required documents as specified in the application.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Application Review & Approval</h3>
                  <p className="text-gray-600">
                    Our team will verify your application and documents within 7 business days. 
                    We'll contact you if any additional information is needed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Welcome to Chuna SACCO!</h3>
                  <p className="text-gray-600">
                    Once approved, you'll receive your membership confirmation and can 
                    immediately start accessing all our financial services and member benefits.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg flex items-center mx-auto text-lg">
                APPLY FOR MEMBERSHIP
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </section>

          {/* After Joining Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="w-full h-64 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="text-center text-white z-10">
                  <Award className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Welcome</h3>
                  <h3 className="text-xl">to Your</h3>
                  <h3 className="text-2xl font-bold">Financial Future</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-30"></div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">After Joining</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Congratulations on becoming a Chuna SACCO member! You are now part of 
                  a supportive financial community focused on your prosperity and 
                  social development opportunities.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Access to Financial Products</h3>
                      <p className="text-gray-600">
                        Start utilizing our comprehensive range of financial services including 
                        savings accounts, competitive loans, and investment opportunities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Exclusive Member Benefits</h3>
                      <p className="text-gray-600">
                        Enjoy competitive interest rates, participate in member events, 
                        access professional development opportunities, and benefit from our 
                        loyalty programs based on your financial track record.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Community Connection</h3>
                      <p className="text-gray-600">
                        Connect with fellow members, participate in financial literacy programs, 
                        and contribute to community development initiatives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg text-lg">
                EXPLORE MEMBER BENEFITS
              </button>
            </div>
          </section>

          {/* Member Obligations Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="w-full h-64 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                <div className="text-center text-white z-10">
                  <Shield className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Member</h3>
                  <h3 className="text-xl font-bold">Responsibilities</h3>
                  <p className="text-sm mt-2 opacity-90">Building Together</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Member Obligations</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a Chuna SACCO member, you play an important role in our collective success. 
                  Here are the key responsibilities that ensure our SACCO thrives and serves 
                  all members effectively.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Financial Commitment</h3>
                      <p className="text-gray-600">
                        Maintain regular savings contributions and honor loan repayment schedules. 
                        Your financial discipline strengthens our entire community.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Compliance with Policies</h3>
                      <p className="text-gray-600">
                        Understand and follow all SACCO policies, bylaws, and regulations. 
                        This ensures fair treatment for all members and smooth operations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Account Maintenance</h3>
                      <p className="text-gray-600">
                        Keep your account information current and maintain good standing. 
                        Regular account activity helps us serve you better and maintain 
                        our community standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Community Participation</h3>
                      <p className="text-gray-600">
                        Participate in member meetings, vote on important matters, and contribute 
                        to the growth and development of our SACCO community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg text-lg">
                VIEW MEMBER HANDBOOK
              </button>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 bg-emerald-50 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What is the minimum amount to join?</h3>
                <p className="text-gray-700">The minimum share capital is KES 5,000, and monthly contributions start from KES 1,000.</p>
              </div>
              
              <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">How quickly can I access a loan?</h3>
                <p className="text-gray-700">Once you've been a member for 6 months, you can access loans up to 4 times your savings within 48 hours.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What documents do I need to join?</h3>
                <p className="text-gray-700">You need a copy of your ID, passport photo, payslip or proof of income, and completed membership form.</p>
              </div>
              
              <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Are there any monthly fees?</h3>
                <p className="text-gray-700">There's a small monthly service fee of KES 200 to cover operational costs and member services.</p>
              </div>
            </div>
          </section>

         
          <section className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl shadow-lg p-8 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Chuna SACCO?</h2>
              <p className="text-xl mb-8 text-emerald-100">
                Take the first step towards financial freedom and community empowerment. 
                Join thousands of members who trust Chuna SACCO with their financial future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg text-lg">
                  START APPLICATION
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors text-lg">
                  LEARN MORE
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}