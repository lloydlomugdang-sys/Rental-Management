import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyDetailsModal from '../../components/PropertyDetailsModal';

// I-IMPORT ANG RENTIX LOGOS DITO (Ipagpapalagay kong tama ang path)
// Siguraduhin na ang path ay tugma sa kung nasaan ang Browse.jsx mo.
// Kung ang Browse.jsx ay nasa src/pages/public/, ang path pataas ay:
// ../../assets/Rentixlogo.png
import rentixLogo from '../../assets/RentixLogo.jpg';
import rentixName from '../../assets/RentixName.jpg';

// Mock Data
const propertiesData = [
  {
    id: 1,
    name: 'Modern Studio Unit',
    location: 'Quezon City, Metro Manila',
    status: 'Available',
    price: '₱8,000',
    type: 'Studio',
    size: '24 sqm',
    description: 'A bright, fully-furnished studio unit with city views, perfect for young professionals. High-speed internet ready, and close to major commercial areas.'
  },
  {
    id: 2,
    name: '1-Bedroom Apartment',
    location: 'Makati City, Metro Manila',
    status: 'Available',
    price: '₱12,000',
    type: '1 Bed',
    size: '35 sqm',
    description: 'Spacious 1-bedroom apartment near the central business district. Features a modern kitchen, built-in cabinets, and access to a gym and pool.'
  },
  {
    id: 3,
    name: '2-Bedroom Condo',
    location: 'Taguig City, Metro Manila',
    status: 'Occupied',
    price: '₱15,000',
    type: '2 Beds',
    size: '45 sqm',
    description: 'Family-friendly 2-bedroom condominium in BGC. Includes a balcony, parking slot, and 24/7 security. Currently occupied by a long-term tenant.'
  }
];

export default function Browse() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER WITH RENTIX BRANDING */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom sticky-top" style={{ zIndex: 1000 }}>
        
        {/* BRAND LOGO AREA */}
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <img
            src={rentixLogo}
            alt="Rentix Logo"
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
          />
          <img
            src={rentixName}
            alt="Rentix Name"
            style={{ height: '18px', objectFit: 'contain' }}
          />
        </Link>
        
        <div className="d-flex align-items-center gap-4 text-muted" style={{ fontSize: '14px' }}>
          <Link to="/browse" className="text-decoration-none fw-bold" style={{ color: '#0ea5e9' }}>Browse</Link>
          <span style={{ cursor: 'pointer' }}>Contact Us</span>
          <Link to="/login" className="btn btn-outline-secondary px-3 py-1 rounded-pill" style={{ fontSize: '13px' }}>
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-grow-1 container py-5">
        
        {/* TITLE & SEARCH */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h2 className="fw-bolder text-dark mb-1">Find Your Next Home</h2>
            <p className="text-muted mb-0" style={{ fontSize: '14px' }}>Discover the perfect rental property for you.</p>
          </div>
          
          <div className="d-flex gap-2" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '8px 0 0 8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input type="text" className="form-control border-start-0 py-2 shadow-none" placeholder="Search by location or name..." style={{ fontSize: '14px', borderRadius: '0 8px 8px 0' }}/>
            </div>
            <button className="btn text-white fw-semibold px-4 shadow-sm" style={{ backgroundColor: '#0ea5e9', borderRadius: '8px', fontSize: '14px' }}>
              Search
            </button>
          </div>
        </div>

        {/* PROPERTY GRID */}
        <div className="row g-4">
          {propertiesData.map((property) => (
            <div className="col-md-6 col-lg-4" key={property.id}>
              <div 
                onClick={() => setSelectedProperty(property)} 
                className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden text-decoration-none hover-card" 
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '200px', backgroundColor: '#e2e8f0' }}>
                   <span className="text-muted fw-semibold">Property Image</span>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className={`badge rounded-pill px-3 py-1 ${property.status === 'Available' ? 'bg-success bg-opacity-25 text-success' : 'bg-secondary bg-opacity-10 text-muted'}`} style={{ fontSize: '11px', fontWeight: '600' }}>
                      {property.status}
                    </span>
                    <h5 className="fw-bolder text-dark mb-0" style={{ color: '#0ea5e9' }}>{property.price}<span className="text-muted fw-normal" style={{ fontSize: '12px' }}>/mo</span></h5>
                  </div>
                  <h5 className="fw-bold text-dark mt-3 mb-1" style={{ fontSize: '18px' }}>{property.name}</h5>
                  <p className="text-muted mb-3 d-flex align-items-center gap-1" style={{ fontSize: '13px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {property.location}
                  </p>
                  
                  <div className="d-flex gap-3 text-muted border-top pt-3 mt-3" style={{ fontSize: '13px' }}>
                    <div className="d-flex align-items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                      {property.type}
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
                      {property.size}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* RENDER MODAL */}
      {selectedProperty && (
        <PropertyDetailsModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </div>
  );
}