<template>
<div>

    <div class="container">        
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                    <h3 class="card-title">User List</h3>

                    <div class="card-tools">
                        <!-- <button type="submit" class="btn btn-success" data-toggle="modal" data-target="#mdlAddNew">Add New -->
                        <button type="submit" class="btn btn-success" @click="newModal">Add New
                            <i class="fas fa-user-plus fa-fw"></i>
                        </button>
                    </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Registered At</th>
                                <th>Actions</th>
                            </tr>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.type | upText }}</td>
                                <td>{{ user.created_at | dmyDate }}</td>
                                <td>
                                    <a href="#" @click="editModal(user)">
                                        <i class="fas fa-edit"></i>
                                    </a>|
                                    <a href="#" @click="deleteUser(user.id)">
                                        <i class="fas fa-trash red"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>

    </div>

    <!-- Modal -->
    <div class="modal fade" id="mdlAddNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" v-show="!editMode">Add New User</h5>
                <h5 class="modal-title" id="exampleModalLabel" v-show="editMode">Edit User Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="editMode ? updateUser() : createUser()">
            <div class="modal-body">
                    <div class="form-group">
                        <!-- <label for="name">Name</label> -->
                        <input v-model="form.name" id="name" name="name" type="text" class="form-control" 
                            :class="{'is-invalid': form.errors.has('name')}" placeholder="Name">
                        <has-error :form="form" field="name"></has-error>
                        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="form.email" id="email" name="email" 
                            :class="{'is-invalid': form.errors.has('email')}" placeholder="Email address">
                        <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group">
                        <input name="password" v-model="form.password" type="password" class="form-control" id="pasword" 
                            :class="{'is-invalid': form.errors.has('password')}" placeholder="Password">
                        <has-error :form="form" field="password"></has-error>
                    </div>
                    <div class="form-group">
                        <textarea v-model="form.bio" id="bio" name="bio" class="form-control" 
                            :class="{'is-invalid': form.errors.has('bio')}" placeholder="Short bio about user"></textarea>
                        <has-error :form="form" field="bio"></has-error>
                    </div>
                    <div class="form-group">
                        <select v-model="form.type" id="type" name="type" class="form-control" 
                            :class="{'is-invalid': form.errors.has('type')}" placeholder="User Type">
                            <option value="">-- Select User Role --</option>
                            <option value="user">Standard</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Admin</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </div>
                    <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>&nbsp;
                <button type="submit" class="btn btn-primary">{{ btnTitle }}</button>
            </div>
            </form>
            </div>
        </div>
    </div>

</div>
</template>

<script>
    export default {
        data() {
            return {
                editMode: true,
                btnTitle: 'Save',
                users: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: '',
                })
            }
        },
        created() {
            this.loadUsers();
            Fire.$on('afterCreated', () => {
                this.loadUsers();
            });
            // setInterval( () => this.loadUsers(), 3000);
        },
        methods: {
            createUser() {
                this.$Progress.start();
                this.form.post('api/user').then((rs) => {
                    // console.log('post result', rs);
                    this.$Progress.finish();
                    $('#mdlAddNew').modal('hide');
                    Fire.$emit('afterCreated');
                    toast.fire({
                        'type': 'success',
                        'title': 'User created succesfully!',
                    })
                });
            },

            updateUser() {
                this.$Progress.start();
                console.log('user update', this.form.id);
                this.form.put(`api/user/${this.form.id}`).then((rs) => {
                    this.$Progress.finish();
                    $('#mdlAddNew').modal('hide');
                    Fire.$emit('afterCreated');
                    toast.fire({
                        'type': 'success',
                        'title': 'User updated succesfully!',
                    })
                }, (err) => {
                    this.$Progress.fail();
                })
            },

            loadUsers() {
                // axios.get('api/user').then((rs) => {
                axios.get('api/user').then(({data}) => {
                    console.log('result', data);
                    this.users = data.data;
                });                
            },

            deleteUser(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                }).then((result) => {
                        if (result.value) {
                            this.form.delete(`api/user/${id}`)
                                .then((rs) => {
                                    console.log('Success', rs);
                                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
                                    Fire.$emit('afterCreated');

                                }, (err) => {
                                    // console.log('Error', err);
                                    Swal.fire('Failed!', 'User could not be deleeted.', 'warning')
                                });
                        }
                })
            },

            newModal() {
                this.editMode = false;
                this.btnTitle = 'Save';
                this.form.reset();
                $('#mdlAddNew').modal('show');
            },

            editModal(user) {
                this.editMode = true;
                this.btnTitle = 'Update';
                console.log('user', user);
                this.form.reset();
                this.form.fill(user);
                $('#mdlAddNew').modal('show');
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
