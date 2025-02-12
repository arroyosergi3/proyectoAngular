import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {

  isAuthenticated = false;

  constructor(private apiService : ApiService) { }

  getCookie(name: string) {
    const nameLenPlus = (name.length + 1);
    if (typeof document !== 'undefined') {
      return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))
      [0] || null;
  }
  return null;
    }


  ngOnInit(): void {
    const jwt = this.getCookie('jwt');
    if(jwt){
      this.isAuthenticated = true;
    }
  }

  onLogout(){
    this.isAuthenticated = false;
    this.apiService.logOut();
  }



}
