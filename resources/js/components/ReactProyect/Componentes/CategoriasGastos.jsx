import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Navbar from '../Navbar';
import axios from 'axios';

import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
const baseUrl = "CategoriasGastosData";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

function ModalCategorias() {

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
          },
        },
        margin: {
            margin: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 220,
        },
    }));

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [Cat, setCat] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const TipoCategoria = (event) => {
        //this.setState({TipoCat : event.target.value});
        setCat(event.target.value);
    };
  
    return (
        <div> 
        <Fab onClick={handleClickOpen} color="primary" aria-label="add">
            <AddIcon />
        </Fab>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                Nuevas Categorias
            </DialogTitle>
          <DialogContent>
            <DialogContentText>
             Aqui puedes agregar tus nuevas Categorias
            </DialogContentText>
            <FormControl className={classes.margin}> 
                <TextField required id="standard-required" label="Nombre Categoria" defaultValue="" />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tipo de Categoria</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Cat}
                onChange={TipoCategoria}
                >
                <MenuItem value={'Gasto vital'}>Gasto vital</MenuItem>
                <MenuItem value={'Gasto no vital'}>Gasto no vital</MenuItem> 
                </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Cerrar Ventana 
            </Button>
            {/* <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
   
    );
  }

export default  class CategoriasGastos extends Component {
  //const classes = useStyles();

  constructor(props) {
    super(props);
    this.state = {
        Fecha: new Date(),
        Categorias: [],
        CategoriasBackup: []
    };

    this.useStyles = makeStyles(theme => ({ 

        table: {
            minWidth: 650,
        }
    }));
    
    } /// FINAL CONSTRUCTOR

    componentDidMount(){
        this.CategoriasGastos();
    }

    CategoriasGastos(){

        axios.get(baseUrl).then(response=>{
            this.setState({
                Categorias:response.data,
                CategoriasBackup:response.data
            })
        }).catch(error=>{
            alert("Error "+error)
        })
    }


    render(){
    const classes  = this.useStyles; 
    return (
                <div>
                    <div> 
                        <Navbar/>
                    </div>
                    <div className="container" >
                        <div className="row" >
                            <div className="col-md-12" ><br/>
                                <div className="card">
                                   <center><br/>
                                        <h3>
                                            Categorias Gastos
                                        </h3>
                                   </center>
                                
                                <div className="card-body" > 
                                   <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="caption table">
                                        <caption>
                                          <ModalCategorias/>
                                        </caption>
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Nombre Categorias</TableCell>
                                            <TableCell align="right">Tipo Categoria</TableCell>
                                            <TableCell align="right">Estado Categoria</TableCell>
                                            <TableCell align="right">Fecha de Creacion</TableCell> 
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        
                                        { this.state.Categorias.map((row) => (
                                            <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.Nombre_Categorias}
                                            </TableCell>
                                            <TableCell align="right">{row.Tipo_Categoria}</TableCell>
                                            <TableCell align="right">{row.Estado_Categoria}</TableCell>
                                            <TableCell align="right">{row.created_at}</TableCell> 
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                </div>

                                </div>       

                            </div>   
                                                
                        </div>
                    </div>
                </div>
        );
  }

 
}

