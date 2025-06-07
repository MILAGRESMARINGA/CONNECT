import React from 'react';

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for reports content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Attendance Report</h2>
          <p className="text-gray-600">View detailed attendance statistics and trends.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Growth Report</h2>
          <p className="text-gray-600">Track membership growth and engagement metrics.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Small Groups Report</h2>
          <p className="text-gray-600">Monitor small group participation and activities.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;