import React, { Fragment } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";
import './style.scss'
import Salaries from "../Salaries";
import Vacations from "../Vacations";
import Deduction from "../Deduction";
import ActiveEmployees from ".//Active";
import Resignation from "./Resignation";
import NoticePeriod from "./NoticePeriod";
import DeletedEmployees from "./Deleted";
import Provision from "../Provision";
import Sick from "../Sick";

const tabs = ['employees', 'salaries', "vacations", "deduction", "provision", "sick"]
const employeesTabs = ['active', "notice_period", 'resignation', 'deleted']

const Employees = () => {
    const [selectTab, setSelectTab] = useState('employees')
    const [selectEmployeesTab, setSelectEmployeesTab] = useState('active')
    const lang = useSelector(state=> state.auth?.lang)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);

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
              } else {
                return <></>
              }
            })}
          </div>
         </Card.Body>
      </Card>

      {(selectTab === 'employees' && isExist(`view_employees`)) && <>
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
        {selectEmployeesTab === 'deleted' && <DeletedEmployees />}
      </>}
      {(selectTab === 'salaries' && isExist(`view_salaries`)) && <Salaries />}
      {(selectTab === 'vacations' && isExist(`view_vacations`)) && <Vacations />}
      {(selectTab === 'deduction' && isExist(`view_deduction`)) && <Deduction />}
      {(selectTab === 'provision' && isExist(`view_provision`)) && <Provision />}
      {(selectTab === 'sick' && isExist(`view_sick`)) && <Sick />}
    </Fragment>
  );
};

export default Employees;