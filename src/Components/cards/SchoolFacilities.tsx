import React from 'react';
import {FaBuilding as Building, FaDesktop as Monitor} from 'react-icons/fa';

const SchoolFacilities: React.FC = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Facilities</h3>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Modern Hostels */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <div className="text-orange-500 font-bold text-2xl mb-2">1</div>
          <h4 className="font-semibold text-gray-800 mb-2">Modern Hostels</h4>
          <p className="text-sm text-gray-600">Safe and comfortable accommodation</p>
        </div>

        {/* Computer Labs */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <div className="text-orange-500 font-bold text-2xl mb-2">8</div>
          <h4 className="font-semibold text-gray-800 mb-2">Computer Labs</h4>
          <p className="text-sm text-gray-600">Latest technology for digital learning</p>
        </div>

        {/* Playgrounds */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L8 8H2v2h6l4-6 4 6h6V8h-6l-4-6z" />
              <path d="M4 10v10a2 2 0 002 2h12a2 2 0 002-2V10H4z" />
            </svg>
          </div>
          <div className="text-orange-500 font-bold text-2xl mb-2">3</div>
          <h4 className="font-semibold text-gray-800 mb-2">Playgrounds</h4>
          <p className="text-sm text-gray-600">Extensive areas for sports and recreation</p>
        </div>
      </div>
    </div>
  );

export default SchoolFacilities;