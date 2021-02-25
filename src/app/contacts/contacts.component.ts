import {Component} from '@angular/core';
import {Contact} from '../Contact';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contacts: any[] = [new Contact(1, 'Mario', 'Rossi', 'mario.rossi@email.it', '0654789529', 'mario.rossi@email.com')];

  submitted = false;

  contactForm = this.fb.group({
    id: [this.contacts.length + 1],
    name: ['', Validators.required],
    surname: [''],
    address: [''],
    phone: [''],
    email: [''],
  });

  get name(): any {
    return this.contactForm.get('name');
  }


  fakePost: Observable<{ title: string, content: string }> = of(
    {
      title: 'Simulating HTTP Requests',
      content: 'This is off the hook!!'
    })
    .pipe(delay(2000));

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {

    const {id} = this.contactForm.value;
    const idx = this.contacts.findIndex(c => c.id === id);

    this.fakePost.subscribe(() => {
      idx < 0 ? this.contacts.push(this.contactForm.value) : this.contacts.splice(idx, 1, this.contactForm.value);

      this.contactForm.reset({id: this.contacts.length + 1});
    });
  }

  editContact(id: number): void {
    const current = this.contacts.filter(c => c.id === id)[0];
    this.contactForm.setValue(current);
  }

  deleteContact(id: number): void {
    const index = this.contacts.map(c => c.id).indexOf(id);
    this.contacts.splice(index, 1);
  }
}
