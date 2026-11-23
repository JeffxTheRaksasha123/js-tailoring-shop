import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import CustomerPage from "./pages/CustomerPage";
import AdminPage from "./pages/AdminPage";
import initialServices from "./data/serviceData";
import { API } from "./api";

// FIREBASE
import { auth, googleProvider, db } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const ADMIN_EMAILS = ["sherwinmarino06@gmail.com"];

function App() {
  const [page, setPage] = useState("login");
  const [loginType, setLoginType] = useState("customer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [reservations, setReservations] = useState([]);
  const [myReservations, setMyReservations] = useState([]);

  const [services, setServices] = useState(initialServices);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [adminView, setAdminView] = useState("services");
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [addServiceError, setAddServiceError] = useState("");

  const STATUS_STEPS = ["Pending", "Ginagawa", "Tapos na"];

  const advanceStatus = (id) => {
    setReservations((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const nextIndex =
          (STATUS_STEPS.indexOf(r.status) + 1) % STATUS_STEPS.length;
        return { ...r, status: STATUS_STEPS[nextIndex] };
      })
    );
  };

  const pendingCount = reservations.filter((r) => r.status === "Pending").length;

  const addService = (e) => {
    e.preventDefault();
    setAddServiceError("");

    if (!newServiceForm.name.trim() || !newServiceForm.price) {
      setAddServiceError("Kailangan ang pangalan at presyo ng produkto.");
      return;
    }

    const newService = {
      id: Date.now(),
      name: newServiceForm.name.trim(),
      price: Number(newServiceForm.price),
      image:
        newServiceForm.image.trim() ||
        "https://placehold.co/600x450/e9dfcf/8a7c6a?text=Walang+Larawan",
    };

    setServices((prev) => [...prev, newService]);
    setNewServiceForm({ name: "", price: "", image: "" });
    setIsAddingService(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    details: "",
    date: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(""), 3500);
    return () => clearTimeout(t);
  }, [successMessage]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (username === "Jeff" && password === "Dumango Ka") {
      setPage("admin");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("Wrong admin username or password. Subukan ulit.");
    }
  };

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Hindi makapag-login.");
        return;
      }

      setCurrentUser(data);
      setUsername("");
      setPassword("");
      setPage("customer");
    } catch (err) {
      setLoginError("Hindi makonekta sa server. Siguraduhing gumagana ang backend.");
    }
  };

  const handleRegister = async ({ name, username, password }) => {
    setLoginError("");

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Hindi nagawa ang account.");
        return;
      }

      setCurrentUser(data);
      setPage("customer");
    } catch (err) {
      setLoginError("Hindi makonekta sa server. Siguraduhing gumagana ang backend.");
    }
  };

  // FIREBASE GOOGLE LOGIN (may Firestore save at admin check na)
  const handleGoogleLogin = async () => {
    setLoginError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const gUser = result.user;

      const isAdmin = ADMIN_EMAILS.includes(gUser.email);

      // i-save/i-update ang user info sa Firestore "users" collection
      await setDoc(
        doc(db, "users", gUser.uid),
        {
          displayName: gUser.displayName,
          email: gUser.email,
          photoURL: gUser.photoURL,
          role: isAdmin ? "admin" : "customer",
          createdAt: serverTimestamp(),
        },
        { merge: true } // para hindi ma-overwrite ang existing data pag nag-login ulit
      );

      setCurrentUser({
        id: gUser.uid,
        name: gUser.displayName,
        email: gUser.email,
      });

      setPage(isAdmin ? "admin" : "customer");
    } catch (error) {
      console.error("Google login failed:", error);
      setLoginError("Hindi nagawa ang Google sign-in. Subukan ulit.");
    }
  };

  const fetchMyReservations = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`${API}/reservations/${currentUser.id}`);
      const data = await res.json();
      setMyReservations(data);
    } catch (err) {
      console.error("Hindi nakuha ang reservations:", err);
    }
  };

  const submitReservation = async (e) => {
    e.preventDefault();

    const newReservation = {
      userId: currentUser.id,
      customerName: formData.name,
      contact: formData.contact,
      service: selectedService.name,
      details: formData.details,
      date: formData.date,
    };

    try {
      await fetch(`${API}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReservation),
      });

      setSuccessMessage(
        `Nareserve na ang "${selectedService.name}". Tatawag kami sa number na binigay mo pag tapos na.`
      );

      setFormData({ name: "", contact: "", details: "", date: "" });
      setSelectedService(null);
      fetchMyReservations();
    } catch (err) {
      setSuccessMessage("May problema sa pag-reserve. Subukan ulit.");
    }
  };

  if (page === "login") {
    return (
      <LoginPage
        loginType={loginType}
        setLoginType={setLoginType}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        setLoginError={setLoginError}
        handleLogin={handleLogin}
        handleCustomerLogin={handleCustomerLogin}
        handleRegister={handleRegister}
        handleGoogleLogin={handleGoogleLogin}
      />
    );
  }

  if (page === "customer") {
    return (
      <CustomerPage
        setPage={setPage}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        services={services}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        successMessage={successMessage}
        formData={formData}
        setFormData={setFormData}
        submitReservation={submitReservation}
        myReservations={myReservations}
        fetchMyReservations={fetchMyReservations}
      />
    );
  }

  if (page === "admin") {
    return (
      <AdminPage
        setPage={setPage}
        adminView={adminView}
        setAdminView={setAdminView}
        pendingCount={pendingCount}
        isAddingService={isAddingService}
        setIsAddingService={setIsAddingService}
        addServiceError={addServiceError}
        setAddServiceError={setAddServiceError}
        newServiceForm={newServiceForm}
        setNewServiceForm={setNewServiceForm}
        addService={addService}
        services={services}
        setServices={setServices}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        reservations={reservations}
        advanceStatus={advanceStatus}
      />
    );
  }
}

export default App;
