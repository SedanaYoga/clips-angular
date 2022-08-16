import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AuthService } from 'src/app/services/auth.service'
import IUser from 'src/app/models/user.model'
import { RegisterValidators } from '../validators/register-validators'
import { EmailTaken } from '../validators/email-taken'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, public emailTaken: EmailTaken) {}

  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate],
  )
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(100),
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ])
  confirm_password = new FormControl('', [Validators.required])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(18),
    Validators.maxLength(18),
  ])

  showAlert = false
  alertMsg = 'Please wait your account is being created'
  alertColor = 'blue'
  inSubmission = false

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirm_password')],
  )

  async register() {
    this.inSubmission = true

    this.showAlert = true
    this.alertMsg = 'Please wait your account is being created'
    this.alertColor = 'blue'

    try {
      await this.auth.createUser(this.registerForm.value as IUser)
    } catch (error) {
      console.error(error)
      this.alertMsg = 'Unexpected error occurred, please try again later'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Your account has been created!'
    this.alertColor = 'green'
  }
}
