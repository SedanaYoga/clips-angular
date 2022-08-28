import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core'
import IClip from 'src/app/models/clip.model'
import { ModalService } from 'src/app/services/modal.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ClipService } from 'src/app/services/clip.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null
  @Output() update = new EventEmitter()

  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wai, your clip title is being updated'
  inSubmission = false

  clipID = new FormControl<string | undefined>('', {
    nonNullable: true,
  })
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  })

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID,
  })

  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnChanges(): void {
    if (!this.activeClip) return

    this.inSubmission = false
    this.showAlert = false

    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  async submit() {
    if (!this.activeClip) return

    this.showAlert = true
    this.inSubmission = true
    this.alertColor = 'blue'
    this.alertMsg = 'Please wait, your clip title is being updated'

    try {
      await this.clipService.updateClip(
        this.clipID.value as string,
        this.title.value,
      )
    } catch (e) {
      this.inSubmission = false
      this.alertMsg = 'Something went wrong, please try again later'
      this.alertColor = 'red'
      return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertMsg = 'Success!'
    this.alertColor = 'green'
  }
}
