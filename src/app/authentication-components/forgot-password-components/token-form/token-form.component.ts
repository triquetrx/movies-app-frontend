import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'token-form',
  templateUrl: './token-form.component.html',
  styleUrls: ['./token-form.component.scss'],
})
export class TokenFormComponent implements OnInit {
  isCompleted: boolean;
  @Output() completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() token: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  resetToken(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.token.emit(form.value?.token);
    this.isCompleted = true;
    this.completed.emit(this.isCompleted);
  }
}
