import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  }

  showAlert = false
  alertMsg = 'Please wait, we are logging you in!'
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async login() {
    this.inSubmission = true
    this.showAlert = true
    this.alertMsg = 'Please wait, we are logging you in!'
    this.alertColor = 'blue'

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password,
      )
    } catch (error) {
      console.error(error)
      this.alertMsg = 'Unexpected error occurred, please try again later'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Welcome to clips, you are logged in!'
    this.alertColor = 'green'
  }
}
