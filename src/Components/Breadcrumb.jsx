import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export default function Breadcrumb (props) {
  const Pages = props.PageArr.map((page, idx) => {
    return (
      <Link underline='hover' color='text.primary' key={idx} href={page.url}>
        {page.name}
      </Link>
    )
  })
  return <Breadcrumbs aria-label='breadcrumb' sx={props.sx}>{Pages}</Breadcrumbs>
}
