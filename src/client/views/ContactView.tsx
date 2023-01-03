import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../utilities/apiService";
import Marquee from "../components/Marquee";

const ContactPage = () => {
  const [contact, setContact] = useState("");
  const nav = useNavigate();

  const subscribeToBlogLife = () => {
    apiService("/api/Contact", "POST", { email: contact })
      .then((data) => {
        alert("Thank you for subscribing to Blogs forEver, dont forget to Donate //Merge donate branch");
        nav("/Blogs");
        console.log(data);
      })
      .catch((err) => console.error(err));

    // old stuff

    // fetch("/api/Contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: contact }),
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   alert("Thank you for subscribing to Blogs forver, dont forget to Donate //Merge donate branch");
    //   nav("/Blogs");
    //   console.log(data);
    // })
    // .catch((err) => console.error(err));
  };

  return (
    <>
      <Marquee scrollamount="20" behavior="alternate">
        <input placeholder="Put Email Here" value={contact} onChange={(e) => setContact(e.target.value)} />
      </Marquee>

      <button className="btn btn-warning" onClick={subscribeToBlogLife}>
        Subscribe to see more Blogs Forever
      </button>
    </>
  );
};
export default ContactPage;
