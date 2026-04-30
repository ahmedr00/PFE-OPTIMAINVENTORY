import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  CheckCircle,
  BarChart3,
  Smartphone,
  Database,
  Shield,
  Zap,
  Users,
  User,
  Mail,
  Lock,
  Building2,
  MapPinHouse,
  ArrowRight,
  X,
  Menu,
} from "lucide-react";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/Button";

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoading = false;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    companyName: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // In production, this would send data to Super Admin via API
    // The Super Admin then manually creates the client account and triggers Email 1
    console.log("Demo request submitted:", formData);

    toast.success("Demande envoyée avec succès!", {
      description: "Notre équipe vous contactera sous 24 heures.",
    });

    setFormData({ fullName: "", email: "", address: "", companyName: "" });
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sarl, setSarl] = useState("");
  const [address, setAddress] = useState("");
  const { signup, error } = useAuthStore();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Application Mobile",
      description: "Interface native pour comptage terrain sur iOS et Android",
    },
    {
      icon: <Database className="w-8 h-8 text-white" />,
      title: "Intégration Sage 100",
      description:
        "Synchronisation bidirectionnelle automatique avec votre ERP",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "Rapports en Temps Réel",
      description: "Tableaux de bord et analytics avec écarts colorés",
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Contrôle Qualité",
      description: "Validation multi-étapes et comptage aveugle",
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Workflow Automatisé",
      description: "Notifications automatiques et affectation intelligente",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Gestion des Rôles",
      description: "Admin, Gestionnaire et Compteur avec permissions",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-green-500 to-emerald-500 ">
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-accent-foreground" />
          <span className="font-display text-xl font-bold text-accent-foreground">
            Optima Inventory
          </span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-accent-foreground/80 hover:text-accent-foreground transition-colors"
          >
            Fonctionnalités
          </a>
          <a
            href="#demo"
            className="text-sm font-medium text-accent-foreground/80 hover:text-accent-foreground transition-colors"
          >
            Démo
          </a>
          <Link to="/login">
            <Button
              variant="outline"
              className="border-accent-foreground/30 text-accent-foreground bg-transparent hover:bg-accent-foreground/10"
            >
              Connexion
            </Button>
          </Link>
          <a href="#demo">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Demander une Démo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
        <button className="md:hidden text-accent-foreground">
          <X className="h-6 w-6" />

          <Menu className="h-6 w-6" />
        </button>

        <div className="absolute top-full left-0 right-0 bg-emerald-dark/95 backdrop-blur p-6 flex flex-col gap-4 md:hidden">
          <a href="#features" className="text-accent-foreground/90">
            Fonctionnalités
          </a>
          <a href="#demo" className="text-accent-foreground/90">
            Démo
          </a>
          <Link to="/login" className="text-accent-foreground/90">
            Connexion
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Gérez vos inventaires
            <br />
            <span className="text-primary-foreground/80">avec précision</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Solution complète de gestion d'inventaire avec intégration Sage 100,
            application mobile terrain et workflows automatisés
          </p>

          <div className="flex gap-4 justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
            <span className="text-white text-lg">Comptage aveugle</span>
            <CheckCircle className="w-6 h-6 text-white ml-6" />
            <span className="text-white text-lg">Multi-utilisateurs</span>
            <CheckCircle className="w-6 h-6 text-white ml-6" />
            <span className="text-white text-lg">Temps réel</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a href="#demo">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              >
                Demander une Démo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-accent-foreground/30 text-accent-foreground bg-transparent hover:bg-accent-foreground/10 px-8"
              >
                Découvrir
              </Button>
            </a>
          </motion.div>
        </div>
        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
          <section id="demo" className="bg-muted px-6 py-20 lg:px-12">
            <div className="p-8 ">
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Create Account
              </h2>
              <form onSubmit={handleSignUp}>
                <Input
                  icon={User}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Email Adress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  icon={Building2}
                  type="text"
                  placeholder="Entreprise SARL"
                  value={sarl}
                  onChange={(e) => setSarl(e.target.value)}
                />
                <Input
                  icon={MapPinHouse}
                  type="text"
                  placeholder="123 Rue de la République, 75001 Paris"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {error && (
                  <p className="text-red-500 font-semibold tmt-2">{error}</p>
                )}
                <motion.button
                  className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg
          shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="animate-spin mx-auto size={24} " />
                  ) : (
                    "Demander une démo"
                  )}
                </motion.button>
              </form>
            </div>
          </section>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-white/10 backdrop-blur-md border-t border-white/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80">
            © 2026 Optima Inventory. Solution professionnelle de gestion
            d'inventaire intégrée avec Sage 100.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
