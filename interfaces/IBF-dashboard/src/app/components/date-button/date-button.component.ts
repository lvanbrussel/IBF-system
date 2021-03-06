import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'date-button',
  templateUrl: './date-button.component.html',
  styleUrls: ['./date-button.component.scss'],
})
export class DateButtonComponent implements OnInit {
  @Input() date = moment();

  private dateFormat: string = 'ddd DD';
  private monthFormat: string = 'MMM YYYY';
  public displayDate: string;
  public displayMonth: string;

  constructor() {}

  ngOnInit() {
    this.displayDate = this.date.format(this.dateFormat);
    this.displayMonth = this.date.format(this.monthFormat);
  }
}
