import React from "react";
import "./Recaptcha.css";

const Recaptcha = ({ recaptcha, setRecaptcha }) => {

    return (
        <div className="recaptcha_container">
            <label className="checkbox_container">
                <div className="checkbox_positional_container">
                <input type="checkbox" className="checkbox"/>
                <span onClick={() => setRecaptcha(!recaptcha)} className="checkmark"></span>
                <p className="checkbox_text">I'm not a robot</p>
                </div>
            </label>
            <div className="image_and_links">
                <div className="recaptcha_img_container">
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt=""/>
                </div>
                <p className="recaptcha_text">reCAPTCHA</p>
                <div className="link_container">
                <a href='https://policies.google.com/privacy?hl=en' className='signup google_links'>Privacy</a>
                <a href="https://policies.google.com/terms?hl=en" className="signup google_links">Terms</a>
                </div>
            </div>
        </div>
    )
}

export default Recaptcha;
