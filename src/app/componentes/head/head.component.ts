import { Component  } from '@angular/core';

@Component({
  selector: 'app-head',
  imports: [],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {

  isAuthenticated = false;

  constructor() { }

  getCookie(name: string) {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))
      [0] || null;
  }

  ngOnInit(): void {
    const jwt = this.getCookie('jwt');
    if(jwt){
      this.isAuthenticated = true;
    }
  }



}
