import React from "react";
import { SubHeader } from "../components";
import { AppMockups, AppQR, Header_1 } from "../assets";

const TeaWedha: React.FC = () => {
  const title = "TeaWedha Smart Health & Pest Control";
  const description =
    " AI powered image and audio analysis for disease and termite detection in tea plantation without expert knowledge.";
  return (
    <>
      <SubHeader image={Header_1} title={title} description={description} />
      <div className="min-h-screen bg-white">
        {/* What is TeaWedha Section */}
        <section
          id="about"
          className="py-16 px-4 md:px-8 border border-gray-200 bg-gray-50"
        >
          <div className="wrapper">
            <h2 className="text-3xl font-bold text-center mb-12">
              What is TeaWedha?
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Advanced disease detection using AI technology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Precise termite detection via sound analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>User-friendly mobile application interface</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>No expert knowledge required for operation</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <img
                  src={AppMockups}
                  alt="App Mockup"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* IoT Device Section */}
        <section
          id="iot-device"
          className="py-16 px-4 md:px-8 border border-gray-200"
        >
          <div className="wrapper">
            <h2 className="text-3xl font-bold text-center mb-12">IoT Device</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Advanced sensors for precise monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Real-time analysis and data processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Seamless connectivity with mobile app</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Power-efficient design for long operation</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <iframe
                  className="w-full rounded-lg shadow-lg"
                  width="634"
                  height="356"
                  src="https://www.youtube.com/embed/gAn_YfzNkUI"
                  title="TeaWedha IoT Device 3D object Visualization with Luma AI | Created by Bhagya Ekanayake"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Get Your TeaWedha Section */}
        <section
          id="pricing"
          className="py-16 px-4 md:px-8 border border-gray-200"
        >
          <div className="wrapper">
            <h2 className="text-3xl font-bold text-center mb-12">
              Get Your TeaWedha with IoT Device
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Starter Kit Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-center mb-4">
                  Starter Kit
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  For small tea plantations
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>IoT Device</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Mobile App Access</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-4">$39.99</p>
                  <a
                    href="https://www.google.com"
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Get Started
                  </a>
                </div>
              </div>

              {/* Pro Kit Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-center mb-4">Pro Kit</h3>
                <p className="text-center text-gray-600 mb-6">
                  For Mid-Size Plantations
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>IoT Device</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Mobile App Access</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Enhanced Performance</span>
                  </li>
                </ul>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-4">$79.99</p>
                  <a
                    href="https://www.google.com"
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section
          id="download"
          className="py-16 px-4 md:px-8 border border-gray-200 bg-white"
        >
          <div className="wrapper text-center">
            <h2 className="text-3xl font-bold mb-12">Download the TeaWedha</h2>
            <div className="flex flex-col items-center space-y-8">
              <div className="w-48 h-48 rounded-lg flex items-center justify-center mb-4">
                <img
                  src={AppQR}
                  alt="App Mockup"
                  className="rounded-lg w-full"
                />
              </div>
              <a
                href="https://drive.google.com/file/d/1iyB9MzOFH1HeOKbDU489-HJf_7lgobGX/view?usp=sharing"
                target="_blank"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Download APK
              </a>
            </div>
          </div>
        </section>

        {/* Setup Instructions Section */}
        <section
          id="setup"
          className="py-16 px-4 md:px-8 border border-gray-200"
        >
          <div className="wrapper">
            <h2 className="text-3xl font-bold text-center mb-4">
              Setup Instructions
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Get Started with TeaWedha in just a few simple steps
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl font-bold text-green-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Download APK
                </h3>
                <p className="text-gray-600">
                  Download the TeaWedha app from our website to your Android
                  device.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Enable Unknown Sources
                </h3>
                <p className="text-gray-600">
                  Go to Settings and allow app installs from unknown sources.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Install the App
                </h3>
                <p className="text-gray-600">
                  Open the downloaded APK file and install the app.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-2xl font-bold text-green-600">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Start Monitoring
                </h3>
                <p className="text-gray-600">
                  Launch TeaWedha and connect with your IoT device to begin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeaWedha;
