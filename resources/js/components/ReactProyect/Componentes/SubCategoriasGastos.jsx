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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';

///// NOTIFICACIONES /////
import toastr from 'toastr'; 
import swal from 'sweetalert';
//////////////////
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';

const baseUrl = "SubCategoriasGastosData";


function EditModalCategorias(props){

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
        rightIcon: {
            marginLeft: theme.spacing(1)
        }
    }));

    const classes = useStyles();
    const Data    = props.InfoData;
    const [open, setOpen]     = useState(false);
    const [Id, setId]         = useState(Data.id); 
    const [NomCat, setNomCat] = useState(Data.Nombre_Subcategorias);
    const [SubCat, setCat]    = useState(Data.Tipo_Gasto_Mensual);
    const Gestion             = new SubCategoriasGastos();
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const NombreCat = (event) => {
        setNomCat(event.target.value); 
    }
    const TipoSubCategoria = (event) => {
        setCat(event.target.value); 
    };

    const NuevaTipoSubCategoria = async evt => {
        evt.preventDefault();   
        let URLApunte = baseUrl + '/Update/'+Id; 
        let DataUpdate = {
            Nombre_Subcategorias : NomCat,
            Tipo_Gasto_Mensual   : SubCat
        };

        await axios.put(URLApunte,DataUpdate)
        .then((response) => { 

            Gestion.componentDidMount(); 
            setOpen(false); 
            swal("Editaste un archivo de la base de datos", {
                icon: "success",
            });

        })
        .catch((error) => {
            console.log(error);
        });
        
    };
 
  
    return (
        <div> 
         
        <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="Editar"
            className={classes.margin_fab}
            onClick={handleClickOpen}
            >
                <EditIcon/> Editar
        </Fab>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                Nueva SubCategorias
            </DialogTitle>
          <DialogContent>
            <form onSubmit={NuevaTipoSubCategoria}>
                <DialogContentText>
                Aqui puedes agregar tu nueva SubCategorias
                </DialogContentText>
                <FormControl className={classes.margin}> 
                    <TextField required
                               name="Nombre_Subcategorias"
                               defaultValue={NomCat}
                               onChange={NombreCat}
                               id="standard-required" 
                               label="Nombre Categoria"  />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Tipo de Gasto Mensual</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    name="Tipo_Gasto_Mensual"
                    id="demo-simple-select"
                    value={SubCat}
                    onChange={TipoSubCategoria}
                    >
                    <MenuItem value={'Fijo'}>Fijo</MenuItem>
                    <MenuItem value={'Multiple'}>Multiple</MenuItem> 
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

function ModalCategorias(){

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
        rightIcon: {
            marginLeft: theme.spacing(1)
        }
    }));

    const classes = useStyles();
    
    const [open, setOpen]     = useState(false);
    const [NomCat, setNomCat] = useState('');
    const [SubCat, setCat]    = useState('');
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };  
    const handleClose = () => {
      setOpen(false);
    };    
    const NombreCat = (event) => {
        setNomCat(event.target.value); 
    };
    const TipoSubCategoria = (event) => {
        setCat(event.target.value);  
    };

    const NuevaTipoSubCategoria =  evt => {
        evt.preventDefault();         
        let Ruta = baseUrl + '/Create';
        
        axios.get(Ruta, { params:{
            'Nombre_Subcategorias': NomCat,
            'Tipo_Gasto_Mensual': SubCat
        }})
        .then((response) => {
            setNomCat('');
            setCat('');
            setOpen(false); 
            swal("Agregaste nueva informacion a la base de datos", {
                icon: "success",
            });
        })
        .catch((error) => {
            console.log(error);
        });

        
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
                Nueva SubCategorias
            </DialogTitle>
          <DialogContent>
            <form onSubmit={NuevaTipoSubCategoria}>
                <DialogContentText>
                Aqui puedes agregar tu nueva SubCategorias
                </DialogContentText>
                <FormControl className={classes.margin}> 
                    <TextField required
                               name="Nombre_Subcategorias"
                               defaultValue={NomCat}
                               onChange={NombreCat}
                               id="standard-required" 
                               label="Nombre SubCategoria"  />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Tipo de Gasto Mensual</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    name="Tipo_Gasto_Mensual"
                    id="demo-simple-select"
                    value={SubCat}
                    onChange={TipoSubCategoria}
                    >
                    <MenuItem value={'Fijo'}>Fijo</MenuItem>
                    <MenuItem value={'Multiple'}>Multiple</MenuItem> 
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
          </DialogActions>
        </Dialog>
      </div>
   
    );
}

export default  class SubCategoriasGastos extends Component {
 
    constructor(props) {
    super(props);
    this.ReloadData                = this.componentDidMount.bind(this);
    this.SearchRealTime            = this.SearchRealTime.bind(this);
    this.SubCategoriasGastosData   = this.SubCategoriasGastosData.bind(this);
    this.state = {
        Fecha: new Date(),
        Categorias: [],
        CategoriasBackup: [],
        columns : [
            { id: 'Nombre_Subcategorias', label: 'Nombre SubCategoria', minWidth: 170, align: 'center' },
            { id: 'Tipo_Gasto_Mensual',   label: 'Gasto Mensual', minWidth: 100, align: 'center' },
            { id: 'created_at',           label: 'Creado', minWidth: 100, align: 'center' }
        ],
        page: 0,
        rowsPerPage: 10,
    };

    this.useStyles = makeStyles(theme => ({ 

        table: {
            minWidth: 650,
        }
    }));
    
    } /// FINAL CONSTRUCTOR

    componentDidMount(){
        this.SubCategoriasGastosData();
    }

    SearchRealTime(event){
        let InfoSend = '';
        if(event){
            InfoSend = event.target.value;
        }
        this.setState({BusquedadApuntes: InfoSend});
        this.SubCategoriasGastosData();
    };

    SubCategoriasGastosData(){

        axios.get(baseUrl).then(response=>{
            this.setState({
                Categorias:response.data,
                CategoriasBackup:response.data
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

    Eliminar(Info){

        swal({
            title: "Estas seguro ?",
            text: "Vas a eliminar a " + Info.Nombre_Subcategorias + " perderas este registro",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                let IdData = Info.id;
                    axios.delete(baseUrl + '/Delete/' + IdData).then(response=>{
                    this.SubCategoriasGastosData();
                    swal("Eliminaste "+ Info.Nombre_Subcategorias + " de la base de datos", {
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
                                            SubCategorias Gastos
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
                                                <ModalCategorias />
                                            </div>
                                            <div className="col-md-12" ><br/>
                                                <Paper className={classes.root}>                                    <TableContainer className={classes.container}>
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
                                                    
                                                    <If condition={!this.state.Categorias.length} >
                                                        <TableBody>
                                                                <TableCell></TableCell>
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
                                                        <If condition={this.state.Categorias.length == 0} >
                                                            <p>
                                                                No hay datos ...
                                                            </p>
                                                        <Else>
                                                            <TableBody>
                                                                {
                                                                    this.state.Categorias.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                                                    return (
                                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                                    {this.state.columns.map((column) => {
                                                                                        const value = row[column.id];
                                                                                        return (
                                                                                        <TableCell key={column.id} align={column.align}>
                                                                                          {value}
                                                                                        </TableCell>
                                                                                        );
                                                                                    })}
                                                                                        <TableCell align={'center'} > 
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
                                                                                                <EditModalCategorias InfoData={row} />
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
                                                        count={this.state.Categorias.length}
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

