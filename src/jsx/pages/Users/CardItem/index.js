import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserService from "../../../../services/UserService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";

const CardItem = ({item, index,setShouldUpdate}) =>{
  const [deleteModal, setDeleteModal] = useState(false)
    const lange = useSelector((state) => state.auth?.lang);
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
    const userService = new UserService()
    
    return(
        <tr key={index} className='text-center'>
                    <td>
                      <strong>{item.id}</strong>
                    </td>
                    <td>
                      {item.username}
                    </td>
                    <td>
                      {item.email || '-'}
                    </td>
                    <td>
                      {item?.country_code} {item?.phone}
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`custom-switch${index}`}
                        checked={item.isVerified}
                      />
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`isDeleted${index}`}
                        checked={item.isDeleted}
                      />
                    </td>
                    <td>
                     {isExist('delete_users') && <Dropdown>
                        <Dropdown.Toggle
                          className="light sharp i-false"
                        >
                          <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lange].delete}</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>}
                    </td>
                    {deleteModal && (
                      <DeleteModal
                        open={deleteModal}
                        titleMsg={item?.username}
                        deletedItem={item}
                        modelService={userService}
                        setShouldUpdate={setShouldUpdate}
                        onCloseModal={setDeleteModal}
                      />
                    )}
                  </tr>
    )
}
export default CardItem;