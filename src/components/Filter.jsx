import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CustomCheckbox from "./CustomCheckbox";
import PopupUI from "./Popup";

const handleCheckboxChange = (isChecked) => {
  console.log("Checkbox is", isChecked ? "checked" : "unchecked");
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth < 768 ? "100%" : 900,
  // border: '2px solid #000',
  // outline: 0,
  // boxShadow: 24,
  p: window.innerWidth < 768 ? 0 : 4,
};

let theme = createTheme({
  shape: {
    pillRadius: 50,
  },
});

export default function Filter({
  destinations,
  setItinerariesList,
  itinerariesList,
  setDestinations,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      className={`${
        open ? "relative flex justify-center" : "text-center pt-[50px]"
      }`}
    >
      <div
        className={`${open ? "absolute z-[1301] bg-white max-md:hidden" : ""}`}
      >
        <ThemeProvider theme={theme}>
          <Button
            onClick={handleOpen}
            variant="text"
            sx={{
              padding: "30px",
              width: "371px",
              justifyContent: "space-between",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            <div className="flex opacity-55 text-gradient-primary text-2xl">
              <svg
                className="opacity-55 mr-[18px]"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="28"
                viewBox="0 0 21 28"
                fill="none"
              >
                <path
                  d="M10.8142 0.923359C12.6661 0.919683 14.482 1.43504 16.056 2.41099C17.6299 3.38693 18.8989 4.78442 19.719 6.44492C20.6267 8.06523 21.0419 9.91523 20.9136 11.768C20.7853 13.6208 20.119 15.3959 18.9966 16.8757C16.5522 20.3419 13.9403 23.6913 11.3977 27.0898C11.3207 27.1823 11.2246 27.257 11.1159 27.3088C11.0072 27.3606 10.8885 27.3883 10.7681 27.3899C10.6477 27.3915 10.5284 27.3671 10.4184 27.3182C10.3084 27.2693 10.2103 27.1971 10.1308 27.1067C7.5679 23.6811 4.93907 20.3012 2.46588 16.813C1.47311 15.3864 0.865909 13.7275 0.703087 11.997C0.540264 10.2666 0.827299 8.52347 1.53652 6.9367C2.24574 5.34993 3.35302 3.9734 4.75091 2.94056C6.14879 1.90772 7.78987 1.25364 9.51497 1.04179C9.93788 0.989346 10.3676 0.962267 10.8142 0.923359ZM7.41228 11.0733C7.41599 11.7356 7.61614 12.382 7.98749 12.9305C8.35883 13.479 8.88464 13.9049 9.49824 14.1543C10.1118 14.4037 10.7857 14.4654 11.4344 14.3316C12.0831 14.1977 12.6775 13.8744 13.1423 13.4025C13.607 12.9306 13.9213 12.3314 14.0453 11.6807C14.1692 11.0301 14.0973 10.3572 13.8386 9.74748C13.5798 9.13774 13.146 8.61853 12.5919 8.25557C12.0379 7.8926 11.3885 7.70225 10.7262 7.7086C10.2871 7.71214 9.853 7.80217 9.44868 7.97354C9.04437 8.14491 8.67773 8.39424 8.36982 8.70734C8.06191 9.02043 7.81869 9.39111 7.65409 9.79823C7.4895 10.2053 7.40673 10.6409 7.41053 11.08L7.41228 11.0733Z"
                  fill="black"
                />
              </svg>
              Destination
            </div>
            <div className="">
              <svg
                className="opacity-55"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="12"
                viewBox="0 0 21 12"
                fill="none"
              >
                <path
                  d="M2.07576 1.74512L10.4583 10.1276L18.8408 1.74512"
                  stroke="black"
                  strokeWidth="2.94074"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Button>
          <Button
            onClick={handleOpen}
            className="text-center"
            variant="text"
            sx={{
              padding: "30px",
              width: "371px",
              justifyContent: "space-between",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            {" "}
            <div className="flex opacity-55 text-gradient-primary text-2xl">
              <svg
                className="opacity-55 mr-[18px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="27"
                viewBox="0 0 24 27"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.9808 1.43303L17.9821 2.3973C21.5255 2.675 23.8662 5.08952 23.87 8.7923L23.8839 19.6306C23.889 23.6677 21.3528 26.1516 17.2874 26.1581L7.35704 26.1709C3.31708 26.1761 0.749078 23.633 0.743997 19.5844L0.730027 8.8733C0.724947 5.14609 2.98306 2.738 6.52644 2.41272L6.52517 1.44846C6.5239 0.882758 6.94301 0.457196 7.50183 0.457196C8.06064 0.45591 8.47975 0.880187 8.48102 1.44589L8.48229 2.34587L16.0263 2.33558L16.025 1.4356C16.0237 0.869901 16.4428 0.445625 17.0017 0.444339C17.5478 0.443053 17.9796 0.86733 17.9808 1.43303ZM2.68701 9.27065L21.9153 9.24494V8.79495C21.8606 6.03072 20.4738 4.58047 17.9845 4.36447L17.9858 5.35445C17.9858 5.9073 17.5552 6.34572 17.0091 6.34572C16.4503 6.347 16.0299 5.90987 16.0299 5.35702L16.0287 4.31562L8.48469 4.3259L8.48596 5.36602C8.48596 5.92016 8.06812 6.35729 7.50931 6.35729C6.9505 6.35857 6.53012 5.92273 6.53012 5.3686L6.52885 4.37862C4.05229 4.62675 2.68193 6.08215 2.68574 8.87081L2.68701 9.27065ZM16.4744 15.1138V15.128C16.4871 15.7194 16.9697 16.1681 17.5552 16.1552C18.1267 16.1411 18.5827 15.6512 18.57 15.0598C18.5433 14.4941 18.0848 14.0326 17.5146 14.0339C16.9304 14.0467 16.4732 14.5224 16.4744 15.1138ZM17.5233 20.8868C16.9391 20.8739 16.468 20.3867 16.4667 19.7952C16.454 19.2038 16.9226 18.714 17.5068 18.6998H17.5195C18.1164 18.6998 18.6003 19.1871 18.6003 19.7914C18.6016 20.3957 18.119 20.8855 17.5233 20.8868ZM11.242 15.1344C11.2674 15.7258 11.7513 16.1873 12.3355 16.1616C12.907 16.1346 13.3629 15.6461 13.3375 15.0547C13.3235 14.4761 12.8536 14.0261 12.2821 14.0274C11.6979 14.0531 11.2407 14.543 11.242 15.1344ZM12.3403 20.829C11.7561 20.8548 11.2735 20.3932 11.2468 19.8018C11.2468 19.2104 11.7028 18.7218 12.287 18.6948C12.8585 18.6935 13.3297 19.1435 13.3424 19.7208C13.3691 20.3135 12.9118 20.8021 12.3403 20.829ZM6.00934 15.1796C6.03474 15.771 6.51862 16.2339 7.10284 16.2069C7.67435 16.1811 8.13029 15.6913 8.10362 15.0999C8.09092 14.5213 7.62101 14.0713 7.04823 14.0726C6.46401 14.0983 6.00807 14.5882 6.00934 15.1796ZM7.10811 20.8355C6.52389 20.8625 6.04128 20.3996 6.01461 19.8082C6.01334 19.2168 6.47055 18.7269 7.05477 18.7012C7.62628 18.6999 8.09746 19.1499 8.11016 19.7285C8.13683 20.3199 7.68089 20.8097 7.10811 20.8355Z"
                  fill="black"
                />
              </svg>
              Dates
            </div>
            <div className="">
              <svg
                className="opacity-55"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="12"
                viewBox="0 0 21 12"
                fill="none"
              >
                <path
                  d="M2.07576 1.74512L10.4583 10.1276L18.8408 1.74512"
                  stroke="black"
                  strokeWidth="2.94074"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Button>
          {/* Modal Implementation */}
          <Modal
            open={open}
            onClose={handleClose} // Close modal on backdrop click or programmatically
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal content from closing it
            >
              <PopupUI
                onClose={handleClose}
                setOpen={setOpen}
                destinations={destinations}
                setItinerariesList={setItinerariesList}
                itinerariesList={itinerariesList}
                setDestinations={setDestinations}
              />
            </Box>
          </Modal>
        </ThemeProvider>
      </div>
    </div>
  );
}
