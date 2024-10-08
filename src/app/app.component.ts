import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Character } from './shared/models/character.interface';
import { DragonBallService } from './shared/services/dragon-ball.service';
import { ApiResponse } from './shared/models/api-response.interface';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	characters: Character[] = [];
	searchForm: FormGroup;
	countCharacter: number = 0;

	ENV: boolean = environment.production;

	LIMIT_RESULT: number = 16;

	constructor(
		private __dragonBallService: DragonBallService,
		private fb: FormBuilder
	) {
		// Inicializa el formulario
		this.searchForm = this.fb.group({
			name: [''],
			gender: [''],
			race: [''],
			affiliation: [''],
			sort: ['']
		});
	}

	ngOnInit(): void {
		//this.loadCharacters(0, 1, 15, 'Go', 'Male', 'Saiyan', 'Z Fighter');
		//this.loadCharacters(0, 1, 15);
		this.onSearch();
	}

	loadCharacters(start: number, page: number, limit: number/*, name?: string, gender?: string, race?: string, affiliation?: string*/) {
		const { name, gender, race, affiliation } = this.searchForm.value;
		this.__dragonBallService.getCharacters(start, page, limit, name, gender, race, affiliation)
			.subscribe((response: ApiResponse) => {
				this.characters = response.items ?? response;
				//console.log(response);
			});
	}

	countCharacters(limit: number): void {
		this.__dragonBallService.getCharacters(0, 1, limit)
			.subscribe((response: ApiResponse) => {this.countCharacter = response.items.length;},
            (error) => {
                console.error('Error al obtener el conteo de personajes:', error);
                this.countCharacter = 0;
            });
	}

	onSearch() {
		this.loadCharacters(0, 1, this.LIMIT_RESULT); // Reinicia la búsqueda al primer conjunto de resultados
		this.countCharacters(100);
	}
}
