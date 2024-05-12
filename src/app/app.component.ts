import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { DateTime } from 'luxon'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker'
import { MatLuxonDateModule } from '@angular/material-luxon-adapter'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatLuxonDateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  today: DateTime = DateTime.now()
  endDate: DateTime = DateTime.now()
  eventName: string = ''
  countdownText: string = ''
  constructor() {}

  ngOnInit(): void {
    // Load saved data from localStorage if available
    const savedEndDate = localStorage.getItem('endDate')
    if (savedEndDate) {
      this.endDate = DateTime.fromISO(savedEndDate)
    }
    const savedEventName = localStorage.getItem('eventName')
    if (savedEventName) {
      this.eventName = savedEventName
    }

    this.updateCountdown()
    setInterval(() => {
      this.updateCountdown()
    }, 1000)
  }

  onDatePickerChange(type: string, event: MatDatepickerInputEvent<Date>) {
    const val = event.target.value
    if (val !== null) {
      localStorage.setItem('endDate', this.endDate.toISO() ?? '')
      localStorage.setItem('eventName', this.eventName)
    }
  }

  onEventNameChange(eventName: string) {
    this.eventName = eventName
    localStorage.setItem('eventName', this.eventName)
  }
  updateCountdown(): void {
    const now = DateTime.now()
    if (this.endDate) {
      const timeDifference = this.endDate.diff(now)
      if (timeDifference.milliseconds <= 0) {
        this.countdownText = 'Event has ended'
      } else {
        const { days, hours, minutes, seconds } = timeDifference.shiftTo(
          'days',
          'hours',
          'minutes',
          'seconds',
        )
        this.countdownText = `${days} days, ${hours} h, ${minutes} m, ${Math.trunc(seconds)} s`
      }
    } else {
      this.countdownText = 'Please enter a valid date'
    }
  }
}
