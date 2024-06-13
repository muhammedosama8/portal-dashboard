import { useSelector } from "react-redux";
import { Translate } from "./Tranlate";
import Select from "react-select";
import { useEffect, useState } from "react";

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MonthDropDown = ({params, changeParams}) => {
    const [monthOptions, setMonthOptions] = useState([])
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        const remainingMonths = months?.map(res=>{
            return{
                label: Translate[lang][res.toLocaleLowerCase()],
                value: res
            }
        });
        setMonthOptions([...remainingMonths])
    },[lang])

    return <div style={{textAlign: "left"}}>
        <label>{Translate[lang].month}</label>
        <Select
            placeholder={Translate[lang]?.select}
            options={monthOptions}
            value={params?.month}
            onChange={(e) => changeParams(e, 'month')}
        />
    </div>
}
export default MonthDropDown;