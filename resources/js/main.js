// const app2 = new Vue({
//   el: '#info',
//   created: function () {
//     this.getTag();
//   },
//   Data:{
//    UserInfo: []
//   },
//   methods:{
//     getTag: function () {
//       var url = '/DataType'
//       axios.get(url).then(response => {
//
//              this.UserInfo = response.data.Data[0].email; //.Informacion.data; new Date()
//              console.log(this.UserInfo);
//
//        }).catch(error => {
//              //this.errors = error.response.data
//        });
//     }
//   }
// });
