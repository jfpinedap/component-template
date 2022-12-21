import React, { useEffect, ReactElement } from "react"
import {
  withStreamlitConnection,
  Streamlit,
  ComponentProps,
} from "streamlit-component-lib"
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'

import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import MenuItem from '@material-ui/core/MenuItem'

import CustomSelect from "./CustomSelect"
import styles from './styles.css'

const languageOptions = [
  {
    label: "Chinese",
    value: "zh-CN"
  },
  {
    label: "English (US)",
    value: "en-US"
  },
  {
    label: "English (GB)",
    value: "en-GB"
  },
  {
    label: "French",
    value: "fr-FR"
  },
  {
    label: "Spanish",
    value: "es-ES"
  }
];

function onKeyDown(keyEvent: React.KeyboardEvent<HTMLFormElement>) {
  if (keyEvent.key === "Enter") {
    keyEvent.preventDefault();
  }
}

function Component({ args }: ComponentProps): ReactElement {
  const { title, in_ranges } = args
  var ranges = [
    {
      value: 'none',
      label: 'None',
    },
  ]
  ranges = in_ranges

  const initialValues = {
    username: '',
    password: '',
    select: "",
  }
  const validationSchema = Yup.object({
    username: Yup.string().email().required(),
    password: Yup.string().required(),
    select: Yup.string().required(),
  })

  useEffect(() => {
    Streamlit.setFrameHeight()
  })

  const onSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values)
    setSubmitting(false)
    Streamlit.setComponentValue(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, isSubmitting }: any) => (
        <Form className={styles.loginForm} onKeyDown={onKeyDown}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>

              <Field
                name="username"
                placeholder="username@domain.com"
                as={TextField}
                fullWidth
                margin="dense"
                error={Boolean(errors.username)}
                helperText={errors.username}
              />

              <Field
                type="password"
                name="password"
                placeholder="your password"
                as={TextField}
                fullWidth
                margin="dense"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />

              <Field
                type="text"
                name="select"
                label="Age"
                select
                helperText="Please choose 21-50"
                margin="dense"
                as={TextField}
                fullWidth
              >
                {ranges.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>

              <Field
                type="text"
                className="custom-select"
                name="multiLanguages"
                options={languageOptions}
                component={CustomSelect}
                placeholder="Select multi languages..."
                isMulti={true}
                as={TextField}
              />

            </CardContent>

            <CardActions>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Create Table
              </Button>
              <Button type="reset" color="secondary">
                Clean
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  )
}

export default withStreamlitConnection(Component)
