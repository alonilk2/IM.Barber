import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useDropzone } from 'react-dropzone'
import Accordion from 'react-bootstrap/Accordion'
import useCategories from '../../Hooks/useCategories'
import { SERVER_ADDRESS } from '../../Constants/generalConstants'
import Axios from 'axios'
import { useState, useCallback } from 'react'
import Alert from 'react-bootstrap/Alert'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import { CircularProgress } from '@mui/material'
import { useHistory } from 'react-router-dom'

export default function CategoryManagement (eKey) {
  const [myFiles, setMyFiles] = useState([])

  const onDrop = useCallback(
    acceptedFiles => {
      setMyFiles([...myFiles, ...acceptedFiles])
    },
    [myFiles]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const [newCategory, setNewCategory] = useState({
    categoryid: '',
    id: null
  })
  const [success, setSuccess] = useState()
  const [edit, setEdit] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const categoryArr = useCategories()

  const removeAll = () => {
    setMyFiles([])
  }

  const triggerSuccess = async () => {
    setSuccess(true)
    await new Promise(r => setTimeout(r, 7000))
    setSuccess(false)
  }
  const files = myFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ))

  const handleAddCategory = async e => {
    e.preventDefault()
    setLoading(true)
    const fdata = new FormData()
    fdata.append('id', newCategory.id)
    fdata.append('categoryid', newCategory.categoryid.trim())
    fdata.append('image', myFiles[0])
    fdata.append('imgname', myFiles[0]?.name)
    let result
    if (edit) {
      result = await Axios.post(
        SERVER_ADDRESS + '/category/updatecategory',
        fdata
      )
    } else {
      result = await Axios.post(SERVER_ADDRESS + '/category/addcategory', fdata)
    }
    if (result && result.data.success) {
      triggerSuccess()
    }
    setLoading(false)
  }

  const handleDeleteCategory = async (e, categoryid) => {
    e.preventDefault()
    let result = await Axios.post(SERVER_ADDRESS + '/category/removecategory', {
      categoryid: categoryid
    })
    if (result && result.data.success) {
      triggerSuccess()
    }
  }

  const handleEditCategory = async (e, category) => {
    e.preventDefault()
    removeAll()
    setNewCategory({
      categoryid: category.categoryid,
      id: category.id
    })
    setEdit(category)
  }

  const mapper = () => {
    let counter = 0
    if (categoryArr) {
      return categoryArr.map((cat, idx) => {
        counter++
        return (
          <tr key={idx}>
            <td>{counter}</td>
            <td>{cat.categoryid}</td>
            <td>
              <button
                type='button'
                class='upbtn'
                style={{ width: '80px', height: '28px' }}
                onClick={e => handleEditCategory(e, cat)}
              >
                עריכה
              </button>
            </td>
            <td>
              <button
                type='button'
                class='upbtn'
                style={{ backgroundColor: 'red', height: '28px' }}
                onClick={e => handleDeleteCategory(e, cat.categoryid)}
              >
                הסר
              </button>
            </td>
          </tr>
        )
      })
    } else return null
  }
  const successAlert = () => {
    return (
      <Zoom>
        <Alert variant='success' style={{ position: 'absolute' }}>
          <Alert.Heading>הפעולה בוצעה בהצלחה !</Alert.Heading>
        </Alert>
      </Zoom>
    )
  }
  return (
    <Accordion.Item eventKey={eKey}>
      <Accordion.Header>ניהול קטגוריות</Accordion.Header>

      <Accordion.Body style={{ display: 'flex', flexDirection: 'row' }}>
        <div className='row'>
          {' '}
          {success ? successAlert() : null}
          <div className='col add-barber'>
            <Fade left spy={edit} duration={400}>
              <h5 className='sub-title'>הוספת קטגוריה</h5>

              <Form.Control
                type='text'
                placeholder='שם הקטגוריה'
                value={newCategory.categoryid}
                onChange={e =>
                  setNewCategory({
                    ...newCategory,
                    categoryid: e.target.value
                  })
                }
              />
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop JPG\PNG images only</p>
              </div>
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
              <div className='row add-category-btn'>
                <div
                  className='rightcol'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {loading && <CircularProgress />}
                  <button
                    type='button'
                    class='upbtn'
                    style={{ width: '200px', height: '50px', padding: '1%' }}
                    onClick={handleAddCategory}
                  >
                    {edit ? 'עדכן קטגוריה' : 'העלה קטגוריה'}
                  </button>
                  {edit && (
                    <button
                      class='upbtn'
                      style={{
                        backgroundColor: 'grey',
                        width: '200px',
                        height: '50px',
                        padding: '1%'
                      }}
                      onClick={() => {
                        setEdit(null)
                        setNewCategory({ categoryid: '', id: null })
                        removeAll()
                      }}
                    >
                      ביטול
                    </button>
                  )}
                </div>
              </div>
            </Fade>
          </div>
          <div
            className='col delete-category-row'
            style={{ height: '500px', overflowY: 'scroll' }}
          >
            <h5 className='sub-title'>הסרת קטגוריה</h5>

            <div className='rightcol'>
              <Table striped bordered hover size='sm'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>שם קטגוריה</th>
                    <th>עריכה</th>
                    <th>הסרה</th>
                  </tr>
                </thead>
                <tbody>{mapper()}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}
