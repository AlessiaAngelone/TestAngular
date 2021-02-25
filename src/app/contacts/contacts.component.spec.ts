import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ContactsComponent} from './contacts.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Observable, VirtualTimeScheduler} from 'rxjs';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.contacts.length).toBe(1);
    expect(component.contactForm).toBeDefined();
  });

  it('should form works correctly', fakeAsync(() => {
    component.contactForm.get('name').setValue('test');
    component.onSubmit();
    tick(2001);
    expect(component.contacts.length).toBe(2);
    expect(component.contacts[1].name).toBe('test');
  }));

  it('should edit function works correctly', fakeAsync(() => {
    expect(component.contacts.length).toBe(1);
    component.editContact(1);
    const name = component.contactForm.get('name').value;
    expect(name).toBe(component.contacts[0].name);
    component.onSubmit();
    tick(2001);
    expect(component.contacts.length).toBe(1);
  }));

  it('should delete function works correctly', fakeAsync(() => {
    component.contactForm.get('name').setValue('test');
    component.onSubmit();
    tick(2001);
    expect(component.contacts.length).toBe(2);
    component.deleteContact(1);
    expect(component.contacts.length).toBe(1);
  }));
});
