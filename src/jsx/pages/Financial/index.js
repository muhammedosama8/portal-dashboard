import { useState } from "react"
import {
    Card,
  } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";
import Assets from "./Assets";
import Expenses from "./Expenses";
import Projects from "./Projects";
import Revenues from "./Revenues";
import YearExpenses from "./YearExpenses";
import YearRevenues from "./YearRevenues";

const tabs = ['projects', 'custody', 'expenses', 'year_expenses', 'revenues', 'year_revenues']
const Financial = () => {
    const [selectTab, setSelectTab] = useState('projects')
    const lang = useSelector(state=> state.auth?.lang)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);

    return <>
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

        {selectTab === 'projects' && <Projects />}

        {selectTab === 'custody' && <Assets />}

        {selectTab === 'expenses' && <Expenses />}

        {selectTab === 'year_expenses' && <YearExpenses />}

        {selectTab === 'revenues' && <Revenues />}

        {selectTab === 'year_revenues' && <YearRevenues />}
    </>
}
export default Financial