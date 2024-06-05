import React ,{useEffect, useState} from 'react'
import { Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Translate } from '../../../Enums/Tranlate';
import { AvField, AvForm } from 'availity-reactstrap-validation';

function DeleteModal(props) {
    const date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    const [deleteDate, setDeleteDate] = useState('')
    const [loading, setLoading] = useState(false)
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=>{
        if(props.type === 'edit_delete_date'){
            setDeleteDate(props.deletedItem?.delete_date.split('T')[0])
        }
    },[props])

    const handleDeletedItem = async () => {
        setLoading(true)
        if(props.type === 'delete'){
            const { data: response } = await props.modelService.remove(props.deletedItem.id , { delete_date: deleteDate })
            if(response?.status === 200){
                props.setShouldUpdate(prev=> !prev)
                toast.success(`${Translate[lang].deleted} ${Translate[lang].successfully}`)
                setLoading(false)
                return props.onCloseModal(false)
            }
        } else {
            const { data: response } = await props.modelService.updateDeleteDate(props.deletedItem.id , { delete_date: deleteDate })
            if(response?.status === 200){
                props.setShouldUpdate(prev=> !prev)
                toast.success(`${Translate[lang].updated_successfully}`)
                setLoading(false)
                return props.onCloseModal(false)
            }
        }
    }

    return (
        <Modal show={props.open}  onHide={()=> props.onCloseModal(false)} className={`${lang}`}>
            <div className="modal-header border-0">
                {props.type === 'delete' ? <h5 className="modal-title mt-0" id="myModalLabel">
                    <i className='la la-trash text-danger' style={{fontSize: '20px'}}></i> {Translate[lang].delete} {props.titleMsg}
                </h5> :
                <h5 className="modal-title mt-0" id="myModalLabel">
                    <i className='la la-edit' style={{fontSize: '20px'}}></i> {Translate[lang].edit} {Translate[lang].delete_date}
                </h5>}
                <button
                    type="button"
                    onClick={() => props.onCloseModal(false)}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <AvForm onValidSubmit={handleDeletedItem}>
            <div className="modal-body border-0">
                {props.type === 'delete' && <p>
                    {Translate[lang].delete_message}
                </p>}
                <Row>
                    <Col md={6}>
                        <AvField
                            label ={`${Translate[lang]?.delete_date}`}
                            name ='date'
                            type='date'
                            value={deleteDate}
                            // min={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`}
                            max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${date.getDate()}`}
                            validate={{
                                required: {
                                    value:true,
                                    errorMessage: Translate[lang].field_required
                                },
                            }}
                            onChange={(e)=> setDeleteDate(e.target.value)}
                        />
                    </Col>
                </Row>
            </div>
            <div className="modal-footer border-0">
                <button
                    type="button"
                    onClick={() => props.onCloseModal(false)}
                    className="btn me-auto btn-secondary waves-effect waves-light"
                    data-dismiss="modal"
                >
                    {Translate[lang].cancel}
                </button>
                <button
                    type="submit"
                    className={`btn ${props.type === 'delete' ? 'btn-danger' : 'btn-warning' } waves-effect`}
                    disabled={loading ? true : false}

                >
                    {props.type === 'delete' ? Translate[lang].delete : Translate[lang].edit}
            </button>
            </div>
            </AvForm>
        </Modal>
    )
}

DeleteModal.propTypes = {
    open: PropTypes.bool,
    onCloseModal: PropTypes.func,
    handleTableChange: PropTypes.func,
    deletedItem: PropTypes.object,
    modelService: PropTypes.object,
    titleMsg: PropTypes.string
};

export default DeleteModal
