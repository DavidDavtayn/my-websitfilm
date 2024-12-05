import React, { useState } from "react";

function ContactUs() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            alert("OK");
        } else {
            alert("NO");
        }
    };

    return (
        <div className="contact-us">
            <div className="contactusinfo">
                <h1>Contact Us</h1>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="name" placeholder="Name*" />
                </label>
                <br />
                <label>
                    <input type="text" name="phone" placeholder="Phone*" />
                </label>
                <br />
                <label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <div className="contact-kart">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4967.117822733778!2d-0.12357863541904276!3d51.50296138160756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2sam!4v1732878666039!5m2!1sen!2sam"
                    width="620"
                    height="530"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

export default ContactUs;
