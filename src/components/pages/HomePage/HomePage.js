import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
// import update from "react-addons-update";
import update from "immutability-helper";
import clsx from "clsx";
import { Typography, Grid, Paper, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, FieldArray } from "formik";
import { red, green, purple } from "@material-ui/core/colors/";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";
import moment from "moment";
import NumberFormat from "react-number-format";
import * as wodetailActions from "./../../../actions/wodetail.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 60,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  margin: {
    marginTop: "0.4rem",
    marginRight: "0.4rem",
    margin: theme.spacing(0.3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  row: {
    borderLeft: 1,
    borderRight: 1,
    borderBottom: 1,
    borderTop: 1,
    borderColor: "#E0E0E0",
    borderStyle: "solid",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wodetailReducer = useSelector(({ wodetailReducer }) => wodetailReducer);
  const initialStateWODetail = {
    PJSPOS: "",
    PJTX40: "",
    M7RVAL: "",
  };
  const [wodetail, setWoDetail] = useState([]);

  useEffect(() => {
    dispatch(wodetailActions.getWODetails());
    // setWoDetail(data);
  }, []);

  useEffect(() => {
    // const wodetails = wodetailReducer.result ? wodetailReducer.result : [];
    // console.log("wodetails: " + wodetails);
    // setWoDetail(wodetails);
    setWoDetail(wodetailReducer.result ? wodetailReducer.result : []);
  }, [wodetailReducer]);

  useEffect(() => {
    console.log(wodetail);
  }, [wodetail]);

  const handlePMRadioChange = (index, values) => {
    // console.log("index: " + index + " values: " + values);
    // const updatepm = update(wodetail[index], {
    //   $merge: { M7RVAL: values },
    // });
    const updatevalue = update(wodetail[index], {
      M7RVAL: { $set: values },
    });

    setWoDetail(update(wodetail, { [index]: { $set: updatevalue } }));
    console.log(updatevalue);
  };

  const handlePMTextChange = (index, values) => {
    // console.log("index: " + index + " values: " + values);
    // const updatepm = update(wodetail[index], {
    //   $merge: { M7RVAL: values },
    // });
    const updatevalue = update(wodetail[index], {
      M7RVAL: { $set: values },
    });

    setWoDetail(update(wodetail, { [index]: { $set: updatevalue } }));
    console.log(updatevalue);
  };

  const radioForm = ({ index, values }) => {
    return (
      <div>
        {console.log("radio index: " + index + " values: " + values)}
        <Radio
          // checked={selectedValue === "a"}
          // onChange={handleChange}
          id={`vRadioYes${index}`}
          color="primary"
          value={values}
          values={`value.vRadioYes${index}`}
          inputProps={{ "aria-label": "A" }}
          label="Yes"
          onChange={(event) => {
            // console.log(event.target.value);
            handlePMRadioChange(index, "YES");
            // const updatevalue = update(wodetail[id], {
            //   M7RVAL: { $set: "555" },
            // });
            // setWoDetail(update(wodetail, { [id]: { $set: updatevalue } }));
            // console.log(updatevalue);
          }}
        />
        <Radio
          // checked={selectedValue === "a"}
          // onChange={handleChange}
          id={`vRadioNo${index}`}
          color="secondary"
          value={values}
          values={`value.vRadioNo${index}`}
          inputProps={{ "aria-label": "A" }}
          label="No"
          onChange={(event) => {
            // console.log(event.target.value);
            handlePMRadioChange(index, "NO");
          }}
        />
      </div>
    );
  };

  const textForm = ({ index, values }) => {
    return (
      <div>
        {console.log("text index: " + index + " values: " + values)}
        <TextField
          className={classes.margin}
          size="small"
          id={`vText${index}`}
          required
          // label="CAP No"
          placeholder="Input Value."
          variant="outlined"
          value={values}
          values={`values.vText${index}`}
          onChange={(event) => {
            // console.log(event.target.value);
            handlePMTextChange(index, event.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        ></TextField>
      </div>
    );
  };

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        {wodetail.map((item, index) => (
          <Grid key={item.PJSPOS} container spacing={3}>
            {/* {console.log(item)} */}
            <Grid item xs={12}>
              <Card>
                <h3>
                  {item.PJSPOS} {".) "} {item.PJTX40}
                </h3>
                <h4>{"Std. " + item.STD}</h4>
                <h6>{item.M7RVAL}</h6>
                {item.PJRSIY === "VISUAL"
                  ? radioForm({ index: index, values: item.M7RVAL })
                  : textForm({ index: index, values: item.M7RVAL })}
              </Card>
            </Grid>
          </Grid>
        ))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // disabled={isSubmitting}
        >
          Save
        </Button>
      </form>
    );
  };

  const showForm_bac = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username (M3-Add on)"
          placeholder="Username (M3-Add on)"
          onChange={handleSubmit}
          value={values.username}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          className={classes.submit}
        >
          Sign In
        </Button>
        {/* {isSubmitting && <CircularProgress style={{ marginTop: 10 }} />} */}

        <Grid container justify="flex-end">
          <a
            href="http://192.200.9.106:8080/UserRequest/?page=ChangePW"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Change password
          </a>
        </Grid>
      </form>
    );
  };

  const data = [
    {
      M7SPOS: "1",
      M7PRNO: "RF04M0010010   ",
      M7MWNO: "0001100780",
      M7INSI: "RF-00M03001    ",
      LIINSN: "CR-RF-01            ",
      M7RVAL: "YES",
      M7RPDT: "20210118",
      PJSPOS: "1",
      PJTX15: "ตรวจเช็คการทำงา",
      PJTX40: "ตรวจเช็คการทำงาน/PROGRAME",
      STD: "ทำงานปกติ",
      PJRSIY: "VISUAL",
      PJRUOM: "UNT",
      QHWHST: "90",
      QHWHHS: "90",
    },
    {
      M7SPOS: "2",
      M7PRNO: "RF04M0010010   ",
      M7MWNO: "0001100780",
      M7INSI: "RF-00M03001    ",
      LIINSN: "CR-RF-01            ",
      M7RVAL: "5.000",
      M7RPDT: "20210118",
      PJSPOS: "2",
      PJTX15: "ตรวจเช็ค SUCTIO",
      PJTX40: "ตรวจเช็ค SUCTION PRESSURE",
      STD: "5 psi +-7 >= 2.000- <= 12.000",
      PJRSIY: "PRESSURE",
      PJRUOM: "PSI",
      QHWHST: "90",
      QHWHHS: "90",
    },
  ];

  return (
    <div className={classes.root}>
      {/* {wodetail.map((rowdata, i) =>
        console.log(
          i + " " + rowdata.PJSPOS + " " + rowdata.PJTX40 + " " + rowdata.M7RVAL
        )
      )} */}
      {/* {console.log("wodetail: " + JSON.stringify(wodetail))} */}
      {/* {console.log("collection: " + JSON.stringify(newArray))} */}
      <Formik
        initialValues={{}}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          // alert(JSON.stringify(wodetail));
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </div>
  );
};
