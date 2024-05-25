import React, { Fragment } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";
import './style.scss'
import EmployeesService from "../../../services/EmployeesService";
import Salaries from "../Salaries";
import Vacations from "../Vacations";
import Deduction from "../Deduction";
import ActiveEmployees from ".//Active";
import Resignation from "./Resignation";
import NoticePeriod from "./NoticePeriod";

const tabs = ['employees', 'salaries', "vacations", "deduction"]
const employeesTabs = ['active', 'resignation', "notice_period"]

const Employees = () => {
    const [selectTab, setSelectTab] = useState('employees')
    const [selectEmployeesTab, setSelectEmployeesTab] = useState('active')
    const lang = useSelector(state=> state.auth?.lang)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
    const employeesService = new EmployeesService()

  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="p-0">
          <div className="tabs-div">
            {tabs?.map((tab,index)=>{
              if(isExist(`view_${tab}`)){
                return <p
                key={index}
                className='mb-0'
                style={{
                  color: tab === selectTab ? "var(--primary)" : "#7E7E7E",
                  borderBottom: tab === selectTab ? "2px solid" : "none",
                }}
                onClick={() => setSelectTab(tab)}
              >
                {Translate[lang][tab]}
                </p>
              }
            })}
          </div>
         </Card.Body>
      </Card>

      {selectTab === 'employees' && <>
      <Card className="mb-3">
        <Card.Body className="p-0">
          <div className="tabs-div">
            {employeesTabs?.map((tab,index)=>{
                return <p
                key={index}
                className='mb-0'
                style={{
                  color: tab === selectEmployeesTab ? "var(--primary)" : "#7E7E7E",
                  borderBottom: tab === selectEmployeesTab ? "2px solid" : "none",
                }}
                onClick={() => setSelectEmployeesTab(tab)}
              >
                {Translate[lang][tab]}
              </p>
            })}
          </div>
         </Card.Body>
      </Card>
        {selectEmployeesTab === 'active' && <ActiveEmployees />}
        {selectEmployeesTab === 'resignation' && <Resignation />}
        {selectEmployeesTab === 'notice_period' && <NoticePeriod />}
      </>}

      {selectTab === 'salaries' && <Salaries />}
      {selectTab === 'vacations' && <Vacations />}
      {selectTab === 'deduction' && <Deduction />}
    </Fragment>
  );
};

export default Employees;