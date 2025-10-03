import React from 'react';

export default function Illustration({ policy }) {
  if (!policy) return null;

  // Helper function to render nested objects
  const renderObject = (obj) => {
    if (!obj) return '-';
    return Object.entries(obj).map(([key, value]) => {
      // If value is an object, recursively render
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} style={{ paddingLeft: '15px' }}>
            <strong>{key}:</strong>
            {renderObject(value)}
          </div>
        );
      }

      // If key is createdAt or updatedAt, format it
      if (key === 'createdAt' || key === 'updatedAt') {
        const date = new Date(value);
        return (
          <div key={key}>
            <strong>{key}:</strong> {date.toLocaleString()} {/* Format as readable date */}
          </div>
        );
      }

      return (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      );
    });
  };

  return (
    <div className="mt-4">
      <h4>Policy Details</h4>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><strong>Policy Name</strong></td>
            <td>{policy.name}</td>
          </tr>
          <tr>
            <td><strong>Policy Code</strong></td>
            <td>{policy.code}</td>
          </tr>

          {/* Render nested objects dynamically */}
          {Object.entries(policy).map(([key, value]) => {
            if (key === 'name' || key === 'code') return null; // Already rendered
            if (typeof value === 'object' && value !== null) {
              return (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>{renderObject(value)}</td>
                </tr>
              );
            }

            // Format createdAt / updatedAt if top-level
            if (key === 'createdAt' || key === 'updatedAt') {
              const date = new Date(value);
              return (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>{date.toLocaleString()}</td>
                </tr>
              );
            }

            return (
              <tr key={key}>
                <td><strong>{key}</strong></td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
