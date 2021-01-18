import { isMobile } from "./helpers/Ua";

document.querySelector(".wrapper").setAttribute("data-sp", String(isMobile));
