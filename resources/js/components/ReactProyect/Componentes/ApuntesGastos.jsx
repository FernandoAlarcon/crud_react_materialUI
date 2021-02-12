import React, { Component, useState } from "react";
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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';


const baseUrl = "/ApuntesGastosData";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

function ModalApuntes(props) {

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
        button_submit: {
            margin: theme.spacing(1)
        },
    }));

    const classes = useStyles();
    const [open, setOpen]         = useState(false);
    const [Cat, setCat]           = useState('');
    const [SubCat, setSubCat]     = useState('');
    const [importe, setImporte]   = useState('');
    const [concepto, setConcepto] = useState('');


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };

    const UpdateSub = () => {
        SuccesSub;
        <SubCategoriasGastos ref={element => {this.SubCategoriasGastosData = element}}  />
    }
  
    const handleClose = () => {
      setOpen(false);
    };
    const ConceptoChangue = (event) =>{
        setConcepto(event.target.value);
    }
    const ImporteChangue = (event) =>{
        setImporte(event.target.value);
    }
    const SubCategoria = (event) =>{
        setSubCat(event.target.value);
    }
    const Categoria = (event) => {
        setCat(event.target.value);
    };

    const NuevoApunte = (event) => {
        const formData = new FormData();
        formData.append('Categoría_Gasto',Cat)
        formData.append('Subcategoría_Gasto',SubCat)
        formData.append('Importe',importe)
        formData.append('Concepto',concepto) 

        axios.post(baseUrl,formData)
        .then((response) => {
            console.log("Success:", JSON.stringify(response)),
            UpdateSub 
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
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
               Nuevo Apunte
            </DialogTitle>
          <DialogContent>
          <form onSubmit={NuevoApunte}> 
            <DialogContentText>
             Aqui puedes agregar tus nuevos Apuntes
            </DialogContentText>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Cat}
                    onChange={Categoria}
                    >
                    {
                        props.Categorias.map((row) => (
                            <MenuItem value={row.id}>{row.Nombre_Categorias}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">SubCategoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SubCat}
                    onChange={SubCategoria}
                    >
                    {
                        props.Subcategorias.map((row) => (
                            <MenuItem value={row.id}>{row.Nombre_Subcategorias}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="outlined-adornment-amount">Importe</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={importe}
                    onChange={ImporteChangue}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={60}
                />
            </FormControl>
            <FormControl className={classes.formControl} >
                <TextField
                    id="outlined-multiline-static"
                    label="Concepto"
                    multiline
                    defaultValue={concepto}
                    onKeyPress={ConceptoChangue}
                    rows={4} 
                    variant="outlined"
                    />
            </FormControl>
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button_submit}
                >
                    Enviar Info <SendIcon className={classes.rightIcon} />
            </Button>
          </form>
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

  constructor(props) {
    super(props);
    this.state = {
        Fecha: new Date(),
        Categorias: [],
        SubCategorias: [],
        Apuntes: []
    };

    this.useStyles = makeStyles(theme => ({ 

        table: {
            minWidth: 650,
        }
    }));
    
    } /// FINAL CONSTRUCTOR

    componentDidMount(){
        this.CategoriasGastos();
        this.SubCategoriasGastos();
        this.ApuntesGastos();
    }

    CategoriasGastos(){

        let UrlCat = 'CategoriasGastosData';
        axios.get(UrlCat).then(response=>{
            this.setState({
                Categorias:response.data
            })
        }).catch(error=>{
            alert("Error "+error)
        })
    }
    SubCategoriasGastos(){

        let UrlSubCat = 'SubCategoriasGastosData/Admin';
        axios.get(UrlSubCat).then(response=>{
            this.setState({
                SubCategorias:response.data,
            })
        }).catch(error=>{
            alert("Error "+error)
        })
    }
    ApuntesGastos(){

        axios.get(baseUrl).then(response=>{
            this.setState({
                Apuntes:response.data,
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
                                            Apuntes Gastos
                                        </h3>
                                   </center>
                                
                                <div className="card-body" > 
                                   <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="caption table">
                                        <caption>
                                          <ModalApuntes  Categorias={ this.state.Categorias} 
                                                            Subcategorias={ this.state.SubCategorias} />
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

