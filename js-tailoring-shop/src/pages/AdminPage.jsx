function AdminPage({
  setPage,
  adminView,
  setAdminView,
  pendingCount,
  isAddingService,
  setIsAddingService,
  addServiceError,
  setAddServiceError,
  newServiceForm,
  setNewServiceForm,
  addService,
  services,
  setServices,
  selectedProduct,
  setSelectedProduct,
  reservations,
  advanceStatus,
}) {
  return (
    <div className="app-shell admin-theme">
      <nav className="topbar topbar-admin">
        <span className="topbar-brand">J's Tailoring Shop · Admin</span>
        <button className="btn-ghost" onClick={() => setPage("login")}>
          Logout
        </button>
      </nav>

      <header className="hero hero-admin">
        <h1>Admin Access Only</h1>
        <p>Manage Service,Edit Product and Add New Product.</p>
      </header>

      <main className="page-container">
        <div className="admin-tabs" role="tablist" aria-label="Admin view">
          <button
            type="button"
            role="tab"
            aria-selected={adminView === "services"}
            className={`admin-tab ${adminView === "services" ? "active" : ""}`}
            onClick={() => setAdminView("services")}
          >
            Service
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={adminView === "orders"}
            className={`admin-tab ${adminView === "orders" ? "active" : ""}`}
            onClick={() => setAdminView("orders")}
          >
            Order
            {pendingCount > 0 && (
              <span className="tab-count">{pendingCount}</span>
            )}
          </button>
        </div>

        {adminView === "services" && (
          <section>
            <div className="section-header">
              <h2 className="section-title">Service</h2>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsAddingService((v) => !v);
                  setAddServiceError("");
                  setSelectedProduct(null);
                }}
              >
                {isAddingService ? "Isara" : "+ Magdagdag ng Produkto"}
              </button>
            </div>

            {isAddingService && (
              <div className="reservation-panel">
                <div className="reservation-panel-header">
                  <h2>New Product</h2>
                  <p>Idagdag ang service.</p>
                </div>
                <form onSubmit={addService} className="reservation-form">
                  <label className="field-label">Product Name</label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="hal. Barong Tagalog"
                    value={newServiceForm.name}
                    onChange={(e) =>
                      setNewServiceForm({
                        ...newServiceForm,
                        name: e.target.value,
                      })
                    }
                  />

                  <label className="field-label">Presyo (₱)</label>
                  <input
                    type="number"
                    className="field-input"
                    placeholder="0"
                    value={newServiceForm.price}
                    onChange={(e) =>
                      setNewServiceForm({
                        ...newServiceForm,
                        price: e.target.value,
                      })
                    }
                  />

                  <label className="field-label">Image URL (optional)</label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="https://..."
                    value={newServiceForm.image}
                    onChange={(e) =>
                      setNewServiceForm({
                        ...newServiceForm,
                        image: e.target.value,
                      })
                    }
                  />

                  {addServiceError && (
                    <p className="field-error">{addServiceError}</p>
                  )}

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      Idagdag ang Product
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => setIsAddingService(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="service-grid">
              {services.map((service) => (
                <div className="service-card" key={service.id}>
                  <div className="service-image-wrap">
                    <img src={service.image} alt={service.name} />
                  </div>
                  <div className="service-body">
                    <h3>{service.name}</h3>
                    <p className="service-price">₱{service.price}</p>
                    <button
                      className="btn-secondary w-full"
                      onClick={() => {
                        setSelectedProduct({ ...service });
                        setIsAddingService(false);
                      }}
                    >
                    Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedProduct && (
              <div className="reservation-panel">
                <div className="reservation-panel-header">
                  <h2>Edit Service</h2>
                </div>
                <div className="reservation-form">
                  <label className="field-label">Service Name</label>
                  <input
                    type="text"
                    className="field-input"
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        name: e.target.value,
                      })
                    }
                  />

                  <label className="field-label">Presyo (₱)</label>
                  <input
                    type="number"
                    className="field-input"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: e.target.value,
                      })
                    }
                  />

                  <label className="field-label">Image URL</label>
                  <input
                    type="text"
                    className="field-input"
                    placeholder="https://..."
                    value={selectedProduct.image}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        image: e.target.value,
                      })
                    }
                  />

                  <div className="form-actions">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setServices(
                          services.map((service) =>
                            service.id === selectedProduct.id
                              ? selectedProduct
                              : service
                          )
                        );
                        setSelectedProduct(null);
                      }}
                    >
                      Save Changes
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => {
                        setServices(
                          services.filter((s) => s.id !== selectedProduct.id)
                        );
                        setSelectedProduct(null);
                      }}
                    >
                      Tanggalin
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {adminView === "orders" && (
          <section>
            <h2 className="section-title">Customer Reservations</h2>

            {reservations.length === 0 ? (
              <p className="empty-state">
                Wala pang reservation.
              </p>
            ) : (
              <div className="reservation-table-wrap">
                <table className="reservation-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Contact</th>
                      <th>Serbisyo</th>
                      <th>Detalye</th>
                      <th>Petsa</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>{reservation.customerName}</td>
                        <td>{reservation.contact}</td>
                        <td>{reservation.service}</td>
                        <td className="cell-details">
                          {reservation.details}
                        </td>
                        <td>{reservation.date}</td>
                        <td>
                          <button
                            type="button"
                            className={`status-badge status-${reservation.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            onClick={() => advanceStatus(reservation.id)}
                            title="I-click para i-update ang status"
                          >
                            {reservation.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminPage;