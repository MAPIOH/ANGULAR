import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-header',
  templateUrl: './button-header.component.html',
  styleUrls: ['./button-header.component.scss']
})
export class ButtonHeaderComponent implements OnInit {

  @Input() tooltipText!: string;
  @Input() iconUrl!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
