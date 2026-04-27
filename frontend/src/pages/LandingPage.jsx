import { useContext, useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import {
  ArrowRight,
  Download,
  LayoutTemplate,
  MenuIcon,
  X,
  Zap,
} from "lucide-react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "../components/Cards";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Modal from "../components/Modal"; // ✅ FIXED

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false); // ✅ fixed name
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("login"); // ✅ ADDED

  const handleCTA = () => {
    if (user?.name) {
      navigate("/dashboard");
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <div className={landingPageStyles.container}>
      {/* HEADER */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          {/* LOGO */}
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>SculptCV</span>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X size={24} className={landingPageStyles.mobileMenuIcon} />
            ) : (
              <MenuIcon
                size={24}
                className={landingPageStyles.mobileMenuIcon}
              />
            )}
          </button>

          {/* DESKTOP AUTH */}
          <div className="hidden md:flex items-center">
            {user?.name ? (
              <ProfileInfoCard />
            ) : (
              <button
                className={landingPageStyles.desktopAuthButton}
                onClick={() => setOpenAuthModal(true)}
              >
                <span className={landingPageStyles.desktopAuthButtonText}>
                  Get Started
                </span>
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className={landingPageStyles.mobileMenu}>
            <div className={landingPageStyles.mobileMenuContainer}>
              {user?.name ? (
                <div className={landingPageStyles.mobileUserInfo}>
                  <div className={landingPageStyles.mobileUserWelcome}>
                    Welcome Back, {user.name}
                  </div>

                  <button
                    className={landingPageStyles.mobileDashboardButton}
                    onClick={() => {
                      navigate("/dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <button
                  className={landingPageStyles.mobileAuthButton}
                  onClick={() => {
                    setOpenAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className={landingPageStyles.main}>
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            <div className={landingPageStyles.heroLeft}>
              <div className={landingPageStyles.tagline}>
                Professional Resume Builder
              </div>

              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>Craft </span>
                <span className={landingPageStyles.headingGradient}>
                  Professional
                </span>
                <span className={landingPageStyles.headingText}> Resumes</span>
              </h1>

              <p className={landingPageStyles.description}>
                Create job-winning resumes with expertly designed templates.
                ATS-friendly, recruiter-approved, and tailored to your career
                goals.
              </p>

              {/* CTA */}
              <div className={landingPageStyles.ctaButtons}>
                <button
                  className={landingPageStyles.primaryButton}
                  onClick={handleCTA}
                >
                  <div className={landingPageStyles.primaryButtonOverlay}></div>
                  <span className={landingPageStyles.primaryButtonContent}>
                    Start Building
                    <ArrowRight
                      className={landingPageStyles.primaryButtonIcon}
                      size={18}
                    />
                  </span>
                </button>

                <button
                  className={landingPageStyles.secondaryButton}
                  onClick={handleCTA}
                >
                  View Templates
                </button>
              </div>

              {/* STATS */}
              <div className={landingPageStyles.statsContainer}>
                {[
                  {
                    value: "50K+",
                    label: "Resumes Created",
                    gradient: "from-violet-600 to-fuchsia-600",
                  },
                  {
                    value: "4.9★",
                    label: "User Rating",
                    gradient: "from-orange-500 to-red-500",
                  },
                  {
                    value: "5 Min",
                    label: "Build Time",
                    gradient: "from-emerald-500 to-teal-500",
                  },
                ].map((stat, idx) => (
                  <div className={landingPageStyles.statItem} key={idx}>
                    <div
                      className={`${landingPageStyles.statNumber} ${stat.gradient}`}
                    >
                      {stat.value}
                    </div>
                    <div className={landingPageStyles.statLabel}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className={landingPageStyles.featuresSection}>
          <div className={landingPageStyles.featuresContainer}>
            <div className={landingPageStyles.featuresHeader}>
              <h2 className={landingPageStyles.featuresTitle}>
                Why Choose{" "}
                <span className={landingPageStyles.featuresTitleGradient}>
                  SculptCV?
                </span>
              </h2>

              <p className={landingPageStyles.featureDescription}>
                Everything you need to create a professional resume that stands
                out
              </p>
            </div>

            <div className={landingPageStyles.featuresGrid}>
              {[
                {
                  icon: <Zap className={landingPageStyles.featureIcon} />,
                  title: "Lightning Fast",
                  description: "Create professional resumes in under 5 minutes",
                  gradient: landingPageStyles.featureIconViolet,
                  bg: landingPageStyles.featureCardViolet,
                },
                {
                  icon: (
                    <LayoutTemplate className={landingPageStyles.featureIcon} />
                  ),
                  title: "Pro Templates",
                  description: "Choose from recruiter-approved templates",
                  gradient: landingPageStyles.featureIconFuchsia,
                  bg: landingPageStyles.featureCardFuchsia,
                },
                {
                  icon: <Download className={landingPageStyles.featureIcon} />,
                  title: "Instant Export",
                  description: "Download high-quality PDFs instantly",
                  gradient: landingPageStyles.featureIconOrange,
                  bg: landingPageStyles.featureCardOrange,
                },
              ].map((feature, index) => (
                <div key={index} className={landingPageStyles.featureCard}>
                  <div className={landingPageStyles.featureCardHover}></div>

                  <div
                    className={`${landingPageStyles.featureCardContent} ${feature.bg}`}
                  >
                    <div
                      className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className={landingPageStyles.featureTitle}>
                      {feature.title}
                    </h3>

                    <p className={landingPageStyles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={landingPageStyles.footer}>
        <div className={landingPageStyles.footerContainer}>
          <p className={landingPageStyles.footerText}>
            Designed and developed ❤️ by Durgesh
          </p>
        </div>
      </footer>

      {/* MODAL */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>
    </div>
  );
};

export default LandingPage;
