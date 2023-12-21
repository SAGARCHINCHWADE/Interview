import React, { useState } from "react";
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import Layout from "../component/Layout";
import { useDispatch } from "react-redux";
import CreateUserSlice from "../redux/CreateUserSlice/CreateUserSlice";

const steps = [
  "Personal Information",
  "Details",
  "Skills Details",
  "Credentail Details",
];
const initialdata = {
  name: "",
  profileImage: "",
  gender: "",
  phone: "",
  countryId: "",
  stateId: "",
  email: "",
  password: "",
  skills: [],
};

export default function Stepperform() {
  const [UserData, setUserdata] = useState(initialdata);
  //final data of user
  const [activeStep, setActiveStep] = useState(0);

  //personal
  const [gender, setGender] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  //country states
  const [countryId, setselectedCountry] = useState("");
  const [stateId, setstateId] = useState("");
  //ADD SKILL
  const [skills, setaddSkill] = useState([]);
  //email password
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePersonaldetails = ({ Gender, phone, name }) => {
    //handle data from Personaldetails
    console.log(Gender, phone, name, "Gender, phone, name ");
    setGender(Gender);
    setphone(phone);
    setname(name);
  };

  const handCountrydetails = ({ selectCountryId, StatesId }) => {
    //handle data from Countrydetails
    setselectedCountry(selectCountryId);
    setstateId(StatesId);
  };
  const handleSkillsdetails = ({ addSkill }) => {
    //handle data from Skillsdetails
    setaddSkill(addSkill);
  };

  const handleCredentaildetails = ({ email, password, confirmPassword }) => {
    //handle data from Credentaildetails

    setemail(email);
    setpassword(password);
    //collect all data
  };
  const handleSubmit = () => {
    let tokenNum = localStorage.getItem("user");
    let token = { token: tokenNum };
    const usersData = {
      name: name,
      profileImage:
        "http://codetentacles-006-site36.htempurl.com/api/public/Image/202312150649download (14).jfif",
      gender: gender,
      phone: phone,
      countryId: countryId,
      stateId: 8,
      email: email,
      password: password,
      skills: skills,
    };

    setUserdata(usersData);
    dispatch(CreateUserSlice({ UserData, token }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Personaldetails handlePersonaldetails={handlePersonaldetails} />
          </>
        );
      case 1:
        return (
          <>
            <Countrydetails handCountrydetails={handCountrydetails} />
          </>
        );
      case 2:
        return (
          <>
            <Skillsdetails handleSkillsdetails={handleSkillsdetails} />
          </>
        );
      case 3:
        return (
          <>
            <Credentaildetails
              handleCredentaildetails={handleCredentaildetails}
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
        <div>
          <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
            Stepper Form
          </h3>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <>
            {activeStep === steps.length ? (
              <div className="flex justify-center  w-full mt-5">
                <div className=" p-8 m-4">
                  <Typography variant="h5" className="mt-10 mb-10 pb-10">
                    Thank you for submitting the form!
                  </Typography>
                  <button
                    to="/List"
                    onClick={handleSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    View List
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Typography variant="h5">
                  {getStepContent(activeStep)}
                </Typography>
                <div className="flex justify-center">
                  <div className="flex justify-between w-full mt-4">
                    <Button
                      className="bg-back "
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
}
