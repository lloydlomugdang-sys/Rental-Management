import { useState, useEffect } from "react";
import axios from "axios";
import {
  ClipboardList,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Wrench,
  CheckCircle, 
  XCircle      
} from "lucide-react";
import rentixLogo from "../assets/RentixLogo.jpg";
import rentixName from "../assets/RentixName.jpg";
import "./landlord.css";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Units", icon: Home },
  { name: "Payments", icon: CreditCard },
  { name: "Tenants", icon: Users },
  { name: "Applications", icon: ClipboardList },
  { name: "Maintenance", icon: Wrench },
  { name: "Leasing", icon: FileText },
  { name: "Help/Supports", icon: HelpCircle },
];

export const LandingPage = () => {
  const [page, setPage] = useState("Dashboard");
  
  // DYNAMIC STATES
  const [stats, setStats] = useState({
    activeTenants: 0,
    unitsTotal: 0,
    occupiedUnits: 0,
    maintenanceRequests: 0,
    totalRevenue: 0
  });

  const [revenueData, setRevenueData] = useState([]);
  const [unitsData, setUnitsData] = useState([]);
  const [tenantsData, setTenantsData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [applicationsData, setApplicationsData] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [leasesData, setLeasesData] = useState([]);
  
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // === STATES PARA SA ADD/EDIT MODAL ===
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState(null); 
  const [unitFormData, setUnitFormData] = useState({
    name: "",
    property: "Rentix Property",
    rent: "",
    status: "available",
    type: "studio",
    images: "",
    floor: "",       // IDINAGDAG: Floor field
    description: ""  // IDINAGDAG: Description field
  });

  // === STATES PARA SA CUSTOM DELETE MODAL ===
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState(null);

  // === STATE PARA SA CUSTOM NOTIFICATION (SUCCESS/ERROR) ===
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
  };

  // HELPER FUNCTION: Taga-hanap ng Array sa loob ng Backend Response
  const extractArray = (responseData) => {
    if (!responseData) return [];
    if (Array.isArray(responseData)) return responseData; 
    if (responseData.data && Array.isArray(responseData.data)) return responseData.data; 
    if (typeof responseData === 'object') {
      const arrayKey = Object.keys(responseData).find(key => Array.isArray(responseData[key]));
      if (arrayKey) return responseData[arrayKey];
    }
    return []; 
  };

  useEffect(() => {
    const fetchAllDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [
          unitsRes, tenantsRes, maintenanceRes, paymentsRes, applicationsRes, leasesRes
        ] = await Promise.all([
          axios.get('http://localhost:8000/api/units', config).catch(() => ({ data: [] })),
          axios.get('http://localhost:8000/api/tenants', config).catch(() => ({ data: [] })),
          axios.get('http://localhost:8000/api/maintenance', config).catch(() => ({ data: [] })),
          axios.get('http://localhost:8000/api/payments', config).catch(() => ({ data: [] })),
          axios.get('http://localhost:8000/api/applications', config).catch(() => ({ data: [] })),
          axios.get('http://localhost:8000/api/leases', config).catch(() => ({ data: [] }))
        ]);

        const fetchedUnits = extractArray(unitsRes.data);
        const fetchedTenants = extractArray(tenantsRes.data);
        const fetchedMaintenance = extractArray(maintenanceRes.data);
        const fetchedPayments = extractArray(paymentsRes.data);
        const fetchedApplications = extractArray(applicationsRes.data);
        const fetchedLeases = extractArray(leasesRes.data);

        setUnitsData(fetchedUnits);
        setTenantsData(fetchedTenants);
        setMaintenanceData(fetchedMaintenance);
        setPaymentsData(fetchedPayments);
        setApplicationsData(fetchedApplications);
        setLeasesData(fetchedLeases);

        if (fetchedApplications.length > 0) setSelectedApplication(fetchedApplications[0]);

        const totalUnitsCount = fetchedUnits.length;
        const occupiedCount = fetchedUnits.filter(u => u.status?.toLowerCase() === 'occupied').length;
        const activeTenantsCount = fetchedTenants.length; 
        const pendingMaintenanceCount = fetchedMaintenance.filter(m => m.status?.toLowerCase() !== 'fixed').length;
        const totalRev = fetchedPayments
          .filter(p => p.status?.toLowerCase() === 'paid' || p.status?.toLowerCase() === 'verified')
          .reduce((sum, p) => sum + Number(p.amount || 0), 0);

        setStats({
          activeTenants: activeTenantsCount,
          unitsTotal: totalUnitsCount,
          occupiedUnits: occupiedCount,
          maintenanceRequests: pendingMaintenanceCount,
          totalRevenue: totalRev
        });

        const monthlyRev = fetchedPayments.reduce((acc, curr) => {
          if (curr.status?.toLowerCase() === 'paid' || curr.status?.toLowerCase() === 'verified') {
             const dateVal = curr.date || curr.createdAt || new Date();
             const month = new Date(dateVal).toLocaleString('default', { month: 'short' });
             acc[month] = (acc[month] || 0) + Number(curr.amount || 0);
          }
          return acc;
        }, {});

        const chartData = Object.keys(monthlyRev).map(month => ({
          month: month,
          amount: `₱${monthlyRev[month].toLocaleString()}`,
          height: '60%'
        }));

        setRevenueData(chartData.length > 0 ? chartData : [{ month: "No Data", amount: "₱0", height: "10%" }]);

      } catch (error) {
        console.error("Error fetching full dashboard data:", error);
      }
    };
    fetchAllDashboardData();
  }, []);

  // FILTER LOGIC
  const filteredUnits = unitsData.filter((unit) => {
    const unitName = (unit.name || unit.unitNumber || "").toLowerCase();
    return unitName.includes(searchQuery.toLowerCase());
  });

  // === MGA FUNCTIONS PARA SA CRUD NG UNITS ===

  const handleOpenAddUnit = () => {
    setEditingUnitId(null);
    setUnitFormData({ 
      name: "", 
      property: "Rentix Property", 
      rent: "", 
      status: "available", 
      type: "studio",
      images: "",
      floor: "",
      description: ""
    });
    setShowUnitModal(true);
  };

  const handleOpenEditUnit = (unit) => {
    setEditingUnitId(unit._id || unit.id);
    setUnitFormData({
      name: unit.name || unit.unitNumber || "",
      property: unit.property || "Rentix Property",
      rent: unit.rent || unit.price || "",
      status: unit.status || "available",
      type: unit.type || "studio",
      images: unit.images && unit.images.length > 0 ? unit.images.join(', ') : "",
      floor: unit.floor || "",               // Kunin ang floor sa DB
      description: unit.description || ""    // Kunin ang description sa DB
    });
    setShowUnitModal(true);
  };

  const handleUnitSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = {
        name: unitFormData.name,
        unitNumber: unitFormData.name,
        property: unitFormData.property,
        rent: Number(unitFormData.rent),
        price: Number(unitFormData.rent),
        status: unitFormData.status,
        type: unitFormData.type,
        floor: unitFormData.floor,             // Ipasa ang floor pabalik sa backend
        description: unitFormData.description, // Ipasa ang description pabalik sa backend
        images: unitFormData.images ? unitFormData.images.split(',').map(url => url.trim()).filter(url => url !== "") : []
      };

      if (editingUnitId) {
        const res = await axios.put(`http://localhost:8000/api/units/${editingUnitId}`, payload, config);
        const updatedUnit = res.data.data || res.data;
        setUnitsData(prev => prev.map(u => (u._id || u.id) === editingUnitId ? updatedUnit : u));
        showNotification("Unit details updated successfully!", "success");
      } else {
        const res = await axios.post(`http://localhost:8000/api/units`, payload, config);
        const newUnit = res.data.data || res.data;
        setUnitsData(prev => [...prev, newUnit]);
        setStats(prev => ({ ...prev, unitsTotal: prev.unitsTotal + 1 })); 
        showNotification("New unit created successfully!", "success");
      }
      setShowUnitModal(false); 
    } catch (error) {
      console.error("Error saving unit:", error.response?.data || error);
      const errMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      showNotification(errMsg, "error");
    }
  };

  const handleDeleteClick = (id) => {
    setUnitToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!unitToDelete) return;
    
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.delete(`http://localhost:8000/api/units/${unitToDelete}`, config);
      
      setUnitsData(prev => prev.filter(u => (u._id || u.id) !== unitToDelete));
      setStats(prev => ({ ...prev, unitsTotal: prev.unitsTotal - 1 })); 
      
      setShowDeleteModal(false);
      setUnitToDelete(null);
      showNotification("Unit has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting unit:", error);
      setShowDeleteModal(false);
      showNotification("Error deleting unit. Please try again.", "error");
    }
  };


  return (
    <div className="admin-page d-flex min-vh-100">
      <aside className="sidebar d-flex flex-column justify-content-between text-white">
        <div>
          <div className="brand-box d-flex align-items-center gap-2">
            <img src={rentixLogo} alt="Rentix logo" />
            <img className="rentix-name" src={rentixName} alt="Rentix" />
          </div>
          <p className="panel-name">Landlord Panel</p>

          <nav className="nav flex-column gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
              <button
                className={page === item.name ? "menu-button btn active-menu" : "menu-button btn"}
                key={item.name}
                onClick={() => setPage(item.name)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button
            className={page === "Settings" ? "menu-button btn active-menu" : "menu-button btn"}
            onClick={() => setPage("Settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="menu-button btn logout-menu" onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content flex-grow-1 position-relative">
        <header className="topbar d-flex align-items-center justify-content-between">
          <div></div>
          <div className="topbar-user d-flex align-items-center gap-2">
            <div className="avatar">A</div>
            <p className="landlord-name">Alex Landlord</p>
          </div>
        </header>

        <section className="page-title-card card border-0 shadow-sm">
          <h1>{page}</h1>
          <p>Rentix landlord rental management system</p>
        </section>

        {page === "Dashboard" && (
          <section className="section-box card border-0 shadow-sm">
            <h2>Rental Statistics</h2>
            <div className="dashboard-grid">
              <div className="summary-card card shadow-sm"><p>Active Tenants</p><h3>{stats.activeTenants}</h3></div>
              <div className="summary-card card shadow-sm"><p>Units Total</p><h3>{stats.unitsTotal}</h3></div>
              <div className="summary-card card shadow-sm"><p>Occupied Units</p><h3>{stats.occupiedUnits}</h3></div>
              <div className="summary-card card shadow-sm"><p>Maintenance Request</p><h3>{stats.maintenanceRequests}</h3></div>
            </div>
            <div className="graph-stack">
              <div className="graph-card card shadow-sm">
                <div className="graph-title-row">
                  <h3>Total Revenue</h3>
                  <div className="graph-total"><p>Total Revenue</p><h3>₱{stats.totalRevenue.toLocaleString()}</h3></div>
                </div>
                <div className="bar-chart">
                  {Array.isArray(revenueData) && revenueData.map((item) => (
                    <div className="bar-item" key={item.month}>
                      <span>{item.amount}</span>
                      <div className="bar-bg"><div className="bar-fill" style={{ height: item.height }}></div></div>
                      <p>{item.month}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="graph-card card shadow-sm">
                <h3>Rents Collected This Month</h3>
                <div className="pie-layout">
                  <div className="pie-chart"></div>
                  <div className="pie-info">
                    <p>Total Tenants: {stats.activeTenants}</p>
                    <p><span className="color-box rent-color"></span>Rent Collected: ₱{stats.totalRevenue.toLocaleString()}</p>
                    <p><span className="color-box late-color"></span>Late/Unpaid: {Array.isArray(paymentsData) ? paymentsData.filter(p => p.status?.toLowerCase() === 'unpaid' || p.status?.toLowerCase() === 'overdue').length : 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "Units" && (
          <section className="section-box card border-0 shadow-sm">
            <div className="tools-row d-flex gap-2 flex-wrap mb-3">
              <input 
                className="form-control" 
                placeholder="Search units" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleOpenAddUnit}>Add Unit</button>
            </div>

            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Property</th>
                  <th>Floor</th>
                  <th>Rent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUnits.length > 0 ? filteredUnits.map((unit) => (
                  <tr key={unit._id || unit.id || Math.random()}>
                    <td>{unit.name || unit.unitNumber || 'N/A'}</td>
                    <td>{unit.property || 'Rentix Property'}</td>
                    <td>{unit.floor || 'N/A'}</td>
                    <td>₱{unit.rent || unit.price || 0}</td>
                    <td>{unit.status || 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2" onClick={() => handleOpenEditUnit(unit)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClick(unit._id || unit.id)}>Delete</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="6" className="text-center">No units found</td></tr>}
              </tbody>
            </table>
          </section>
        )}

        {page === "Payments" && (
          <section className="section-box card border-0 shadow-sm">
            <table className="table table-hover align-middle mt-3">
              <thead><tr><th>Tenant</th><th>Unit</th><th>Amount</th><th>Status</th><th>Due Date</th></tr></thead>
              <tbody>
                {Array.isArray(paymentsData) && paymentsData.length > 0 ? paymentsData.map((payment) => (
                  <tr key={payment._id || Math.random()}>
                    <td>{payment.tenant?.name || payment.tenantName || 'N/A'}</td><td>{payment.unit?.name || payment.unitName || 'N/A'}</td>
                    <td>₱{payment.amount || 0}</td><td>{payment.status || 'N/A'}</td><td>{payment.date || payment.dueDate || 'N/A'}</td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-center">No payment records found</td></tr>}
              </tbody>
            </table>
          </section>
        )}

        {page === "Tenants" && (
          <section className="section-box card border-0 shadow-sm">
             <div className="tools-row d-flex gap-2 flex-wrap mb-3"><button className="btn btn-primary">Add Tenant</button></div>
            <table className="table table-hover align-middle">
              <thead><tr><th>Name</th><th>Unit</th><th>Phone</th><th>Status</th></tr></thead>
              <tbody>
                {Array.isArray(tenantsData) && tenantsData.length > 0 ? tenantsData.map((tenant) => (
                  <tr key={tenant._id || tenant.id || Math.random()}>
                    <td>{tenant.name || tenant.fullName || 'N/A'}</td><td>{tenant.unit?.name || tenant.unitName || 'N/A'}</td>
                    <td>{tenant.phone || tenant.contactNumber || 'N/A'}</td><td>{tenant.status || 'Active'}</td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center">No tenants found</td></tr>}
              </tbody>
            </table>
          </section>
        )}

        {page === "Applications" && (
          <section className="section-box card border-0 shadow-sm">
            <table className="table table-hover align-middle mb-4">
              <thead><tr><th>Applicant</th><th>Unit</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {Array.isArray(applicationsData) && applicationsData.length > 0 ? applicationsData.map((app) => (
                  <tr key={app._id || app.id || Math.random()} onClick={() => setSelectedApplication(app)}>
                    <td>{app.name || app.applicantName || 'N/A'}</td><td>{app.unit?.name || app.targetUnit || 'N/A'}</td>
                    <td>{app.status || 'N/A'}</td>
                    <td><button className="btn btn-sm btn-primary me-2">Approve</button><button className="btn btn-sm btn-danger">Deny</button></td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center">No pending applications</td></tr>}
              </tbody>
            </table>
            {selectedApplication && (
              <div className="details-box card shadow-sm">
                <h3>More Information</h3>
                <p>Name: {selectedApplication.name || selectedApplication.applicantName || 'N/A'}</p>
                <p>Applied Unit: {selectedApplication.unit?.name || selectedApplication.targetUnit || 'N/A'}</p>
                <p>Status: {selectedApplication.status || 'N/A'}</p>
              </div>
            )}
          </section>
        )}

        {page === "Maintenance" && (
          <section className="section-box card border-0 shadow-sm">
            <table className="table table-hover align-middle">
              <thead><tr><th>Request</th><th>Unit</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {Array.isArray(maintenanceData) && maintenanceData.length > 0 ? maintenanceData.map((item) => (
                  <tr key={item._id || item.id || Math.random()}>
                    <td>{item.request || item.title || 'N/A'}</td><td>{item.unit?.name || item.unitName || 'N/A'}</td>
                    <td>{item.status || 'N/A'}</td>
                    <td><button className="btn btn-sm btn-primary me-2">Update</button><button className="btn btn-sm btn-danger">Delete</button></td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center">No maintenance requests</td></tr>}
              </tbody>
            </table>
          </section>
        )}

        {page === "Leasing" && (
          <section className="section-box card border-0 shadow-sm">
            <table className="table table-hover align-middle">
              <thead><tr><th>Tenant</th><th>Unit</th><th>Start</th><th>End</th></tr></thead>
              <tbody>
                {Array.isArray(leasesData) && leasesData.length > 0 ? leasesData.map((lease) => (
                  <tr key={lease._id || lease.id || Math.random()}>
                    <td>{lease.tenant?.name || lease.tenantName || 'N/A'}</td><td>{lease.unit?.name || lease.unitName || 'N/A'}</td>
                    <td>{lease.start || lease.startDate || 'N/A'}</td><td>{lease.end || lease.endDate || 'N/A'}</td>
                  </tr>
                )) : <tr><td colSpan="4" className="text-center">No active leases</td></tr>}
              </tbody>
            </table>
          </section>
        )}

        {page === "Help/Supports" && (
           <section className="section-box card border-0 shadow-sm">
             <h2>Tenant Reports</h2>
             <table className="table table-hover align-middle">
               <thead><tr><th>Unit</th><th>Report</th><th>Status</th></tr></thead>
               <tbody>
                 {Array.isArray(maintenanceData) && maintenanceData.length > 0 ? maintenanceData.map((report) => (
                   <tr key={report._id || report.id || Math.random()}>
                     <td>{report.unit?.name || report.unitName || 'N/A'}</td>
                     <td>{report.request || report.description || 'N/A'}</td>
                     <td>{report.status || 'N/A'}</td>
                   </tr>
                 )) : <tr><td colSpan="3" className="text-center">No reports filed</td></tr>}
               </tbody>
             </table>
           </section>
        )}

        {page === "Settings" && (
           <section className="section-box card border-0 shadow-sm">
             <h2>Settings Placeholder</h2>
             <p>Ang backend settings ay ide-develop pa.</p>
           </section>
        )}

        {/* === MODAL POP-UP PARA SA ADD AT EDIT UNIT === */}
        {showUnitModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <div className="card p-4 shadow-lg" style={{ width: '450px', backgroundColor: 'white', borderRadius: '12px', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3 className="mb-4">{editingUnitId ? 'Edit Unit Details' : 'Add New Unit'}</h3>
              
              <form onSubmit={handleUnitSubmit}>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Unit Name / No.</label>
                    <input type="text" className="form-control" required placeholder="e.g. A101"
                      value={unitFormData.name} 
                      onChange={e => setUnitFormData({...unitFormData, name: e.target.value})} 
                    />
                  </div>
                  
                  {/* IDINAGDAG NA INPUT PARA SA FLOOR */}
                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Floor</label>
                    <input type="text" className="form-control" placeholder="e.g. 1, 2, GF"
                      value={unitFormData.floor} 
                      onChange={e => setUnitFormData({...unitFormData, floor: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Property Name</label>
                  <input type="text" className="form-control" required placeholder="e.g. Rentix Property"
                    value={unitFormData.property} 
                    onChange={e => setUnitFormData({...unitFormData, property: e.target.value})} 
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Rent Price (₱)</label>
                  <input type="number" className="form-control" required placeholder="e.g. 15000"
                    value={unitFormData.rent} 
                    onChange={e => setUnitFormData({...unitFormData, rent: e.target.value})} 
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Unit Type</label>
                  <select className="form-select" value={unitFormData.type} 
                    onChange={e => setUnitFormData({...unitFormData, type: e.target.value})}>
                    <option value="studio">Studio</option>
                    <option value="one-bedroom">One Bedroom</option>
                    <option value="two-bedroom">Two Bedroom</option>
                    <option value="three-bedroom">Three Bedroom</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="fw-bold">Image URLs (Optional)</label>
                  <input type="text" className="form-control" placeholder="e.g. https://imgur.com/img1.jpg, https://imgur.com/img2.jpg"
                    value={unitFormData.images} 
                    onChange={e => setUnitFormData({...unitFormData, images: e.target.value})} 
                  />
                  <small className="text-muted d-block mt-1">Separate multiple links with a comma (,)</small>
                </div>

                {/* IDINAGDAG NA INPUT PARA SA DESCRIPTION */}
                <div className="mb-3">
                  <label className="fw-bold">Description (Optional)</label>
                  <textarea className="form-control" rows="2" placeholder="Describe the unit..."
                    value={unitFormData.description} 
                    onChange={e => setUnitFormData({...unitFormData, description: e.target.value})} 
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="fw-bold">Status</label>
                  <select className="form-select" value={unitFormData.status} 
                    onChange={e => setUnitFormData({...unitFormData, status: e.target.value})}>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 border-top pt-3">
                  <button type="button" className="btn btn-secondary px-4" onClick={() => setShowUnitModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary px-4">{editingUnitId ? 'Save Changes' : 'Create Unit'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === CUSTOM DELETE CONFIRMATION MODAL === */}
        {showDeleteModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060, 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <div className="card p-4 shadow-lg text-center" style={{ width: '400px', backgroundColor: 'white', borderRadius: '12px' }}>
              <h4 className="text-danger mb-3">Confirm Deletion</h4>
              <p>Are you sure you want to delete this unit? This action cannot be undone.</p>
              
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-secondary px-4" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={confirmDelete}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* === CUSTOM NOTIFICATION MODAL (SUCCESS/ERROR) === */}
        {notification.show && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1070, 
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <div className="card p-4 shadow-lg text-center" style={{ width: '350px', backgroundColor: 'white', borderRadius: '12px' }}>
              <div className={`mb-3 ${notification.type === 'success' ? 'text-success' : 'text-danger'}`}>
                {notification.type === 'success' ? <CheckCircle size={50} /> : <XCircle size={50} />}
              </div>
              <h4 className="mb-2 fw-bold">{notification.type === 'success' ? 'Success!' : 'Error'}</h4>
              <p className="text-muted">{notification.message}</p>
              <button 
                className={`btn mt-3 px-4 ${notification.type === 'success' ? 'btn-success' : 'btn-danger'}`} 
                onClick={() => setNotification({ ...notification, show: false })}
              >
                OK
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};