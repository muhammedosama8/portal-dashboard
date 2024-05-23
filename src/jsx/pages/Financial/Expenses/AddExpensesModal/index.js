import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import ProjectsService from "../../../../../services/ProjectsService";
import { Expenses } from "../../../../Enums/Expenses";
import { useLocation } from "react-router-dom";
import uploadImg from '../../../../../images/upload-img.png';
import Loader from "../../../../common/Loader";
import BaseService from "../../../../../services/BaseService";
import MonthDropDown from "../../../../Enums/MonthDropDown";

const AddExpensesModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(false)
    const projectsService = new ProjectsService()
    const location = useLocation()
    const lang = useSelector(state=> state.auth.lang)
    const [params, setParams] = useState({
        month: ""
    })

    useEffect(()=>{
        if(!!location?.state?.item){
            let item = location.state?.item
        } else {
            let values = Expenses?.map(res=> ({[res.value]: '', img: '', loader: false, label: res.label}))
            setFormData(values)
        }
    }, [])

    const changeParams = (e, name) => {
        setParams({...params, [name]: e})
    }

    const submit = (e) =>{
        e.preventDefault();
        // let data ={ 
        //     item_no: formData?.item_no,
        //     name: formData?.name,
        //     price: formData?.price,
        //     code: formData?.code,
        //     barcode: formData?.barcode,
        //     image: formData?.image
        // }

        // if(isAdd){
        //     projectsService.create(data)?.then(res=>{
        //         if(res && res?.status === 201){
        //             toast.success('Product Added Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setAddModal()
        //         }
        //     })
        // } else {
        //     projectsService.update(formData?.id, data)?.then(res=>{
        //         if(res && res?.status === 200){
        //             toast.success('Product Updated Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setAddModal()
        //         }
        //     })
        // }
    }
    
    const fileHandler = (e, ind) => {
        let files = e.target.files
        const filesData = Object.values(files)

        if (filesData?.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    let update = formData.shareholder_attach?.map((att, index)=>{
                        if(index === ind){
                            return res?.data?.url 
                        } else{
                            return att
                        }
                    })
                    setFormData({...formData, shareholder_attach: [...update]})
                }
            })
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addExpenses" : "ar fade addExpenses"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.edit} {Translate[lang]?.expenses}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setAddModal()
                }}
            >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col md={6} className='mb-4'>
                            <label>{Translate[lang].month}</label>
                            <MonthDropDown
                                params={params} 
                                changeParams={changeParams} 
                            />
                        </Col>
                        <Col md={6}></Col>
                        {formData?.map((data, index)=>{
                            return <>
                            <Col md={6}>
                                <AvField
                                    label={data.label}
                                    type='number'
                                    min={0}
                                    placeholder={Translate[lang]?.cost}
                                    bsSize="lg"
                                    name={`cost${index}`}
                                    value={data[data.label?.toLowerCase().replaceAll(" ",'_')]}
                                    onChange={(e) => {
                                        let update = formData?.map((res,ind)=>{
                                            if(ind === index){
                                                return{
                                                    ...res,
                                                    [data.label?.toLowerCase().replaceAll(" ",'_')]: e.target.value
                                                }
                                            } else {
                                                return res
                                            }
                                        })
                                        setFormData(update)
                                    }}
                                />
                            </Col>
                            <Col md={6}>
                            <div className='form-group w-100'>
                                <div className="image-placeholder">	
                                    <div className="avatar-edit h-100 w-100">
                                        <input type="file" onChange={(e) => fileHandler(e)} id={`imageUpload${index}`} /> 					
                                        {/* <label htmlFor={`imageUpload${index}`}  name=''></label> */}
                                    </div>
                                    <div className="avatar-preview2 m-auto">
                                        <div id={`imagePreview`}>
                                        {!!data?.img && 
                                            <i className="la la-check-circle"></i>}
                                        {!data?.loading && 
                                            <img  
                                                src={uploadImg} alt='icon'
                                                style={{
                                                    width: '50px', height: '50px',
                                                }}
                                            />}
                                            {data.loading && <Loader />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Col>
                            </>
                        })}
                        
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loading}
                >{Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddExpensesModal;