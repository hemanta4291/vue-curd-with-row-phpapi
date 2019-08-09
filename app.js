
let app = new Vue({
    el:"#root",
    data: {
        users:[],
        newUser:{ username:'', email:'', mobile:''},
        loginUser:{ username:'', password:''},
		showingAddModal: false,
		showingEditModal: false,
        showingDeleteModal: false,
        errorMessage: "",
        successMessage: "",
        clickedUser:{}
	},
    mounted(){
        //console.log('vue is readfsdfsy')
        this.getData()
        //console.log(this.newUser);
        //console.log(this.loginUser);
        
        
    },
    methods:{
        getData(){
            axios.get('http://localhost/vuephpcart/api.php?action=read')
            .then(response=>{
                console.log(response);
                if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.users = response.data.users;
				}
                
            })
        },
        createData(){

            // const formData = new FormData();
            // formData.append('username', app.newUser.username);
            // formData.append('email', app.newUser.email);
            // formData.append('mobile', app.newUser.mobile);

            let formData = app.toFormData(app.newUser);
            //console.log(app.toFormData(app.newUser));
            
            axios.post('http://localhost/vuephpcart/api.php?action=create',formData)
            .then(res=>{
                app.newUser = {username: "", email: "", mobile: ""};

				if(res.data.error){
					app.errorMessage = res.data.message; 
				} else{
                    app.successMessage = res.data.message; 
				}
                
            })
        },
        //login form
        loginData(){

            // const formData = new FormData();
            // formData.append('username', app.newUser.username);
            // formData.append('email', app.newUser.email);
            // formData.append('mobile', app.newUser.mobile);

            let formData = app.toFormData(app.loginUser);
            //console.log(app.toFormData(app.newUser));
            
            axios.post('http://localhost/vuephpcart/api.php?action=login',formData)
            .then(res=>{
                app.loginUser = {username: "", password: ""};
                console.log(res)
				if(res.data.error){
					app.errorMessage = res.data.message; 
				} else{
                    app.successMessage = res.data.message; 
				}
                
            })
        },
        //delete

        deleteData: function(){
			//console.log(app.newUser);
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/vuephpcart/api.php?action=delete", formData)
			.then(function(response){				
				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.successMessage = response.data.message; 
					app.getData();
				}
			});
        },
        
        //edit data
        updatedata: function(){
			//console.log(app.newUser);
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/vuephpcart/api.php?action=update", formData)
			.then(function(response){
                app.clickedUser={}				
				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.successMessage = response.data.message; 
					app.getData();
				}
			});
        },
        selectUser(a){
			app.clickedUser = a;
		},

        toFormData(obj){
			var form_data = new FormData();
		      for ( var key in obj ) {
		          form_data.append(key, obj[key]);
		      } 
              return form_data;
              
        }
        
    }
})
