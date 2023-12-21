import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../redux/CountryListSlice/CountryListSlice";
import { StateList } from "../../redux/StateList/StateList";

export default function Countrydetails ( {handCountrydetails}) {
  //selected country
  const [selectedOption, setSelectedOption] = useState(null);
  //country options
  const [options, setOptions] = useState([]);
  //state option based on countrysetSelectedState
  const [States, setStates] = useState([]);
  //selected States
  const [SelectedState, setSelectedState] = useState(null);

  //
  const [selectCountryId, setselectCountryId] = useState('');
  const [StatesId, setselectStatesId] = useState('');



  

  const dispatch = useDispatch();

  useEffect(() => {
    let tokenNum = localStorage.getItem("user");
    let token = { token: tokenNum };
    dispatch(getCountry(token)).then((data) => {
      const country = data.payload.data;
      const formattedOptions = country.map((option) => ({
        value: option.countryId,
        label: option.countryName,
      }));
      setOptions(formattedOptions);
    });
  }, [dispatch]);

  useEffect(() => {
    if (selectedOption !== null) {
      let tokenNum = localStorage.getItem("user");
      let token = { token: tokenNum };
      //get id of selected country
      const { value } = selectedOption;
      setselectCountryId(selectedOption.value)
      dispatch(StateList({ token, value }))
      .then((e) => {
        // console.log(e.payload.data,'this is data stste')
        let statesofCountry = e.payload.data;
        console.log(statesofCountry,'this is data stste')
        setselectStatesId(statesofCountry.stateId)

        const formateState = statesofCountry.map((e) => ({
          value: e.stateId,
          label: e.stateName,
        }));
        setStates(formateState);
      });
    }
  }, [selectedOption]);

  const handleChangeCountry = (selected) => {
    console.log(selected, "at select country");
    setSelectedOption(selected);
    

  };

  const handleChangeState = (selected) => {
    console.log(selected, "at handleChangeState");
    setSelectedState(selected.value);
  };

  handCountrydetails({selectCountryId,StatesId})

  return (
    <>
      <div className="flex   w-full p-2 ">
        <div className=" w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Details
          </h1>
          <form action="/" method="post">
            <div className=" grid gap-2 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  for="firstName"
                >
                  Select Country
                </label>
                <Select
                  id="mySelect"
                  value={selectedOption}
                  onChange={handleChangeCountry}
                  className="basic-single text-left text-sm text-gray-700  rounded border border-gray-200"
                  classNamePrefix="select"
                  options={options}
                />
                {selectedOption && <p>{selectedOption.label}</p>}
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium  text-gray-700 text-left"
                  for="firstName"
                >
                  Select State
                </label>
                <Select
                  className="basic-single text-left text-sm rounded text-gray-700 border border-gray-200"
                  classNamePrefix="select"
                  options={States}
                  value={SelectedState}
                  onChange={handleChangeState}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
