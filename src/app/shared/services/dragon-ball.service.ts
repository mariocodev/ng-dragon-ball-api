import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Character } from '../models/character.interface';

@Injectable({
  	providedIn: 'root'
})
export class DragonBallService {

	private apiUrl = environment.production ? 'https://dragonball-api.com/api' : 'api';

	constructor(private http: HttpClient) {}

	//'https://dragonball-api.com/api/characters?page=1&limit=15&name=a&gender=Male&race=Saiyan&affiliation=Z%20Fighter'
	getCharacters(
		start: number,
		page: number,
		limit: number,
		name?: string,
		gender?: string,
		race?: string,
		affiliation?: string
	): Observable<ApiResponse> {

		let params = new HttpParams()
		.set('page', `${Math.ceil(start / limit)}`) // calcular la página correctamente
		.set('limit', `${limit}`);

		if (name) params = params.set('name', name);
		if (gender) params = params.set('gender', gender);
		if (race) params = params.set('race', race);
		if (affiliation) params = params.set('affiliation', affiliation);

		//console.log(params.toString()); // Para depuración

		// Imprimir la URL completa
		const urlWithParams = `${this.apiUrl}?${params.toString()}`;
		console.log('URL Consultada:', urlWithParams);

		return this.http.get<ApiResponse | Character[]>(`${this.apiUrl}/characters`, { params }).pipe(
			map((response) => {
			if (Array.isArray(response)) {
				// Convertir el arreglo de Character a ApiResponse si la respuesta es un arreglo
				return {
				items: response,
				meta: {
					totalItems: response.length,
					itemCount: response.length,
					itemsPerPage: limit,
					totalPages: 1,
					currentPage: 1,
				},
				links: {
					first: '',
					previous: '',
					next: '',
					last: '',
				},
				} as ApiResponse;
			}
			return response as ApiResponse;
			}),
			catchError((error) => {
				console.error('Error fetching characters:', error);
				return of({
					items: [],
					meta: { totalItems: 0, itemCount: 0, itemsPerPage: 0, totalPages: 0, currentPage: 0 },
					links: { first: '', previous: '', next: '', last: '' },
				} as ApiResponse);
			})
		);
  }
}
