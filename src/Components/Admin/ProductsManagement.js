import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Zoom from 'react-reveal/Zoom'
import useProducts from '../../Hooks/useProducts'
import useCategories from '../../Hooks/useCategories'
import Fade from 'react-reveal/Fade'
import Select from 'react-select'
import { CircularProgress } from '@mui/material'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function ProductsManagement (eKey) {
  const [imageArr, setimageArr] = useState([])
  const [newProduct, setNewProduct] = useState({
    categoryid: '',
    id: '',
    producttitle: '',
    brand: '',
    price: '',
    description: ''
  })
  const [success, setSuccess] = useState(false)
  const [edit, setEdit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ProductList, uploadProduct, removeProduct] = useProducts({allProducts: true})
  const categoryArr = useCategories()
  let options = []

  const onDrop = useCallback(
    acceptedFiles => {
      setimageArr([...imageArr, ...acceptedFiles])
    },
    [imageArr]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const removeAll = () => {
    setimageArr([])
  }

  const removeFile = idx => {
    let fileArr = [...imageArr]
    fileArr.splice(idx, 1)
    setimageArr(fileArr)
  }

  const triggerSuccess = async () => {
    setSuccess(true)
    await new Promise(r => setTimeout(r, 7000))
    setSuccess(false)
  }

  const handleUpload = async e => {
    e.preventDefault()
    setLoading(true)
    let result
    try {
      result = await uploadProduct(newProduct, edit, imageArr)
    } catch (error) {
      alert('אירעה שגיאה, אנא נסה שנית')
    }
    if (result?.data?.success) triggerSuccess()
    setLoading(false)
  }

  const handleDeleteProduct = async (e, product) => {
    e.preventDefault()
    let result
    try {
      result = await removeProduct(product)
    } catch (error) {
      alert('אירעה שגיאה, אנא נסה שנית')
    }
    if (result?.data?.success) triggerSuccess()
  }

  const handleEditProduct = async (e, product) => {
    e.preventDefault()
    removeAll()
    setNewProduct({
      ...newProduct,
      id: product.id,
      producttitle: product.producttitle,
      brand: product.brand,
      price: product.price,
      description: product.description,
      instock: product.inStock,
      categoryid: { value: product.categoryid, label: product.categoryid }
    })
    setEdit(product)
  }
  
  const files = imageArr.map((file, idx) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes{' '}
      <span>
        <button
          onClick={() => removeFile(idx)}
          style={{ color: '#a30000', fontWeight: '600', margin: '0.2%' }}
        >
          מחיקה
        </button>
      </span>
    </li>
  ))

  const productsMapper = () => {
    let counter = 0
    if (ProductList) {
      return ProductList.map((prod, idx) => {
        counter++
        return (
          <tr key={idx}>
            <td>{counter}</td>
            <td>{prod.producttitle}</td>
            <td>{prod.brand}</td>
            <td>
              <button
                type='button'
                className='upbtn'
                style={{ width: '80px', height: '28px' }}
                onClick={e => handleEditProduct(e, prod)}
              >
                עריכה
              </button>
            </td>
            <td>
              <button
                type='button'
                className='upbtn'
                style={{ backgroundColor: 'red', height: '28px' }}
                onClick={e => handleDeleteProduct(e, prod)}
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
        <Alert variant='success'>
          <Alert.Heading>הפעולה בוצעה בהצלחה !</Alert.Heading>
        </Alert>
      </Zoom>
    )
  }

  function RemoveProduct () {
    return (
      <div
        className='col delete-category-row'
        style={{ height: '500px', overflowY: 'scroll' }}
      >
        <>
          <h5 className='sub-title'>עריכת\הסרת מוצר</h5>

          <div className='rightcol'>
            <Table striped bordered hover size='sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>שם המוצר</th>
                  <th>יצרן</th>
                  <th>עריכה</th>
                  <th>הסרה</th>
                </tr>
              </thead>
              <tbody>{productsMapper()}</tbody>
            </Table>
          </div>
        </>
      </div>
    )
  }

  useEffect(() => {
    if (categoryArr) {
      categoryArr.forEach(cat => {
        options.push({ value: cat.categoryid, label: cat.categoryid })
      })
    }
  }, [categoryArr, options])

  const stockSelect = () => {
    if (newProduct.instock === true) return { value: true, label: 'במלאי' }
    else if (newProduct.instock === false)
      return { value: false, label: 'לא במלאי' }
    else return newProduct.instock
  }

  return (
    <Accordion.Item eventKey={eKey}>
      <Accordion.Header>ניהול מוצרים</Accordion.Header>
      <Accordion.Body>
        <div className='row'>
          {success ? successAlert() : null}

          <div className='col add-barber'>
            <Fade left spy={edit} duration={400}>
              {!edit ? (
                <h5 className='sub-title'>הוספת מוצר חדש</h5>
              ) : (
                <h5 className='sub-title'>עריכת פרטי מוצר</h5>
              )}
              <input
                type='text'
                value={newProduct.producttitle}
                className='input-admin'
                placeholder='שם המוצר'
                onChange={e =>
                  setNewProduct({
                    ...newProduct,
                    producttitle: e.target.value
                  })
                }
              />

              <input
                type='text'
                placeholder='שם היצרן'
                className='input-admin'
                value={newProduct.brand}
                onChange={e =>
                  setNewProduct({ ...newProduct, brand: e.target.value })
                }
              />
              <Select
                name='categories'
                className='categories-select input-admin'
                value={newProduct.categoryid}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                placeholder='בחירת קטגוריה:'
                options={options}
                defaultValue={options[0]}
                onChange={e => {
                  setNewProduct({ ...newProduct, categoryid: e })
                }}
              />

              <input
                type='text'
                placeholder='מחיר'
                className='input-admin'
                value={newProduct.price}
                onChange={e =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />

              <Select
                name='stock'
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                className='categories-select input-admin'
                value={stockSelect()}
                placeholder='מצב המלאי:'
                options={[
                  { value: true, label: 'במלאי' },
                  { value: false, label: 'לא במלאי' }
                ]}
                defaultValue={{ value: true, label: 'במלאי' }}
                onChange={e => {
                  setNewProduct({ ...newProduct, instock: e })
                }}
              />

              <Form.Control
                as='textarea'
                className='input-admin'
                style={{ height: '200px', zIndex: 0 }}
                rows={3}
                placeholder='תיאור המוצר'
                width={50}
                value={newProduct.description}
                onChange={e =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value
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
              <div className='row'>
                <div className='col-4 rightcol'>
                  {loading && <CircularProgress />}
                  <button type='button' class='upbtn' onClick={handleUpload}>
                    {edit ? 'עדכן מוצר' : 'העלה מוצר'}
                  </button>
                  {edit && (
                    <button
                      className='upbtn'
                      style={{ backgroundColor: 'grey' }}
                      onClick={() => {
                        setEdit(null)
                        setNewProduct({
                          categoryid: '',
                          id: '',
                          producttitle: '',
                          brand: '',
                          price: '',
                          description: ''
                        })
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

          {RemoveProduct()}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}
