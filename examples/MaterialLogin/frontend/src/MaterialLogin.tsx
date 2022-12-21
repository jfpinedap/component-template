import React, { useEffect, ReactElement } from "react"
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import {
  withStreamlitConnection,
  Streamlit,
  ComponentProps,
} from "streamlit-component-lib"
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'

import styles from './style.module.css'


function onKeyDown(keyEvent: React.KeyboardEvent<HTMLFormElement>) {
  if (keyEvent.key === "Enter") {
    keyEvent.preventDefault();
  }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function LoginComponent({ args }: ComponentProps): ReactElement {
  const { title, in_ranges, in_checked, in_mult_selection, in_selection, in_number } = args
  const [inputNumber, setNumber] = React.useState(+in_number);
  const [singleSelection, setSingleSel] = React.useState(in_selection);
  const [multipleSelection, setMultipleSel] = React.useState<string[]>(in_mult_selection);
  const [checked, setChecked] = React.useState(in_checked);
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
    input_number: 0,
    single_select: "",
    multiple_select: [],
    checkbox: false
  }
  const validationSchema = Yup.object({
    username: Yup.string().email(),
    password: Yup.string(),
    input_number: Yup.number()
  })

  useEffect(() => {
    Streamlit.setFrameHeight()
  })

  const textHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNumber(+value);
  };

  const singleHandleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setSingleSel(value);
  };

  const multipleHandleChange = (event: SelectChangeEvent<typeof multipleSelection>) => {
    const {
      target: { value },
    } = event;
    setMultipleSel(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(false)
    values.input_number = inputNumber
    values.single_select = singleSelection
    values.multiple_select = multipleSelection
    values.checkbox = checked
    Streamlit.setComponentValue(values)
  }

  const clearForm = () => {
    setNumber(0.0);
    setSingleSel("");
    setMultipleSel([])
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
                margin="normal"
                error={Boolean(errors.username)}
                helperText={errors.username}
              />

              <Field
                type="password"
                name="password"
                placeholder="your password"
                as={TextField}
                fullWidth
                margin="normal"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />

              <TextField
                label="Number"
                id="filled-number"
                type="number"
                value={inputNumber}
                onChange={textHandleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="select-multiple-chip">singleSelect</InputLabel>
                <Select
                  label="single-label"
                  id="single-selection"
                  value={singleSelection}
                  onChange={singleHandleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="singleSelect" />}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  {ranges.map(option => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="select-multiple-chip">MultiSelect</InputLabel>
                <Select
                  label="multiple-label"
                  id="multiple-chip"
                  multiple
                  value={multipleSelection}
                  onChange={multipleHandleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="MultiSelect" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  {ranges.map(option => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              } label="Checkbox label" />

            </CardContent>

            <CardActions>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Create Table
              </Button>
              <Button type="reset" color="secondary" onClick={clearForm}>
                Clean
              </Button>
            </CardActions>
          </Card>
        </Form>
      )
      }
    </Formik >
  )
}

export default withStreamlitConnection(LoginComponent)
