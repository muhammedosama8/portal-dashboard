import { useState } from "react"
import {
    Card,
  } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";
import Projects from "./Projects";

const tabs = ['projects',]
const Financial = () => {
    const [selectTab, setSelectTab] = useState('projects')
    const lang = useSelector(state=> state.auth?.lang)

    return <>
        <Card className="mb-3">
            <Card.Body className="p-0">
                <div className="tabs-div">
                    {tabs?.map((tab,index)=>{
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
                    })}
                </div>
            </Card.Body>
        </Card>

        {selectTab === 'projects' && <Projects />}
    </>
}
export default Financial