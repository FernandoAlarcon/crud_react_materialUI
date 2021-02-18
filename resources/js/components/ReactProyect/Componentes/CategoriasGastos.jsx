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


const baseUrl = "CategoriasGastosData";

 
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
        button_submit: {
            margin: theme.spacing(1)
        },
    }));

    const classes          = useStyles();
    const [open, setOpen]  = React.useState(false);
    const [Cat, setCat]    = React.useState('');
    const [Tipo, setTipo]  = React.useState('');
    const theme      = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const Gestion    = new CategoriasGastos();

  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const TipoCategoria = (event) => {
        setTipo(event.target.value);
    };

    const CategoriaChangue = (event) => {
        setCat(event.target.value);
    };

    const NuevaCategoria = async evt => {
      evt.preventDefault();   

      let URLApunte = baseUrl + '/Create'; 

      await axios.get(URLApunte,{params:{
          Nombre_Categorias : Cat,
          Tipo_Categoria    : Tipo          
      }})
      .then((response) => {
          //Gestion.ApuntesGastos();
          Gestion.SearchRealTime(); 
          setCat('');
          setTipo('');  
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
                Nuevas Categorias
            </DialogTitle>
          <DialogContent>
            <form onSubmit={NuevaCategoria}>
              <DialogContentText>
              Aqui puedes agregar tus nuevas Categorias
              </DialogContentText>
              <FormControl className={classes.margin}> 
                  <TextField  required 
                              id="standard-required"
                              label="Nombre Categoria"
                              defaultValue={Cat}
                              onChange={CategoriaChangue} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tipo de Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Tipo}
                  onChange={TipoCategoria}
                  >
                  <MenuItem value={'Gasto vital'}>Gasto vital</MenuItem>
                  <MenuItem value={'Gasto no vital'}>Gasto no vital</MenuItem> 
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

function EditModalCategorias(props) {

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

  const classes = useStyles();
  const Data    = props.InfoData;
  const [open, setOpen]     = useState(false);
  const [Id, setId]         = useState(Data.id); 
  const [Cat, setCat]       = useState(Data.Nombre_Categorias);
  const [Tipo, setTipo]     = useState(Data.Tipo_Categoria);
  const theme      = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const Gestion    = new CategoriasGastos();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ChangueCategoria = (event) => { 
      setCat(event.target.value);
  };
  const TipoCategoria = (event) => { 
      setTipo(event.target.value);
  };
  const EditarTipoSubCategoria = async evt => {

        evt.preventDefault();   
        let URLApunte = baseUrl + '/Update/'+Id; 
        let DataUpdate = {
          Nombre_Categorias : Cat,
          Tipo_Categoria    : Tipo
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
              Editar Categorias
          </DialogTitle>
          <DialogContent>
          <form onSubmit={EditarTipoSubCategoria}>
            <DialogContentText>
            Aqui puedes agregar tus nuevas Categorias
            </DialogContentText>
            <FormControl className={classes.margin}> 
                <TextField  required
                            name="Nombre_Subcategorias"
                            defaultValue={Cat}
                            onKeyPress={ChangueCategoria}
                            id="standard-required" 
                            label="Nombre Categoria"  />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tipo de Categoria</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Tipo}
                onChange={TipoCategoria}
                >
                <MenuItem value={'Gasto vital'}>Gasto vital</MenuItem>
                <MenuItem value={'Gasto no vital'}>Gasto no vital</MenuItem> 
                </Select>
            </FormControl>
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

export default  class CategoriasGastos extends Component {

    constructor(props) {
      super(props);
      this.ReloadData         = this.componentDidMount.bind(this);
      this.SearchRealTime     = this.SearchRealTime.bind(this);
      this.CategoriasGastos   = this.CategoriasGastos.bind(this);
      this.state = {
          Fecha: new Date(),
          Categorias: [],
          CategoriasBackup: [],
          BusquedadApuntes: '',
          columns : [
              { id: 'Nombre_Categorias', label: 'Nombre Categoria', minWidth: 170, align: 'center' },
              { id: 'Tipo_Categoria',    label: 'Tipo Categoria', minWidth: 100, align: 'center' },
              { id: 'Estado_Categoria',  label: 'Estado', minWidth: 100, align: 'center' },
              { id: 'created_at',        label: 'Creado', minWidth: 100, align: 'center' }
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
        this.CategoriasGastos();
    };

    async CategoriasGastos(){

        await axios.get(baseUrl,{params:{
          DataSend: this.state.BusquedadApuntes
        }}).then(response=>{
            this.setState({
                Categorias:response.data,
                CategoriasBackup:response.data
            })
        }).catch(error=>{
            alert("Error "+error)
        })
    };

    SearchRealTime(event){
        let InfoSend = '';
        if(event){
            InfoSend = event.target.value;
        }
        this.setState({BusquedadApuntes: InfoSend});
        this.CategoriasGastos();
    };

    Eliminar(Info){

        swal({
            title: "Estas seguro ?",
            text: "Vas a eliminar a " + Info.Nombre_Categorias + " perderas este registro",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let IdData = Info.id;
                    axios.delete(baseUrl + '/Delete/' + IdData).then(response=>{
                    this.CategoriasGastos();
                    swal("Eliminaste "+ Info.Nombre_Categorias + " de la base de datos", {
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

    };

    async handleChangePage(event, newPage){ 
        let finalRow = (this.state.page) + 1;
        this.setState({page:finalRow});
    };

    handleChangeRowsPerPage(event){
        let rowsPerPage_D = event.target.value;
            rowsPerPage_D = rowsPerPage_D+1;
        this.setState({rowsPerPage : rowsPerPage_D});
        this.setState({page:0});
    };

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

