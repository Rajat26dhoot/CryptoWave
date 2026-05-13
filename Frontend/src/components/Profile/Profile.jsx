import { useSelector } from "react-redux";
import {
  CalendarDays,
  CheckCircle2,
  Fingerprint,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="profile-field">
    <span className="profile-field-icon">
      <Icon size={18} />
    </span>
    <div>
      <span>{label}</span>
      <strong>{value || "N/A"}</strong>
    </div>
  </div>
);

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user || {};

  const initials = (user.username || user.email || "CW")
    .split(/[ @._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const profileFields = [
    {
      label: "User Name",
      value: user.username,
      icon: UserRound,
    },
    {
      label: "Mobile Number",
      value: "+1-856-569-999-1236",
      icon: Phone,
    },
    {
      label: "Email",
      value: user.email,
      icon: Mail,
    },
    {
      label: "City",
      value: "New York",
      icon: MapPin,
    },
    {
      label: "Country",
      value: "United States",
      icon: Globe2,
    },
    {
      label: "Date of Birth",
      value: "1990-12-12",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="profile-shell min-h-screen text-white">
      <main className="profile-container">
        <section className="profile-hero">
          <div>
            <p className="profile-kicker">Account Center</p>
            <h1>Identity & Security</h1>
            <span>Manage account details, verification posture, and credential controls.</span>
          </div>
          <div className="profile-live-badge">
            <span className="status-pulse" />
            Protected profile
          </div>
        </section>

        <section className="profile-layout">
          <article className="profile-card">
            <div className="profile-identity-panel">
              <div className="profile-avatar-ring">
                <div className="profile-avatar">
                  <span>{initials || "CW"}</span>
                </div>
              </div>
              <div>
                <p className="profile-kicker">Primary account</p>
                <h2>{user.username || "CryptoWave User"}</h2>
                <span>{user.email || "No email available"}</span>
              </div>
            </div>

            <div className="profile-field-grid">
              {profileFields.map((field) => (
                <ProfileField key={field.label} {...field} />
              ))}
            </div>
          </article>

          <aside className="profile-side-stack">
            <section className="profile-security-card">
              <div className="profile-card-heading">
                <span className="profile-panel-icon">
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <p className="profile-kicker">Security</p>
                  <h2>2 Step Verification</h2>
                </div>
              </div>

              <div className="profile-security-grid">
                <button className="profile-status-pill status-disabled">
                  <LockKeyhole size={17} />
                  Disabled
                </button>
                <button className="profile-status-pill status-enabled">
                  <CheckCircle2 size={17} />
                  Enabled
                </button>
              </div>

              <div className="profile-security-note">
                <Fingerprint size={18} />
                <span>Use 2 step verification to harden access for wallet and trading actions.</span>
              </div>
            </section>

            <section className="profile-password-card">
              <div className="profile-card-heading">
                <span className="profile-panel-icon">
                  <KeyRound size={22} />
                </span>
                <div>
                  <p className="profile-kicker">Credentials</p>
                  <h2>Change Password</h2>
                </div>
              </div>

              <form className="profile-password-form">
                <label>
                  <span>Email</span>
                  <input type="email" placeholder="Email" required />
                </label>
                <label>
                  <span>New Password</span>
                  <input type="password" placeholder="New Password" required />
                </label>
                <label>
                  <span>Confirm Password</span>
                  <input type="password" placeholder="Confirm Password" required />
                </label>
                <button type="submit" className="profile-primary-button">
                  <Sparkles size={18} />
                  Change Password
                </button>
              </form>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Profile;
