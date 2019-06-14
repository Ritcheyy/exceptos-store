<template>
  <v-container fluid fill-height class="login">
    <v-layout class="pa-3" justify-center column>
      <v-flex align-self-center shrink>
        <img alt="Vue logo" width="80px" class="logo" src="../../assets/logo.png">
      </v-flex>
      <transition name="fade" mode="out-in" :duration="300">
        <v-form v-if="showLogin" key="login" @submit.prevent="login">
          <v-layout column>
            <v-layout row justify-center>
              <v-flex md4>
                <v-text-field prepend-icon="person" label="Email" v-model="loginUser.email"
                              required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-center>
              <v-flex md4>
                <v-text-field type="password" prepend-icon="lock" label="Password"
                              v-model="loginUser.password" required></v-text-field>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row justify-center>
              <v-flex md4>
                <v-btn type="submit" color="primary" block>
                  Login
                </v-btn>
                <br>
                <small>Email: oluseyer@gmail.com<br>Password: 123456</small>
                <br>
                <small>or create a new user account</small>
                <v-layout row justify-end>
                  <v-flex shrink>
                    <v-btn flat justify-end color="primary"
                           @click="showLogin = !showLogin"
                           class="btnLink">
                      <span>New User?</span>&nbsp;Register
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <!--<br>-->
          
          </v-layout>
        </v-form>
        
        <v-form v-if="!showLogin" key="register" @submit.prevent="register">
          <v-layout column>
            <v-layout row justify-center>
              <v-flex md4>
                <v-text-field type="email" prepend-icon="email" label="Email"
                              v-model="regUser.email"
                              required></v-text-field>
              </v-flex>
            </v-layout>
            
            <v-layout row justify-center>
              <v-flex md4>
                <v-text-field prepend-icon="person" label="Username"
                              v-model="regUser.username"
                              required></v-text-field>
              </v-flex>
            </v-layout>
            
            <v-layout row justify-center>
              <v-flex md4>
                <v-text-field type="password" prepend-icon="lock" label="Password"
                              v-model="regUser.password" required></v-text-field>
              </v-flex>
            </v-layout>
            
            <br>
            <v-layout row justify-center>
              <v-flex md4>
                <v-btn color="primary" type="submit" block>Register</v-btn>
                <v-layout justify-end>
                  <v-flex shrink>
                    <v-btn flat justify-end color="primary"
                           @click="showLogin = !showLogin"
                           class="btnLink">
                      <span>Existing User?</span>&nbsp;Login
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-form>
      </transition>
    </v-layout>
  </v-container>
</template>

<script>
    import firebase from 'firebase'
    import notify from '../../notify'

    export default {
        data() {
            return {
                loginUser: {},
                regUser: {},
                showLogin: true,
            }
        },

        methods: {
            // Login User
            login() {
                if (this.loginUser.email == null || this.loginUser.email == undefined) {
                    notify('Please input your email address!', 'error');
                    return;
                }

                if (this.loginUser.password == null || this.loginUser.password == undefined) {
                    notify('Please input your password!', 'error');
                    return;
                }

                this.loader().show();
                this.loginUser.email = this.loginUser.email.trim();
                
                firebase.auth().signInWithEmailAndPassword(this.loginUser.email, this.loginUser.password)
                    .then((user) => {
                        this.authUser(firebase.auth().currentUser);
                    })
                    .catch((err) => {
                        // console.log(err);
                        if (err.code == 'auth/invalid-email') {
                            notify('Invalid email address!', 'error');
                            this.loader().hide();
                            return;
                        }
                        if (err.code == 'auth/user-not-found') {
                            notify('User not found!', 'error');
                            this.loader().hide();
                            return;
                        }
                        if (err.code == 'auth/wrong-password') {
                            notify('Invalid password!', 'error');
                            this.loader().hide();
                            return;
                        }

                        if (err.code == 'auth/network-request-failed') {
                            notify('No internet connection!', 'error');
                            this.loader().hide();
                            return;
                        }
                    });
            },

            //Register User
            register() {
                if (this.regUser.email == null || this.regUser.email == undefined) {
                    notify('Please input a valid email address!', 'error');
                    return;
                }

                if (this.regUser.username == null || this.regUser.username == undefined) {
                    notify('Please input a Username!', 'error');
                    return;
                }

                if (this.regUser.password == null || this.regUser.password == undefined) {
                    notify('Please input a Password!', 'error');
                    return;
                }

                this.loader().show();

                firebase.auth().createUserWithEmailAndPassword(this.regUser.email, this.regUser.password)
                    .then((res) => {
                        let user = firebase.auth().currentUser;

                        user.updateProfile({
                            displayName: this.regUser.username,
                        })
                            .then(_ => {
                                //Authenticate User...
                                this.authUser(firebase.auth().currentUser);
                            })
                            .catch(err => {
                                notify('An error occurred, please try again!', 'error');
                                this.loader().hide();
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.code == "auth/email-already-in-use") {
                            notify('Email has already been used!', 'error');
                            this.loader().hide();
                            return;
                        }

                        if (err.code == "auth/invalid-email") {
                            notify('Invalid Email Address!', 'error');
                            this.loader().hide();
                            return;
                        }

                        if (err.code == "auth/weak-password") {
                            notify('Your password is too short!', 'error');
                            this.loader().hide();
                            return;
                        }

                        notify('An error occurred, please try again!', 'error');
                        this.loader().hide();

                    })
            },

            authUser(firebaseUser) {
                let user = {
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email,
                    uid: firebaseUser.uid,
                };

                localStorage.setItem('user', JSON.stringify(user));
                this.$store.dispatch("SET_USER", user);

                setTimeout(() => {
                    this.loader().hide();
                    this.$router.replace('/store');
                }, 2000);
            }
        },

        /*beforeCreate() {

        }*/
    }
</script>

<style scoped>
  .login {
    /*margin-top: 20px;*/
  }
  
  .btnLink {
    text-transform: capitalize;
  }
  
  .btnLink span {
    color: #fff;
  }
  
  .logo {
    margin-bottom: 20px;
  }
</style>
