import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-network-toast',
  templateUrl: './network-toast.component.html',
  styleUrls: ['./network-toast.component.scss'],
  imports: [CommonModule]
})
export class NetworkToastComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() message: string = '';
  @Input() type: 'online' | 'offline' = 'online';

}
