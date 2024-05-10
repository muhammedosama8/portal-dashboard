import { useSelector } from "react-redux";
import { Translate } from "./Tranlate";
import Select from "react-select";
import { useEffect, useState } from "react";

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MonthDropDown = ({params, changeParams}) => {
    const [monthOptions, setMonthOptions] = useState([])
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        // const today = new Date();
        // const currentMonth = today.getMonth();
        const remainingMonths = months?.map(res=>{
            return{
                label: Translate[lang][res.toLocaleLowerCase()],
                value: res.toLocaleLowerCase()
            }
        });
        //.slice(currentMonth)
        setMonthOptions([...remainingMonths])
    },[lang])

    return <Select
        placeholder={Translate[lang]?.select}
        options={monthOptions}
        value={params?.month}
        onChange={(e) => changeParams(e, 'month')}
    />
}
export default MonthDropDown;