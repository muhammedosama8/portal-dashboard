import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import ProjectsService from "../../../../services/ProjectsService";
import { Translate } from "../../../Enums/Tranlate";

import BaseService from "../../../../services/BaseService";

const PaymentModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const paymentOptions = [
        {label: 'One Payment', value: 'one_payment', num: 1},
        {label: 'Two Payment', value: 'two_payment', num: 2},
        {label: 'Three Payment', value: 'three_payment', num: 3},
        {label: 'Four Payment', value: 'four_payment', num: 4},
    ]
    const [formData, setFormData] = useState({
        payment: '',
        status: []
    })
    const [loading, setLoading] = useState(false)
    const [change, setChange] = useState(false)
    const projectsService = new ProjectsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        setFormData({
            id: item?.id,
            payment: item?.payment,
        })
    },[item])

    useEffect(() => {
        if(formData.payment?.num){
            let status = Array.from(
                { length: formData.payment?.num },
                (_, index) => index + 1
            )?.map(_=>{
                return{
                    status: false
                }
            })
            console.log(status)
            setFormData({
                payment: formData?.payment,
                status: status
            })
        }
    },[change])

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

        //     projectsService.update(formData?.id, data)?.then(res=>{
        //         if(res && res?.status === 200){
        //             toast.success('Product Updated Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setAddModal()
        //         }
        //     })
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.payment}</Modal.Title>
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
                        <Col md={6} className='mb-5'>
                            <label className="text-label">
                                {Translate[lang].payment}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={paymentOptions}
                                value={formData.payment}
                                onChange={(e) => {
                                    setFormData({...formData, payment: e});
                                    setChange(prev=> !prev)
                                }}
                            />
                        </Col>
                        <Col md={6}></Col>
                        {formData?.status?.map((stat, ind) => {
                            return  <Col md={6}>
                                <Form.Check
                                    key={ind}
                                    className="mb-3"
                                    label={`${Translate[lang].payment} ${ind+1}`}
                                    value={stat}
                                    name={`stat${ind}`}
                                    checked={stat}
                                    type="switch"
                                    id={`custom-switch${ind}`}
                                    onChange={e=> {

                                    }}
                                />
                            </Col>
                        })}
                        {/*  */}
                        
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
                >{Translate[lang]?.submit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default PaymentModal;