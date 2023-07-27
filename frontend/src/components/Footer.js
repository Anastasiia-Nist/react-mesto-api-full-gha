import React from "react";
function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__copywriter">
        &copy; {new Date().getFullYear()} Mesto Russia by Anastasia &#128506;
      </p>
    </footer>
  );
}
export default Footer;
