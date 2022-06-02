import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	isLoggedIn: boolean = false;
	redirectUrl: string;

	login(name:string, password:string): Observable<boolean> {
		const isLoggedIn = (name == 'pikachu' && password == 'pikachu');

		return of<boolean>(isLoggedIn).pipe(
			delay(1000),
			tap((response) => this.isLoggedIn = response)
			);
	}

	logout() {
		this.isLoggedIn = false;
	}
}
