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
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert';

///// NOTIFICACIONES /////
import toastr from 'toastr'; 
import swal from 'sweetalert';
//////////////////
import TablePagination from '@material-ui/core/TablePagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';



const baseUrl = "/ApuntesGastosData";

export default  class ApuntesGastos extends Component {

        constructor(props) {
            super(props);
            this.ReloadData         = this.componentDidMount.bind(this);
            this.SearchRealTime     = this.SearchRealTime.bind(this);

            this.state = {
                Fecha: new Date(),
                Categorias: [],
                SubCategorias: [],
                Apuntes: [],
                BusquedaData: '',
                columns : [
                    { id: 'Nombre_Categorias', label: 'Categoria', minWidth: 170, align: 'center' },
                    { id: 'Nombre_Subcategorias', label: 'Sub Categoria', minWidth: 100, align: 'center' },
                    { id: 'Importe', label: 'Importe', minWidth: 100, align: 'center' },
                    { id: 'Concepto', label: 'Concepto', minWidth: 100, align: 'center' }
                    ],
                page: 0,
                rowsPerPage: 10
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
    
            let UrlSubCat = 'SubCategoriasGastosData';
            axios.get(UrlSubCat).then(response=>{
                this.setState({
                    SubCategorias:response.data,
                })
            }).catch(error=>{
                alert("Error "+error)
            })
        }

        ApuntesGastos(){
    
            axios.get(baseUrl,{ params: {
                DataSend: this.state.BusquedaData            
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
            this.setState({BusquedaData: InfoSend});
            this.ApuntesGastos();
        }
  
        Eliminar(Info){
    
            swal({
                title: "Estas seguro ?",
                text: "Vas a eliminar al dato por concepto de " + Info.Concepto + ", perderas este registro",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    let IdData = Info.IdApuntes;
                        axios.delete(baseUrl + '/Delete/' + IdData).then(response=>{
                        this.ApuntesGastos();
                        swal("Eliminaste el dato por concepto de "+ Info.Concepto + " de la base de datos", {
                            icon: "success",
                        });
                        toastr.success('Dato Eliminado');
                    }).catch(error=>{
                        alert("Error "+error)
                    })
                    
                } else {
                    //swal("No se eliminara!");
                }
                });           
    
        }
  
        render(){
        
        const classes = this.useStyles;      
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
                                            <div className="row" >
                                                <div className={'col-md-6'}  >
                                                    <TextField  id="Search"
                                                                onChange={this.SearchRealTime} 
                                                                value={this.state.BusquedaData}
                                                                className={classes.root_field} 
                                                                label="Mejora tu Busqueda" variant="outlined" />
                                                </div>
                                                <div className="col-md-6" style={{textAlign:"right"}} >
                                                    <ModalApuntes Categorias    = {this.state.Categorias}
                                                                Subcategorias = {this.state.SubCategorias} />
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
                                                        
                                                        <If condition={!this.state.Apuntes.length} >
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
                                                            <If condition={this.state.Apuntes.length == 0} >
                                                                <h3>
                                                                    No hay datos ...
                                                                </h3>
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
                                                                                                <ModalEditar Categorias={this.state.Categorias}
                                                                                                            Subcategorias={this.state.SubCategorias}
                                                                                                            InfoData={row} />
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
    const [Cat, setCat]           = useState('');
    const [SubCat, setSubCat]     = useState('');
    const [importe, setImporte]   = useState('');
    const [concepto, setConcepto] = useState('');


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const ConceptoChangue = (event) =>{
        setConcepto(event.target.value);
    };
    const ImporteChangue = (event) =>{
        setImporte(event.target.value);
    };
    const SubCategoria = (event) =>{
        setSubCat(event.target.value);
    };
    const Categoria = (event) => {
        setCat(event.target.value);
    };
    const NuevoApunte = evt => {
        evt.preventDefault();  
        const formData = new FormData();
        formData.append('Categoría_Gasto',Cat)
        formData.append('Subcategoría_Gasto',SubCat)
        formData.append('Importe',importe)
        formData.append('Concepto',concepto) 

        let URLApunte = baseUrl + '/Create';

        axios.get(URLApunte,{params:{
            Categoría_Gasto:Cat,
            Subcategoría_Gasto:SubCat,
            Importe:importe,
            Concepto:concepto
        }})
        .then((response) => {
             
            setConcepto('');
            setImporte('');
            setSubCat('');
            setCat('');
            setOpen(false); 
            swal(" Agregaste nuevo archivo ", {
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
            <FormControl className={classes.formControl}>
                <TextField
                    id="outlined-multiline-static"
                    label="Concepto" 
                    defaultValue={concepto}
                    onChange={ConceptoChangue} 
                    variant="outlined"
                    multiline
                    rows={4}
                /> 
            </FormControl>
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button_submit}
                >
                    Enviar Info <SendIcon />
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

    const Data = props.InfoData;

    const classes = useStyles();
    const [open, setOpen]         = useState(false);
    const [Id, setId]             = useState(Data.IdApuntes); 
    const [CatEdit, setCatEdit]   = useState(Data.Categoría_Gasto);
    const [SubCatEdit, setSubCatEdit]     = useState(Data.Subcategoría_Gasto);
    const [importeEdit, setImporteEdit]   = useState(Data.Importe);
    const [conceptoEdit, setConceptoEdit] = useState(Data.Concepto);


    const Gestion = new ApuntesGastos(props); 

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const AbrirModalEditar = () => {
      setOpen(true);
    };     
    const handleClose = () => {
      setOpen(false);
    };
    const ConceptoChangueFunc = (event) =>{
        setConceptoEdit(event.target.value);
    };
    const ImporteChangueFunc = (event) =>{
        setImporteEdit(event.target.value);
    };
    const SubCategoriaFunc = (event) =>{
        setSubCatEdit(event.target.value);
    };
    const CategoriaFunc = (event) => {
        setCatEdit(event.target.value);
    };

    const EditarGestion = async evt => {
        evt.preventDefault();   
        let URLApunte = baseUrl + '/Update/'+Id; 

        let DataUpdate = {
            Id                   : Id,
            Categoría_Gasto      : CatEdit,
            Subcategoría_Gasto   : SubCatEdit,
            Importe              : importeEdit,
            Concepto             : conceptoEdit

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
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
               Editar Apunte
            </DialogTitle>
          <DialogContent>
          <form onSubmit={EditarGestion}> 
            <DialogContentText>
             Aqui puedes agregar tus nuevos Apuntes
            </DialogContentText>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={CatEdit}
                    onChange={CategoriaFunc}
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
                    value={SubCatEdit}
                    onChange={SubCategoriaFunc}
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
                    value={importeEdit}
                    onChange={ImporteChangueFunc}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={60}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="outlined-multiline-static"
                    label="Concepto" 
                    defaultValue={conceptoEdit}
                    onChange={ConceptoChangueFunc}
                    variant="outlined"
                    multiline
                    rows={4}
                /> 
            </FormControl>
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button_submit}
                >
                    Enviar Info <SendIcon/>
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
 