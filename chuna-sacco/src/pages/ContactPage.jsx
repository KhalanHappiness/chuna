import React from 'react';
import { Mail, Shield, MessageCircle, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 mt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            WE ARE HERE TO EASE THE FINANCIAL OBSTACLES!
          </h1>
          <p className="text-lg text-gray-600">
            The choice is in your hands: Get in touch with us today.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Options */}
          <div className="flex flex-col space-y-6">
            {/* Send Email Card */}
            <div className="bg-white rounded-lg shadow-sm p-8 w-full">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    SEND US AN EMAIL
                  </h3>
                  <p className="text-gray-600 mb-2">
                    For credit queries:{' '}
                    <a
                      href="mailto:loans.chuna@uonbi.ac.ke"
                      className="text-green-600 hover:underline font-medium"
                    >
                      loans.chuna@uonbi.ac.ke
                    </a>
                  </p>
                  <p className="text-gray-600">
                    For General Queries please use{' '}
                    <a
                      href="mailto:chunasacco@uonbi.ac.ke"
                      className="text-emerald-600 hover:underline font-medium"
                    >
                      chunasacco@uonbi.ac.ke
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Membership Card */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    DO YOU WANT TO BE A MEMBER
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Apply and be a member in few seconds. Click
                  </p>
                  <a
                    href="http://applications.chunasacco.co.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
                  >
                    applications.chunasacco.co.ke
                  </a>
                </div>
              </div>
            </div>

            {/* Communication Card */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    OPTIMIZED COMMUNICATION
                  </h3>
                  <p className="text-gray-600 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    Give us a call:{' '}
                    <a href="tel:0705951672" className="text-green-600 hover:underline font-medium">
                      0705 951 672
                    </a>{' '}
                    or{' '}
                    <a href="tel:0794875028" className="text-green-600 hover:underline font-medium">
                      0794 87 50 28
                    </a>
                  </p>
                  <p className="text-gray-600">
                    or simply write to us from your email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map & Location */}
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-1">VISIT OUR OFFICES</h2>
                <p className="text-gray-300">It's easy. Write to us.</p>
              </div>
              
              {/* Map Container */}
              <div className="relative h-96 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449917766!2d36.8165!3d-1.2795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNDYuMiJTIDM2wrA0OCc1OS40IkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Address Info */}
              <div className="p-6 border-t">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600 leading-relaxed">
                      University of Nairobi<br />
                      Kijabe Street, Nairobi<br />
                      Near Central Police Station
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}