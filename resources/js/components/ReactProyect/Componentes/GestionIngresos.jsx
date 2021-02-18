import React, { Component, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
import SendIcon from '@material-ui/icons/Send';
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Alert from '@material-ui/lab/Alert';

///// NOTIFICACIONES /////
import toastr from 'toastr'; 
import swal from 'sweetalert';
//////////////////
import axios from 'axios';
import Navbar from '../Navbar';
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';

const baseUrl = "/ApuntesGestionIngresoData";
const ITEM_HEIGHT = 48;


export default class GestionIngresos extends Component {

        constructor(props) {
        super(props);
        this.ReloadData         = this.componentDidMount.bind(this);
        this.SearchRealTime     = this.SearchRealTime.bind(this);
        this.ApuntesGastosData  = this.ApuntesGastos.bind(this);
        
        this.state = {
            Fecha: new Date(), 
            Apuntes: [],
            BusquedadApuntes: '',
            columns : [
                { id: 'Nombre_Tipo_Entradas', label: 'Nombre Entradas', minWidth: 170, align: 'center' },
                { id: 'Estado', label: 'Estado Entrada', minWidth: 100, align: 'center' },
                { id: 'Tipo_Ingreso', label: 'Tipo Ingreso', minWidth: 100, align: 'center' }
            ],
            page: 0,
            rowsPerPage: 10,
    
        };
    
        this.useStyles = makeStyles(theme => ({ 
    
            table: {
                minWidth: 650,
            },
            root: {
                width: '100%',
            },
            container: {
                maxHeight: 440,
            },
            root_field: { 
                    margin: theme.spacing(1),
                    width: '35ch'
            },
            margin_fab: {
                margin: theme.spacing(1),
            },
            extendedIcon: {
                marginRight: theme.spacing(1),
            },
        }));
    
        
        } /// FINAL CONSTRUCTOR
      
        componentDidMount(){ 
            this.ApuntesGastos(); 
        }
        
        async ApuntesGastos(){
                
                await axios.get(baseUrl, { params: {
                    DataSend: this.state.BusquedadApuntes
                }}).then(response=>{
                    this.setState({
                        Apuntes:response.data,
                    })
                    
                }).catch(error=>{
                    alert("Error "+error)
                })
    
            
        }
    
        async handleChangePage(event, newPage){
            //this.state.rowsPerPage *   
            let finalRow = (this.state.page) + 1;
            this.setState({page:finalRow});
        };
    
        handleChangeRowsPerPage(event){
            let rowsPerPage_D = event.target.value;
                rowsPerPage_D = rowsPerPage_D+1;
            this.setState({rowsPerPage : rowsPerPage_D});
            this.setState({page:0});
        };
        
        SearchRealTime(event){
            let InfoSend = '';
            if(event){
                InfoSend = event.target.value;
            }
            this.setState({BusquedadApuntes: InfoSend});
            this.ApuntesGastos();
        }
         

        Eliminar(Info){

            swal({
                title: "Estas seguro ?",
                text: "Vas a eliminar a " + Info.Nombre_Tipo_Entradas + " perderas este registro",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    let IdData = Info.id;
                        axios.delete(baseUrl + '/Delete/' + IdData).then(response=>{
                        this.ApuntesGastos();
                        swal("Eliminaste "+ Info.Nombre_Tipo_Entradas + " de la base de datos", {
                            icon: "success",
                        });
                        toastr.success('Dato Eliminado');
                    }).catch(error=>{
                        alert("Error "+error)
                    })
                  
                } else {
                  //swal("Your imaginary file is safe!");
                }
              });           

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
                                        <div className="row" >
                                            <div className={'col-md-6'}  >
                                                <TextField  id="Search"
                                                            onChange={this.SearchRealTime} 
                                                            value={this.state.BusquedadApuntes}
                                                            className={classes.root_field} 
                                                            label="Mejora tu Busqueda" variant="outlined" />
                                            </div>
                                            <div className="col-md-6" style={{textAlign:"right"}} >
                                                <ModalApuntes />
                                            </div>
                                            <div className="col-md-12" ><br/>
                                                <Paper className={classes.root}>                                    
                                                 <TableContainer className={classes.container}>
                                                    <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                        {this.state.columns.map((column) => (
                                                            <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                            >
                                                            {column.label}
                                                            </TableCell>
                                                        ))}
                                                            <TableCell  align={'center'} >
                                                                Acciones
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    
                                                    <If condition={!this.state.Apuntes.length} >
                                                        <TableBody>
                                                                <TableCell></TableCell>
                                                                <TableCell>
                                                                    <center>
                                                                        <CircularProgress />
                                                                    </center>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                        </TableBody>                                                        
                                                        <Else>
                                                                <If condition={this.state.Apuntes.length == 0} >
                                                                    <p>
                                                                        No hay datos ...
                                                                    </p>
                                                                    <Else>
                                                                        <TableBody>
                                                                            {                                                                        
                                                                            this.state.Apuntes.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                                                            return (
                                                                                    
                                                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                                        {this.state.columns.map((column) => {
                                                                                            const value = row[column.id];
                                                                                            return (
                                                                                            <TableCell key={column.id} align={column.align}>
                                                                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                                                                                {value}
                                                                                            </TableCell>
                                                                                            );
                                                                                        })}
                                                                                            <TableCell align={'center'} > 
                                                                                                {/* <Opciones dataApuntes={row} /> */}
                                                                                                <div>        
                                                                                                    <Fab
                                                                                                    variant="extended"
                                                                                                    size="medium"
                                                                                                    color="secondary"
                                                                                                    aria-label="add"
                                                                                                    className={classes.margin_fab}
                                                                                                    onClick={this.Eliminar.bind(this, row)}
                                                                                                    >
                                                                                                        <DeleteIcon /> Borrar 
                                                                                                    </Fab>
                                                                                                    <ModalEditar InfoData={row} />
                                                                                                </div>
                                                                                            </TableCell> 
                                                                                    </TableRow>

                                                                                    );                                        
                                                                            })}
                                                                        </TableBody>     
                                                                    </Else>
                                                                </If>
                                                        </Else>
                                                    </If>
                                                    
                                                    </Table>
                                                    </TableContainer>
                                                    <TablePagination
                                                        rowsPerPageOptions={[10, 25, 100]}
                                                        component="div"
                                                        count={this.state.Apuntes.length}
                                                        rowsPerPage={this.state.rowsPerPage}
                                                        page={this.state.page}
                                                        onChangePage={this.handleChangePage}
                                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    />                                    
                                                </Paper>
                                            </div>
                                        </div>
                                    </div>
  
                                  </div>       
  
                              </div>   
                                                  
                          </div>
                      </div>
                  </div>
          );
    }
  
   
}

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

    const Gestion = new GestionIngresos(props); 

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    function AbrirModal(Data){
        console.log('llego la data '+ Data);
        setOpen(true);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
      
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

    const NuevaGestion = async evt => {
        evt.preventDefault();   

        let URLApunte = baseUrl + '/Create'; 

        await axios.get(URLApunte,{params:{
            Nombre_Tipo_Entradas:NomGest.toString(),
            Estado:SubGestEstado.toString(),
            Tipo_Ingreso:SubGestTipo.toString()
            
        }})
        .then((response) => {
            //Gestion.ApuntesGastos();
            Gestion.SearchRealTime(); 
            setNomGest('');
            setSubGest(''); 
            setEstado(''); 
            setOpen(false); 
            swal("Agregaste nueva informacion a la base de datos", {
                icon: "success",
            });
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
                               onChange={ChangueNombreGestion}
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
 
function ModalEditar(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
          },
        },
        margin_fab: {
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

    const Data = props.InfoData;

    const classes = useStyles();
    const [open, setOpen]         = useState(false);
    const [Id, setId]             = useState(Data.id);
    const [NomUpdateGest, setNomGest]        = useState(Data.Nombre_Tipo_Entradas);
    const [SubUpdateGestEstado, setEstado]   = useState(Data.Estado); 
    const [SubUpdateGestTipo, setSubGest]    = useState(Data.Tipo_Ingreso);

    const Gestion = new GestionIngresos(props); 

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const AbrirModalEditar = () => {
      setOpen(true);
    };
      
    const CerrarModalEditar = () => {
      setOpen(false);
    };
    const ChangueNombreGestion = (event) =>{
        setNomGest(event.target.value);
    }
    const ChangueTipoIngreso = (event) =>{
        setSubGest(event.target.value);
    }
    const SubEstadoUpdate = (event) =>{
        setEstado(event.target.value);
    }

    const EditarGestion = async evt => {
        evt.preventDefault();   
        let URLApunte = baseUrl + '/Update/'+Id; 

        let DataUpdate = {
            Id                   : Id,
            Nombre_Tipo_Entradas : NomUpdateGest.toString(),
            Estado               : SubUpdateGestEstado.toString(),
            Tipo_Ingreso         : SubUpdateGestTipo.toString()
        };

        await axios.put(URLApunte,DataUpdate)
        .then((response) => { 

            Gestion.ApuntesGastosData(); 
            console.log(Gestion); 
            setOpen(false); 

            swal("Editaste un archivo de la base de datos", {
                icon: "success",
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
    return (
        <div> 
            <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Editar"
            className={classes.margin_fab}
            onClick={AbrirModalEditar}
            >
                <EditIcon/> Editar
            </Fab>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={CerrarModalEditar}
          aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
               Edita tu Gestion 
            </DialogTitle>
          <DialogContent>
          <form onSubmit={EditarGestion}> 
            <DialogContentText>
             Aqui puedes agregar tus nuevas gestiones
            </DialogContentText>
            <FormControl className={classes.formControl}>
                    <TextField required
                               name="Nombre_Tipo_Entradas"
                               defaultValue={NomUpdateGest}
                               onChange={ChangueNombreGestion}
                               id="standard-required" 
                               label="Nombre Gestion"  />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tipo Ingreso</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SubUpdateGestTipo}
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
                    value={SubUpdateGestEstado}
                    onChange={SubEstadoUpdate}
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
            <Button autoFocus onClick={CerrarModalEditar} color="primary">
              Cerrar Ventana 
            </Button>
            
          </DialogActions>
        </Dialog>
      </div>
   
    );
}
 




