import { Component, OnInit, OnDestroy } from '@angular/core'
import { log } from 'console'

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.scss'],
})
export class ClipListComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.handleScroll)
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (bottomOfWindow) {
      console.log('bottom of window')
    }
  }
}
