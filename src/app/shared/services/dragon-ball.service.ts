import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.interface';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Character } from '../models/character.interface';

@Injectable({
  	providedIn: 'root'
})
export class DragonBallService {

	private apiUrl = environment.production ? 'https://dragonball-api.com/api' : 'api';

	constructor(private http: HttpClient) {}

	//'https://dragonball-api.com/api/characters?page=1&limit=15&name=a&gender=Male&race=Saiyan&affiliation=Z%20Fighter'
	private buildParams(page: number, limit: number, filters?: { [key: string]: string | undefined }): HttpParams {
		let params = new HttpParams()
			.set('page', `${page}`)
		  	.set('limit', `${limit}`);
	
		if (filters) {
			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params = params.set(key, filters[key] as string);
				}
			});
		}

		// Imprimir la URL completa
		const urlWithParams = `${this.apiUrl}/characters?${params.toString()}`;
		console.log('URL Consultada:', urlWithParams);
	
		return params;
	}

	private handleError(error: HttpErrorResponse): Observable<never> {
		let errorMessage = 'An unknown error occurred!';
		
		if (error.error instanceof ErrorEvent) {
			// Error del lado del cliente
			errorMessage = `Client-side error: ${error.error.message}`;
		} else {
			// Error del lado del servidor
			errorMessage = `Server-side error: StatusCode=${error.status}, Message=${error.message}`;
		}
		
		console.error(errorMessage);
		return throwError(() => new Error(errorMessage));
	}
	
	getCharactersNoFilter(page: number, limit: number): Observable<ApiResponse> {
		const params = this.buildParams(page, limit);	
		return this.http.get<ApiResponse>(`${this.apiUrl}/characters`, { params })
		.pipe(
			catchError(this.handleError)
		);
	}
	
	getCharactersByFilter(
		page: number,
		limit: number,
		name?: string,
		gender?: string,
		race?: string,
		affiliation?: string
	): Observable<Character[]> {
		
		const params = this.buildParams(page, limit, { name, gender, race, affiliation });
	
		return this.http.get<Character[]>(`${this.apiUrl}/characters`, { params })
		.pipe(
			catchError(this.handleError)
		);
	}

}
