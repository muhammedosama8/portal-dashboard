import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import AssetsService from "../../../../services/AssetsService";
import { Translate } from "../../../Enums/Tranlate";

const AddAssetsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        serial_number: '',
        items: [""]
    })
    const [type, setType] = useState('with_serial')
    const [isAdd, setIsAdd] = useState(false)
    const [assetsOptions, setAssetsOptions] = useState([])
    const [departmentOptions, setDepartmentOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const assetsService = new AssetsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                name: item?.name,
                department: item.department,
                price: item?.price,
                cost: item?.cost,
                works_day: item?.works_day,
                maintaince: item?.maintaince
            })
        }
    },[item])

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

    return(
        <Modal 
            className={lang === 'en' ? "en fade addAssets" : "ar fade addAssets"} 
            style={{
                textAlign: lang === 'en' ? 'left' : 'right',
            }} 
            show={addModal} 
            onHide={()=>{
                setAddModal()
            }}
        >
            <AvForm className='form-horizontal' onValidSubmit={submit}>
                <Modal.Header>
                    <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.assets}</Modal.Title>
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
                    <label>{Translate[lang].assets}:</label>
                    <Row>
                        <Col md={4} sm={12}>
                            <Form.Check
                                inline
                                className="mb-1"
                                label={`${Translate[lang].with} ${Translate[lang].serial_number}`}
                                value="with_serial"
                                name="group1"
                                checked={type === 'with_serial'}
                                type='radio'
                                id={`with_serial`}
                                onChange={e=> setType(e.target.value)}
                            />
                        </Col>
                        <Col md={3} sm={12}>
                            <Form.Check
                                inline
                                className="mb-1"
                                label={`${Translate[lang].with} ${Translate[lang].items}`}
                                value="with_items"
                                name="group1"
                                type='radio'
                                id={`inline-radio-2`}
                                onChange={e=> setType(e.target.value)}
                            />
                        </Col>
                        <Col md={5} sm={12}>
                            <Form.Check
                                inline
                                className="mb-1"
                                label={`${Translate[lang].with} ${Translate[lang].serial_number} ${Translate[lang].and} ${Translate[lang].items}`}
                                value="with_serial_and_items"
                                name="group1"
                                type='radio'
                                id={`inline-radio-3`}
                                onChange={e=> setType(e.target.value)}
                            />
                        </Col>
                        <Col md={12} sm={12}>
                            <hr />
                        </Col>
                        <Col md={6} sm={12}>
                            <AvField
                                label={Translate[lang]?.name}
                                type='text'
                                placeholder={Translate[lang]?.name}
                                bsSize="lg"
                                name='name'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </Col>
                        {type !== 'with_items' && <Col md={6} sm={12}>
                                <AvField
                                    label={`${Translate[lang]?.serial_number}`}
                                    type='text'
                                    placeholder={Translate[lang]?.serial_number}
                                    bsSize="lg"
                                    name='serial_number'
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: Translate[lang].field_required
                                        }
                                    }}
                                    value={formData.serial_number}
                                    onChange={(e) => {
                                        setFormData({...formData, serial_number: e.target.value})
                                    }}
                                />
                            </Col>}
                        {type !== 'with_serial' && <>
                            {formData?.items?.map((item, index)=> {
                                return <Col md={6} sm={12} key={index}>
                                <AvField
                                    label={`${Translate[lang]?.item} ${index+1}`}
                                    type='text'
                                    placeholder={Translate[lang]?.item}
                                    bsSize="lg"
                                    name={`item${index}`}
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: Translate[lang].field_required
                                        }
                                    }}
                                    value={item}
                                    onChange={(e) => {
                                        let update = formData.items?.map((res,ind)=>{
                                            if(index === ind){
                                                return e.target.value
                                            } else {
                                                return res
                                            }
                                        })
                                        setFormData({...formData, items: update})
                                    }}
                                />
                                </Col>
                            })}
                            <Col md={12} sm={12} className='d-flex mt-3 align-items-center'>
                                <Button variant='secondary' type="button"
                                    onClick={()=> setFormData({...formData, items: [...formData.items, ""]})}>
                                    {Translate[lang].add} {Translate[lang].item}
                                </Button>
                            </Col>
                        </>}
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

export default AddAssetsModal;