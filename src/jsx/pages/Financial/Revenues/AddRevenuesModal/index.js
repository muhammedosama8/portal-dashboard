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

const AddRevenuesModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState([
        {name: '', cost: "", img: ''}
    ])
    const [loading, setLoading] = useState(false)
    const [isAdd, setIsAdd] = useState(true)
    const projectsService = new ProjectsService()
    const location = useLocation()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=>{
        if(!!location?.state?.item){
            let item = location.state?.item
            setIsAdd(false)
        }
    }, [])

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
        <Modal className={lang === 'en' ? "en fade addRevenues" : "ar fade addRevenues"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.revenues}</Modal.Title>
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
                        {formData?.map((data, index)=>{
                            return <>
                            <Col md={4}>
                                <AvField
                                    label={Translate[lang].name}
                                    type='text'
                                    placeholder={Translate[lang]?.name}
                                    bsSize="lg"
                                    name={`name${index}`}
                                    value={data.name}
                                    onChange={(e) => {
                                        let update = formData?.map((res,ind)=>{
                                            if(ind === index){
                                                return{
                                                    ...res,
                                                    name: e.target.value
                                                }
                                            } else {
                                                return res
                                            }
                                        })
                                        setFormData(update)
                                    }}
                                />
                            </Col>
                            <Col md={4}>
                                <AvField
                                    label={Translate[lang].cost}
                                    type='number'
                                    min={0}
                                    placeholder={Translate[lang]?.cost}
                                    bsSize="lg"
                                    name={`cost${index}`}
                                    value={data.cost}
                                    onChange={(e) => {
                                        let update = formData?.map((res,ind)=>{
                                            if(ind === index){
                                                return{
                                                    ...res,
                                                    cost: e.target.value
                                                }
                                            } else {
                                                return res
                                            }
                                        })
                                        setFormData(update)
                                    }}
                                />
                            </Col>
                            <Col md={4}>
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
                        <Col md={12}>
                            <Button 
                                variant="secondary"
                                onClick={()=> setFormData([...formData, {name: '', cost: "", img: ''}])}
                            >{Translate[lang].add_new_value}</Button>
                        </Col>
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
                >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddRevenuesModal;