import React from "react";
import AdminOperationPanel from "../../../shared/DialogBox/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { post } from "../../../core/services/department.service";

const trans = "departmentsEdite";

const DepartmentEdit = (props) => {
  const { open, onClose, onSave } = props;
  const { information } = props;
  const { t: translate } = useTranslation("departeman");

  const validationSchema = yup.object({
    departmentName: yup.string(),
    departmentStatus: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      departmentName: information.name,
      departmentStatus: information.status,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        gateWayName: values.departmentStatus,
      };
      post(`api/settings`, data)
      
        .then((data) => {
          onSave(data);
          onClose();
          // alert( translate(`${trans}.updatedOperations`));
        })
        .catch((err) => {
          alert( translate(`${trans}.serverError`));
        });
    },
  });

  const ShowInSliderArrt = {
    id: "departmentStatus",
    name: "departmentStatus",
    label: translate(`${trans}.departmentStatus`),
    value: formik.values.selected,
    onChange: formik.handleChange("departmentStatus"),
    helperText:
      formik.touched.departmentStatus && formik.errors.departmentStatus,
    error:
      formik.touched.departmentStatus &&
      Boolean(formik.errors.departmentStatus),
  };

  const Slider = [
    {
      value: "rangine",
      label: "rangine",
    },
    {
      value: "ghasedak",
      label: "ghasedak",
    },
  ];
  
  return (
    <AdminOperationPanel
      open={open}
      onClose={onClose}
      size="xs"
      title={translate(`${trans}.dialogTitle`)}
      saveText={translate(`${trans}.saveText`)}
      closeText={translate(`${trans}.closeText`)}
      onSave={formik.handleSubmit}
    >
      <Box>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid item sm={12}>
           
            <FormControl sx={{ minWidth: "100%", margin: " 10px 0" }}>
              <InputLabel>
                {translate(`${trans}.condition`)}
              </InputLabel>
              <Select
                defaultValue={information.status}
                fullWidth
                {...ShowInSliderArrt}
                select
              >
                {Slider.map((option ,i) => (
                  <MenuItem key={i} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Box>
      </Box>
    </AdminOperationPanel>
  );
};

export default DepartmentEdit;
