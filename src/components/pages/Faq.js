import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
// import { Accordion } from "react-bootstrap";
import { createGlobalStyle } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import Accordion from "../pages/accordion";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const Faq = function () {

  return (
    <div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
         
      <Accordion/>
    </div>
  );
};
export default Faq;
