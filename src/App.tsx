import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <nav className="navbar">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <Link to="/">CertifyEase</Link>
              <div className="flex gap-4">
                <Link to="#">Register</Link>
                <Link to="#">Login</Link>
              </div>
            </div>
          </div>
        </nav>

        <section id="hero-section">
          <div className="container mx-auto">
            <div>
              <h1>CertifyEase</h1>
              <h2>Crafting Certificates, Delighting Recipients</h2>
              <div>
                <button>
                  <Link to="template">Get Started</Link>
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
