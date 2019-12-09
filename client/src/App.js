import React from 'react';
import './App.css';
import Background from "./image/background.jpg";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

var result;
var raw;
var rows = [];

function   createData( difficulty, teaching_quality, course_number, name, department) {
  return { name,  difficulty, teaching_quality, course_number, department};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "course name"
  },
  { id: "difficulty", numeric: true, disablePadding: false, label: "Calories" },
  { id: "teaching quality", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "course number", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "department", numeric: true, disablePadding: false, label: "Protein (g)" }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

class TableWrapper extends React.Component {

  render(){
      return (<EnhancedTable/>);
  }
}


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { apiResponse: [] };
  }
  

  callAPI() {
    fetch("http://localhost:9000/testAPI")
    .then(res => res.text())
    .then(function(res){
      raw = res;
      result = JSON.parse(raw);
      if(result!=undefined){
        for(var i=0; i<result.length; i++){
          console.log("YEEE"+result[0].department);
          var data = createData(result[i].average_difficulty,result[i].average_teaching_quality,result[i].course_number,result[i].course_name, result[i].department);
          rows.push(data);
          console.log("Data"+data.name);
        }
        console.log("row"+JSON.stringify(rows[0]));
      }
    });
    console.log(rows);
    this.setState({ apiResponse: rows });
    console.log(this.state.apiResponse);
  }

  componentWillMount() {
    this.callAPI();
  }

    render(){
    console.log("rerender");
        return (
          <div class="container">
             <iframe style={{'visible': 'hidden'}} name="hiddenFrame" class="hide"></iframe>
            <Header_bar/>
            <div class="main">
              <Search_bar/>
              <div class="question">
                  <h3 style={{"color":"blue"}}>
                  What do you care most?
                  </h3>
                  <Questions/>
              </div>
              <div class="wrapper">
                <div class="table">
                  <TableWrapper/>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

class Questions extends React.Component {
    constructor(){
        super();
        this.state = {render:''}
    }

    handleClick(compName, e){
        console.log(compName);
        this.setState({render:compName});
    }

    _renderSubComp(){
        switch(this.state.render){
            case 'teaching_quality': return <Best_teaching_quality/>
            case 'Professor' : return <Best_professor/>
            case 'fun_level': return <Most_fun/>
        }
    }

    render() {
        return (
            <div className="App">
                <ul style={{display: 'inline'}}>
                    <li onClick={this.handleClick.bind(this, 'teaching_quality')}>Teaching quality</li>
                    <li onClick={this.handleClick.bind(this, 'Professor')}>Professor</li>
                    <li onClick={this.handleClick.bind(this, 'fun_level')}>Fun</li>
                </ul>
                {this._renderSubComp()}
            </div>
        );
    }
}

class Best_teaching_quality extends React.Component {

    render(){
        return <div>The class with beest teaching quality is </div>
    }
}

class Best_professor extends React.Component {
    render(){
        return <div>GOAT Prof</div>
    }
}

class Most_fun extends React.Component {
    render(){
        return <div>Most fun class</div>
    }
}

class Search_bar extends React.Component{
    render(){
      return (
        <div class="search_wrapper">
          <form id="formA" action="http://localhost:9000/testAPI" target="hiddenFrame" method="get">
          <div class="search">
            <input type="text" class="searchTerm" name="searchTerm" placeholder="What class are you interested in?"/>
            <button type="submit" class="searchButton">
              <SearchIcon/>
            </button>
           </div>
           </form>
       </div>
      );
    }
}

class Header_bar extends React.Component{
  render(){
    return (
      <div class="header_bar">
        <div class="box-field">
          <h3>
            <a href="./index.js">
              HOME
            </a>
          </h3>
        </div>
      </div>
    );
  }

}

function highest_teaching_quality(){
      return (
        <p>
        The class with the highest teaching quality is {result[0].number}
        </p>
      );}

function EnhancedTable() {
        const classes = useStyles();
        const [order, setOrder] = React.useState("asc");
        const [orderBy, setOrderBy] = React.useState("calories");
        const [page, setPage] = React.useState(0);
        const [dense, setDense] = React.useState(false);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
      
        const handleRequestSort = (event, property) => {
          const isDesc = orderBy === property && order === "desc";
          setOrder(isDesc ? "asc" : "desc");
          setOrderBy(property);
        };
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = event => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        };
      
        const handleChangeDense = event => {
          setDense(event.target.checked);
        };
        console.log("row 22"+JSON.stringify(rows));
        const emptyRows =
          rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
      
      
        return (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
      
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={row.name}
                          >
                            <TableCell padding="checkbox" />
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  "aria-label": "previous page"
                }}
                nextIconButtonProps={{
                  "aria-label": "next page"
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </div>
        );
  }
      
export default App;
