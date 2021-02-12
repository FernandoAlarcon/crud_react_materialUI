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
import Alert from '@material-ui/lab/Alert';



const baseUrl = "/ApuntesGestionIngresoData";

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
    const [NomGest, setNomGest]    = useState('');
    const [SubGestTipo, setSubGest]     = useState('');
    const [SubGestEstado, setEstado]   = useState(''); 


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const SuccesSub = `
    <Alert variant="filled" severity="success">
        Nueva Subcategoria Creada
    </Alert> `;

    const UpdateSub = () => {
        SuccesSub;
        <SubCategoriasGastos bind={ () => this.SubCategoriasGastosData()}  />
    }
  
    const handleClose = () => {
      setOpen(false);
    };
    const ChangueNombreGestion = (event) =>{
        setNomGest(event.target.value);
    }
    const ChangueTipoIngreso = (event) =>{
        setSubGest(event.target.value);
    }
    const SubEstado = (event) =>{
        setEstado(event.target.value);
    }

    const NuevaGestion = evt => {
        evt.preventDefault();   

        let URLApunte = baseUrl + '/Create'; 

        axios.get(URLApunte,{params:{
            Nombre_Tipo_Entradas:NomGest.toString(),
            Estado:SubGestEstado.toString(),
            Tipo_Ingreso:SubGestTipo.toString()
        }})
        .then((response) => {
            //console.log("Success:", JSON.stringify(response)) 
            setNomGest('');
            setSubGest(''); 
            setEstado(''); 

            setOpen(false);
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
               Nueva Gestion 
            </DialogTitle>
          <DialogContent>
          <form onSubmit={NuevaGestion}> 
            <DialogContentText>
             Aqui puedes agregar tus nuevas gestiones
            </DialogContentText>
            <FormControl className={classes.formControl}>
                    <TextField required
                               name="Nombre_Tipo_Entradas"
                               defaultValue={NomGest}
                               onKeyPress={ChangueNombreGestion}
                               id="standard-required" 
                               label="Nombre Gestion"  />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tipo Ingreso</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SubGestTipo}
                    onChange={ChangueTipoIngreso}
                    >   
                        <MenuItem value='Unico'>   Unico    </MenuItem>
                        <MenuItem value='Multiple Mensual'>Multiple Mensual </MenuItem> 

                    
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Estado Ingreso</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SubGestEstado}
                    onChange={SubEstado}
                    >   
                        <MenuItem value='Positivo'>Positivo </MenuItem>
                        <MenuItem value='Negativo'>Negativo </MenuItem>

                    
                </Select>
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

export default  class GestionIngresos extends Component {

  constructor(props) {
    super(props);
    this.state = {
        Fecha: new Date(), 
        Apuntes: []
    };

    this.useStyles = makeStyles(theme => ({ 

        table: {
            minWidth: 650,
        }
    }));
    
    } /// FINAL CONSTRUCTOR

    componentDidMount(){ 
        this.ApuntesGastos(); 
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
                                            Gestion de Ingresos
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
                                            <TableCell>Categorias</TableCell>
                                            <TableCell align="right">Gestion</TableCell>
                                            <TableCell align="right">Estado</TableCell> 
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        
                                        { this.state.Apuntes.map((row) => (
                                            <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.Nombre_Tipo_Entradas}
                                            </TableCell>
                                            <TableCell align="right">{row.Estado}</TableCell>
                                            <TableCell align="right">{row.Tipo_Ingreso}</TableCell> 
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

