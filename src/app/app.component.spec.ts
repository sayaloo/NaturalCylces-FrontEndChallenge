import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DateTime } from 'luxon'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatInputModule, MatDatepickerModule, BrowserAnimationsModule],
      declarations: [],
      providers: [],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize event name to empty string', () => {
    expect(component.eventName).toBe('')
  })

  it('should update event name correctly', () => {
    const eventName = 'Test Event'
    component.onEventNameChange(eventName)
    expect(component.eventName).toBe(eventName)
  })

  it('should initialize countdown text to "Event has ended"', () => {
    expect(component.countdownText).toBe('Event has ended')
  })

  it('should display countdown text as "Event has ended" when endDate is past', () => {
    component.endDate = DateTime.now().minus({ days: 1 })
    component.updateCountdown()
    expect(component.countdownText).toBe('Event has ended')
  })

  it('should update countdown text correctly when endDate is in the future', () => {
    const futureDate = DateTime.now().plus({ days: 1 })
    component.endDate = futureDate
    component.updateCountdown()
    expect(component.countdownText).toContain('1 days, 0 h, 0 m, 0 s')
  })

  it('should update countdown text correctly when endDate is null', () => {
    component.endDate = null as unknown as DateTime
    component.updateCountdown()
    expect(component.countdownText).toBe('Please enter a valid date')
  })

  it('should save event name to localStorage on event name change', () => {
    const eventName = 'Test Event'
    component.onEventNameChange(eventName)
    const savedEventName = localStorage.getItem('eventName')
    expect(savedEventName).toBe(eventName)
  })
})
