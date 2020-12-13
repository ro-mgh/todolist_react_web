import React from "react";
import Logo from "../pictures/git-logo.png";
/** @jsx jsx */
import { jsx, Global, ClassNames } from "@emotion/react";
import { footer__img, footer_style } from "./Styles";

const Footer = () => {
  return (
    <footer css={footer_style}>
      <p>
        <a href="https://github.com/ro-mgh/todolist_react_web" target="_blank">
          <img css={footer__img} src={Logo} alt="Git"></img>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
