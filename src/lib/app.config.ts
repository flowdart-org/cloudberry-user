import { ENV } from "./env";
import IconImage from '../../public/favicon.svg'

export const APP_CONFIG = {
  NAME: "CLOUDBERRY",
  TAGLINE: "",
  DESCRIPTION:
    "",

  LOGO: {
    LIGHT: "",
    DARK: "",
    ICON: IconImage,
  },

  URLS: {
    BASE: "",
    API_BASE: ENV.API_BASE_URL,
    CONTACT: "/contact",
    ABOUT: "/about",
    TERMS: "/terms",
    PRIVACY: "/privacy",
  },

  META: {
    TITLE: "",
    KEYWORDS:
      "",
    OG_IMAGE: "",
    TWITTER_HANDLE: "",
  },


  COMPANY: {
    NAME: "Zen Fashion Studio Pvt. Ltd.",
    ADDRESS: "",
    EMAIL: "",
    PHONE: "",
  },

//   THEME: {
//     DEFAULT_MODE: "light", 
//     RADIUS: "0.5rem",
//   },

  VERSION: "1.0.0",
} as const;
