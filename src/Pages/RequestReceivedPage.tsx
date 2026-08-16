import React from 'react';
import { FaCheck } from 'react-icons/fa';
import Button from '../Components/buttons/Button';

const RequestReceivedPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-bold text-primary-color font-playfair mb-2 leading-tight font-family-playfair">
            Your request was received
          </h1>
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] rounded-full shadow-lg mb-6">
            <FaCheck className="text-white text-3xl" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#E69500] font-family-poppins mb-4">
            Success!
          </h2>
          
          <p className="text-gray-600 text-sm leading-relaxed font-family-poppins px-4">
            Your request to register this school was successfully received. You will get a confirmation email after the NESA Inspector in your school District approves the legibility of your school.
          </p>
        </div>

        <div className="mb-8 mt-12">
          <Button 
            variant="primary"
            fullWidth
          >
            Back to Home
          </Button>
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-gray-500 font-poppins">
            Copyright © 2025
          </p>
          <p className="text-xs text-gray-500 font-poppins">
            Inzozi Limited
          </p>
        </div>
      </div>
    </div>
  );

export default RequestReceivedPage;